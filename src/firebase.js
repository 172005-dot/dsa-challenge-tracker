// src/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Environment variables check
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

let app;
let auth;
let db;
let isMock = false;

if (isFirebaseConfigured) {
  // Initialize real Firebase
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
} else {
  // Setup Fallback Mock Firebase Service
  isMock = true;
  console.log("DSA Tracker: Operating in client-side storage mode (No Firebase credentials detected).");

  // Mock database storage
  const getMockDocKey = (coll, id) => `mock_firestore_${coll}_${id}`;
  const getMockUsersKey = () => 'mock_firebase_auth_users';
  const getMockSessionKey = () => 'mock_firebase_auth_current_user';

  // Helper to read/write mock data
  const getMockData = (key) => {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  };
  const setMockData = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
  };

  // Listeners list
  const authListeners = new Set();
  
  let currentMockUser = getMockData(getMockSessionKey());

  const triggerAuthListeners = (user) => {
    authListeners.forEach(cb => cb(user));
  };

  auth = {
    get currentUser() {
      return currentMockUser;
    },
    onAuthStateChanged: (callback) => {
      authListeners.add(callback);
      // Immediately invoke with current state
      callback(currentMockUser);
      return () => {
        authListeners.delete(callback);
      };
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

      if (users[lowerEmail]) {
        throw new Error("auth/email-already-in-use");
      }

      const newUid = `mock_user_${Math.random().toString(36).substring(2, 11)}`;
      users[lowerEmail] = {
        uid: newUid,
        password,
        displayName: lowerEmail.split('@')[0]
      };
      setMockData(getMockUsersKey(), users);

      currentMockUser = {
        uid: newUid,
        email: lowerEmail,
        displayName: users[lowerEmail].displayName,
        photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${newUid}`
      };
      setMockData(getMockSessionKey(), currentMockUser);
      triggerAuthListeners(currentMockUser);
      return { user: currentMockUser };
    },
    signInWithPopup: async () => {
      // Mock Google Login
      const newUid = `mock_google_${Math.random().toString(36).substring(2, 11)}`;
      currentMockUser = {
        uid: newUid,
        email: 'googleuser@gmail.com',
        displayName: 'Google Developer',
        photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newUid}`
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
    // Return a structured reference
    doc: (database, collectionName, docId) => {
      return { collectionName, docId };
    },
    getDoc: async (docRef) => {
      const key = getMockDocKey(docRef.collectionName, docRef.docId);
      const data = getMockData(key);
      return {
        exists: () => data !== null,
        data: () => data
      };
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

// Helper interfaces to unify client actions (supports both real and mock imports)
export const logInUser = async (email, password) => {
  if (isMock) {
    return auth.signInWithEmailAndPassword(email, password);
  } else {
    return signInWithEmailAndPassword(auth, email, password);
  }
};

export const registerUser = async (email, password) => {
  if (isMock) {
    return auth.createUserWithEmailAndPassword(email, password);
  } else {
    return createUserWithEmailAndPassword(auth, email, password);
  }
};

export const logOutUser = async () => {
  if (isMock) {
    return auth.signOut();
  } else {
    return signOut(auth);
  }
};

export const loginWithGoogle = async () => {
  if (isMock) {
    return auth.signInWithPopup();
  } else {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }
};

export const getDocData = async (docRef) => {
  if (isMock) {
    return db.getDoc(docRef);
  } else {
    return getDoc(docRef);
  }
};

export const setDocData = async (docRef, data, options = {}) => {
  if (isMock) {
    return db.setDoc(docRef, data, options);
  } else {
    return setDoc(docRef, data, options);
  }
};

export const getDocRef = (collectionName, docId) => {
  if (isMock) {
    return db.doc(null, collectionName, docId);
  } else {
    return doc(db, collectionName, docId);
  }
};
