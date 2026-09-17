/**
 * ==============================================================================
 * MIND IN A BOX — HYBRID STORAGE ENGINE
 * Architecture: IndexedDB (Offline-First) + Firebase Sync (Cloud)
 * ==============================================================================
 */

;(function () {
    'use strict';

    const DB_NAME = 'MindInBox_Sanctuary_DB';
    const DB_VERSION = 1;
    let dbInstance = null;

    // ==========================================================================
    // 1. IndexedDB Initialization (The Offline Vault)
    // ==========================================================================
    function initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = (e) => reject('IndexedDB Error: ' + e.target.error);

            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                
                // Store for user documents (reflections, schedules, etc.)
                if (!db.objectStoreNames.contains('documents')) {
                    const docStore = db.createObjectStore('documents', { keyPath: 'id' });
                    docStore.createIndex('collection', 'collection', { unique: false });
                    docStore.createIndex('syncStatus', 'syncStatus', { unique: false }); // 'pending' or 'synced'
                }

                // Store for AI psychological profiles and silent metrics
                if (!db.objectStoreNames.contains('ai_metrics')) {
                    db.createObjectStore('ai_metrics', { keyPath: 'timestamp' });
                }
            };

            request.onsuccess = (e) => {
                dbInstance = e.target.result;
                resolve(dbInstance);
                // Trigger sync immediately if online
                if (navigator.onLine) syncPendingData();
            };
        });
    }

    // ==========================================================================
    // 2. Core Storage Operations
    // ==========================================================================
    async function saveDocument(collection, data) {
        if (!dbInstance) await initDB();

        const docId = data.id || `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const documentRecord = {
            ...data,
            id: docId,
            collection: collection,
            updatedAt: Date.now(),
            syncStatus: 'pending' // Always pending first for offline-first approach
        };

        return new Promise((resolve, reject) => {
            const transaction = dbInstance.transaction(['documents'], 'readwrite');
            const store = transaction.objectStore('documents');
            const request = store.put(documentRecord);

            request.onsuccess = () => {
                // Attempt silent cloud sync if network is available
                if (navigator.onLine) attemptCloudSync(documentRecord);
                resolve(documentRecord);
            };
            request.onerror = (e) => reject(e.target.error);
        });
    }

    async function getDocuments(collection) {
        if (!dbInstance) await initDB();

        return new Promise((resolve, reject) => {
            const transaction = dbInstance.transaction(['documents'], 'readonly');
            const store = transaction.objectStore('documents');
            const index = store.index('collection');
            const request = index.getAll(collection);

            request.onsuccess = () => resolve(request.result || []);
            request.onerror = (e) => reject(e.target.error);
        });
    }

    // ==========================================================================
    // 3. The Firebase Skeleton & Silent Synchronization Engine
    // ==========================================================================
    async function attemptCloudSync(docRecord) {
        // [Firebase Integration Point] - To be activated by "فيض"
        // Ensure Firebase is initialized in the HTML before this fires.
        if (typeof firebase === 'undefined' || !firebase.auth().currentUser) {
            console.warn('[Hybrid Storage]: Cloud sync bypassed. Firebase not ready or user unauthenticated.');
            return;
        }

        try {
            const userId = firebase.auth().currentUser.uid;
            const db = firebase.firestore();
            
            // Clean internal tracking fields before sending to cloud
            const cloudPayload = { ...docRecord };
            delete cloudPayload.syncStatus;
            delete cloudPayload.collection;

            await db.collection('users').doc(userId)
                    .collection(docRecord.collection).doc(docRecord.id)
                    .set(cloudPayload, { merge: true });

            markAsSynced(docRecord.id);
            console.log(`[Hybrid Storage]: Silently synced [${docRecord.id}] to cloud.`);
        } catch (error) {
            console.error('[Hybrid Storage]: Sync failed, keeping offline.', error);
        }
    }

    async function syncPendingData() {
        if (!dbInstance) return;
        if (typeof firebase === 'undefined' || !firebase.auth || !firebase.auth().currentUser) return;

        const transaction = dbInstance.transaction(['documents'], 'readonly');
        const store = transaction.objectStore('documents');
        const index = store.index('syncStatus');
        const request = index.getAll('pending');

        request.onsuccess = async () => {
            const pendingDocs = request.result;
            if (pendingDocs.length > 0) {
                console.log(`[Hybrid Storage]: Found ${pendingDocs.length} pending records. Initiating mass sync...`);
                for (const doc of pendingDocs) {
                    await attemptCloudSync(doc);
                }
            }
        };
    }

    function markAsSynced(docId) {
        if (!dbInstance) return;
        const transaction = dbInstance.transaction(['documents'], 'readwrite');
        const store = transaction.objectStore('documents');
        const request = store.get(docId);
        
        request.onsuccess = () => {
            if (request.result) {
                const doc = request.result;
                doc.syncStatus = 'synced';
                store.put(doc);
            }
        };
    }

    // ==========================================================================
    // 4. Network Watcher (Silent Reconnection)
    // ==========================================================================
    window.addEventListener('online', () => {
        console.log('%c[Hybrid Storage]: Connection restored. Awakening Sync Engine...', 'color:#3498db; font-size:11px;');
        syncPendingData();
    });

    window.addEventListener('offline', () => {
        console.log('%c[Hybrid Storage]: Connection lost. The Vault is now operating in pure offline mode.', 'color:#e74c3c; font-size:11px;');
    });

    // Initialize immediately
    initDB().catch(console.error);

    // Expose API
    window.HybridStorage = {
        save: saveDocument,
        get: getDocuments,
        forceSync: syncPendingData
    };

})();