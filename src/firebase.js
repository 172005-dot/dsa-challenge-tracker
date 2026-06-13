// src/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const isFirebaseConfigured = !!(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_API_KEY !== 'undefined' &&
  import.meta.env.VITE_FIREBASE_API_KEY !== ''
);

let app, auth, db, isMock = false;

if (isFirebaseConfigured) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
} else {
  isMock = true;

  const getMockDocKey = (coll, id) => `mock_firestore_${coll}_${id}`;
  const getMockUsersKey = () => 'mock_firebase_auth_users';
  const getMockSessionKey = () => 'mock_firebase_auth_current_user';
  const getMockData = (key) => { try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : null; } catch { return null; } };
  const setMockData = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };

  const authListeners = new Set();
  let currentMockUser = getMockData(getMockSessionKey());

  const triggerAuthListeners = (user) => authListeners.forEach(cb => cb(user));

  auth = {
    get currentUser() { return currentMockUser; },
    onAuthStateChanged: (callback) => {
      authListeners.add(callback);
      callback(currentMockUser);
      return () => authListeners.delete(callback);
    },
    signInWithEmailAndPassword: async (email, password) => {
      const users = getMockData(getMockUsersKey()) || {};
      const lowerEmail = email.toLowerCase();
      if (!users[lowerEmail] || users[lowerEmail].password !== password) {
        throw new Error("auth/wrong-password-or-user-not-found");
      }
      currentMockUser = {
        uid: users[lowerEmail].uid,
        email: lowerEmail,
        displayName: users[lowerEmail].displayName || lowerEmail.split('@')[0],
        photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${users[lowerEmail].uid}`
      };
      setMockData(getMockSessionKey(), currentMockUser);
      triggerAuthListeners(currentMockUser);
      return { user: currentMockUser };
    },
    createUserWithEmailAndPassword: async (email, password) => {
      const users = getMockData(getMockUsersKey()) || {};
      const lowerEmail = email.toLowerCase();
      if (users[lowerEmail]) throw new Error("auth/email-already-in-use");
      const newUid = `mock_user_${Math.random().toString(36).substring(2, 11)}`;
      users[lowerEmail] = { uid: newUid, password, displayName: lowerEmail.split('@')[0] };
      setMockData(getMockUsersKey(), users);
      currentMockUser = {
        uid: newUid, email: lowerEmail,
        displayName: lowerEmail.split('@')[0],
        photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${newUid}`
      };
      setMockData(getMockSessionKey(), currentMockUser);
      triggerAuthListeners(currentMockUser);
      return { user: currentMockUser };
    },
    signInWithPopup: async () => {
      // Each Google login creates a NEW unique user — no more shared "Google Developer" account
      const newUid = `mock_google_${Math.random().toString(36).substring(2, 11)}`;
      // Check if this browser already has a google user to reuse (simulate same person)
      const session = getMockData(getMockSessionKey());
      const uid = (session && session.uid.startsWith('mock_google_')) ? session.uid : newUid;
      const users = getMockData(getMockUsersKey()) || {};
      if (!users[uid]) {
        users[uid] = { uid, displayName: 'DSA Student', email: `${uid}@google.mock` };
        setMockData(getMockUsersKey(), users);
      }
      currentMockUser = {
        uid,
        email: users[uid].email,
        displayName: users[uid].displayName,
        photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${uid}`
      };
      setMockData(getMockSessionKey(), currentMockUser);
      triggerAuthListeners(currentMockUser);
      return { user: currentMockUser };
    },
    signOut: async () => {
      currentMockUser = null;
      localStorage.removeItem(getMockSessionKey());
      triggerAuthListeners(null);
    }
  };

  db = {
    doc: (database, collectionName, docId) => ({ collectionName, docId }),
    getDoc: async (docRef) => {
      const key = getMockDocKey(docRef.collectionName, docRef.docId);
      const data = getMockData(key);
      return { exists: () => data !== null, data: () => data };
    },
    setDoc: async (docRef, data, options = {}) => {
      const key = getMockDocKey(docRef.collectionName, docRef.docId);
      if (options.merge) {
        const existing = getMockData(key) || {};
        setMockData(key, { ...existing, ...data });
      } else {
        setMockData(key, data);
      }
    }
  };
}

export { app, auth, db, isMock };

export const logInUser = async (email, password) =>
  isMock ? auth.signInWithEmailAndPassword(email, password) : signInWithEmailAndPassword(auth, email, password);

export const registerUser = async (email, password) =>
  isMock ? auth.createUserWithEmailAndPassword(email, password) : createUserWithEmailAndPassword(auth, email, password);

export const logOutUser = async () =>
  isMock ? auth.signOut() : signOut(auth);

export const loginWithGoogle = async () => {
  if (isMock) return auth.signInWithPopup();
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const getDocData = async (docRef) =>
  isMock ? db.getDoc(docRef) : getDoc(docRef);

export const setDocData = async (docRef, data, options = {}) =>
  isMock ? db.setDoc(docRef, data, options) : setDoc(docRef, data, options);

export const getDocRef = (collectionName, docId) =>
  isMock ? db.doc(null, collectionName, docId) : doc(db, collectionName, docId);
