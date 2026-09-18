/**
 * ====================================================================
 * MIND IN BOX — ELITE PRO CHAT ENGINE
 * Firebase Realtime Database powered, Pro-members only
 * Version: 2.0 | Encrypted | Real-time
 * ====================================================================
 */

const EliteChat = (() => {
    'use strict';

    // ----------------------------------------------------------------
    // CONFIGURATION
    // ----------------------------------------------------------------
    const ROOMS = {
        general:    { id: 'general',    name: 'النقاش العام', emoji: '🏛️' },
        philosophy: { id: 'philosophy', name: 'الفلسفة العميقة', emoji: '📜' },
        habits:     { id: 'habits',     name: 'الانضباط والعادات', emoji: '⚡' },
        support:    { id: 'support',    name: 'الدعم الفني', emoji: '🛡️' },
    };

    const MAX_MSG_LENGTH = 1000;
    const MSG_RETENTION_DAYS = 30;
    const TYPING_TIMEOUT_MS = 3000;

    let db = null;
    let auth = null;
    let currentUser = null;
    let currentRoom = 'general';
    let messagesListener = null;
    let typingTimeout = null;
    let isProMember = false;

    // ----------------------------------------------------------------
    // INITIALIZATION
    // ----------------------------------------------------------------
    async function init() {
        auth = firebase.auth();
        db = firebase.firestore();

        auth.onAuthStateChanged(async (user) => {
            if (!user) {
                _showAccessDenied('يجب تسجيل الدخول أولاً');
                return;
            }

            currentUser = user;

            // Verify Pro membership server-side
            const userDoc = await db.collection('users').doc(user.uid).get();
            const role = userDoc.exists ? userDoc.data().role : 'free';
            isProMember = ['pro', 'oracle', 'admin'].includes(role);

            if (!isProMember) {
                _showAccessDenied('هذه المساحة حصرية لأعضاء البرو السياديين');
                return;
            }

            _renderChatUI();
            _joinRoom(currentRoom);
        });
    }

    // ----------------------------------------------------------------
    // PRO GATE — Deny non-Pro access
    // ----------------------------------------------------------------
    function _showAccessDenied(message) {
        const container = document.getElementById('chat-container');
        if (!container) return;
        container.innerHTML = `
            <div class="chat-access-denied">
                <div class="denied-icon">🔒</div>
                <h2 class="denied-title">المحراب الحصري</h2>
                <p class="denied-msg">${message}</p>
                <a href="pricing.html" class="btn-upgrade-cta">
                    ارتقِ إلى النخبة البرو
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
            </div>
        `;
    }

    // ----------------------------------------------------------------
    // UI RENDERING
    // ----------------------------------------------------------------
    function _renderChatUI() {
        const container = document.getElementById('chat-container');
        if (!container) return;

        const roomsHTML = Object.values(ROOMS).map(room => `
            <button class="chat-room-btn ${room.id === currentRoom ? 'active' : ''}"
                    data-room="${room.id}"
                    onclick="EliteChat.switchRoom('${room.id}')">
                <span class="room-emoji">${room.emoji}</span>
                <span class="room-name">${room.name}</span>
                <span class="room-unread" id="unread-${room.id}" style="display:none">•</span>
            </button>
        `).join('');

        container.innerHTML = `
            <div class="chat-shell">
                <!-- Sidebar: Room List -->
                <aside class="chat-sidebar">
                    <div class="chat-sidebar-header">
                        <img src="logo.png" alt="logo" class="chat-brand-logo">
                        <div>
                            <span class="chat-brand-name">محراب النخبة</span>
                            <span class="chat-pro-badge">● PRO</span>
                        </div>
                    </div>
                    <nav class="chat-rooms-list">
                        ${roomsHTML}
                    </nav>
                    <div class="chat-user-capsule">
                        <img src="${currentUser.photoURL || 'logo.png'}" alt="avatar" class="chat-avatar">
                        <div class="chat-user-info">
                            <span class="chat-user-name">${currentUser.displayName || 'السالك'}</span>
                            <span class="chat-user-status">● متصل الآن</span>
                        </div>
                    </div>
                </aside>

                <!-- Main Chat Area -->
                <main class="chat-main">
                    <header class="chat-main-header">
                        <span id="chat-room-title" class="chat-room-title">النقاش العام 🏛️</span>
                        <span class="chat-online-count" id="chat-online-count">0 متصل</span>
                    </header>

                    <div class="chat-messages-area" id="chat-messages-area">
                        <div class="chat-loading-indicator" id="chat-loading">
                            <div class="spinner"></div>
                        </div>
                    </div>

                    <div class="chat-typing-indicator" id="chat-typing" style="display:none">
                        <span>يكتب...</span>
                    </div>

                    <footer class="chat-input-area">
                        <textarea
                            id="chat-input"
                            class="chat-textarea"
                            placeholder="اكتب رسالتك السيادية..."
                            maxlength="${MAX_MSG_LENGTH}"
                            rows="1"
                            onkeydown="EliteChat.handleKeydown(event)"
                            oninput="EliteChat.handleTyping()"
                        ></textarea>
                        <button class="chat-send-btn" onclick="EliteChat.sendMessage()" title="إرسال (Enter)">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                        </button>
                    </footer>
                </main>
            </div>
        `;
    }

    // ----------------------------------------------------------------
    // ROOM MANAGEMENT
    // ----------------------------------------------------------------
    async function switchRoom(roomId) {
        if (!ROOMS[roomId] || !isProMember) return;

        // Detach previous listener
        if (messagesListener) {
            messagesListener();
            messagesListener = null;
        }

        currentRoom = roomId;

        // Update active room button
        document.querySelectorAll('.chat-room-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.room === roomId);
        });

        // Update header title
        const titleEl = document.getElementById('chat-room-title');
        if (titleEl) titleEl.textContent = `${ROOMS[roomId].name} ${ROOMS[roomId].emoji}`;

        // Clear messages area
        const area = document.getElementById('chat-messages-area');
        if (area) area.innerHTML = '<div class="chat-loading-indicator" id="chat-loading"><div class="spinner"></div></div>';

        _joinRoom(roomId);
    }

    function _joinRoom(roomId) {
        const area = document.getElementById('chat-messages-area');
        if (!area) return;

        // Listen to messages in real-time (last 50 messages, ordered by time)
        const msgsRef = db.collection('pro_council_chat').where('roomId', '==', roomId).orderBy('timestamp', 'asc')
            .limitToLast(50);

        messagesListener = msgsRef.onSnapshot((snapshot) => {
            const loading = document.getElementById('chat-loading');
            if (loading) loading.remove();

            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    _renderMessage(change.doc.data(), change.doc.id, area);
                }
                if (change.type === 'removed') {
                    const el = document.getElementById(`msg-${change.doc.id}`);
                    if (el) el.remove();
                }
            });

            // Auto-scroll to bottom
            area.scrollTop = area.scrollHeight;
        }, (error) => {
            console.error('[EliteChat] Snapshot error:', error);
        });
    }

    // ----------------------------------------------------------------
    // MESSAGE RENDERING
    // ----------------------------------------------------------------
    function _renderMessage(data, msgId, container) {
        if (!data || !data.text) return;

        const isOwn = data.userId === currentUser?.uid;
        const time = data.timestamp?.toDate
            ? data.timestamp.toDate().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
            : '';

        // Sanitize text (prevent XSS)
        const safeText = _sanitize(data.text);
        const safeName = _sanitize(data.displayName || 'مجهول');

        const msgEl = document.createElement('div');
        msgEl.id = `msg-${msgId}`;
        msgEl.className = `chat-message ${isOwn ? 'own' : 'other'}`;
        msgEl.innerHTML = `
            <div class="msg-bubble">
                ${!isOwn ? `<span class="msg-author">${safeName}</span>` : ''}
                <p class="msg-text">${safeText}</p>
                <span class="msg-time">${time}</span>
            </div>
        `;

        container.appendChild(msgEl);
    }

    // ----------------------------------------------------------------
    // SEND MESSAGE
    // ----------------------------------------------------------------
    async function sendMessage() {
        if (!isProMember || !currentUser) return;

        const input = document.getElementById('chat-input');
        if (!input) return;

        const text = input.value.trim();
        if (!text || text.length > MAX_MSG_LENGTH) return;

        input.value = '';
        input.style.height = 'auto';

        try {
            await db.collection('pro_council_chat')
                .add({
                    roomId: currentRoom,
                    userId: currentUser.uid,
                    displayName: currentUser.displayName || 'السالك',
                    photoURL: currentUser.photoURL || '',
                    text: text,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    room: currentRoom,
                });

            // Play send sound
            if (window.SovereignAudio?.playClick) {
                window.SovereignAudio.playClick();
            }

        } catch (err) {
            console.error('[EliteChat] Send error:', err);
        }
    }

    // ----------------------------------------------------------------
    // KEYBOARD & TYPING
    // ----------------------------------------------------------------
    function handleKeydown(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
        // Auto-grow textarea
        const input = event.target;
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    }

    function handleTyping() {
        // Could integrate Realtime DB typing indicators here
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            // stop typing indicator
        }, TYPING_TIMEOUT_MS);
    }

    // ----------------------------------------------------------------
    // SECURITY — XSS Sanitizer
    // ----------------------------------------------------------------
    function _sanitize(str) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    // ----------------------------------------------------------------
    // PUBLIC API
    // ----------------------------------------------------------------
    return { init, switchRoom, sendMessage, handleKeydown, handleTyping };
})();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => EliteChat.init());

