import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Register a new user
const handleSignUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered:", userCredential.user);
  } catch (error) {
    console.error("Sign up error:", error.message);
  }
};

// Sign in an existing user
const handleSignIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user);
  } catch (error) {
    console.error("Sign in error:", error.message);
  }
};

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const handleGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google user signed in:", result.user);
  } catch (error) {
    console.error("Google Sign-In error:", error.message);
  }
};