import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  // signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwmuysyeOpn19tWVZ3ICw446UxCIEb7t4",
  authDomain: "crown-clothing-b6aea.firebaseapp.com",
  projectId: "crown-clothing-b6aea",
  storageBucket: "crown-clothing-b6aea.appspot.com",
  messagingSenderId: "1003402979726",
  appId: "1:1003402979726:web:f27f83b4d70ba39c701cdf",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
//export const signInWithGoogleRedirect = () =>
//signInWithRedirect(auth, googleProvider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  //console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userDocRef;
};
