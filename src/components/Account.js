import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { doesUsernameExist } from "../firebaseData";

const AccountContext = createContext();

const Account = (props) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const profileDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (profileDoc.exists()) {
            setProfile(profileDoc.data());
          } else {
            setProfile({ email: firebaseUser.email, name: firebaseUser.displayName });
          }
        } catch (err) {
          console.error("Failed to load profile:", err);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
    });
    return unsubscribe;
  }, []);

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);
    const firebaseUser = credential.user;
    const profileDoc = await getDoc(doc(db, "users", firebaseUser.uid));

    if (!profileDoc.exists()) {
      let username = (firebaseUser.email || "").split("@")[0].toLowerCase().replace(/[^a-z0-9_.]/g, "") || "user";
      const exists = await doesUsernameExist(username);
      if (exists) {
        username = `${username}${firebaseUser.uid.slice(0, 6)}`;
      }
      const data = {
        username,
        name: firebaseUser.displayName || username,
        email: firebaseUser.email || "",
        phone: "",
      };
      await setDoc(doc(db, "users", firebaseUser.uid), data);
      setProfile(data);
    } else {
      setProfile(profileDoc.data());
    }
  };

  const signUp = async (email, password, profileData) => {
    const { username, firstName, lastName, phone } = profileData;
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    try {
      const exists = await doesUsernameExist(username);
      if (exists) {
        throw new Error("Username already taken");
      }
      const name = `${firstName} ${lastName}`.trim();
      await updateProfile(credential.user, { displayName: name });
      const data = { username, name, email, phone };
      await setDoc(doc(db, "users", credential.user.uid), data);
      setProfile(data);
    } catch (err) {
      try { await credential.user.delete(); } catch (e) { console.error("Failed to roll back account:", e); }
      throw err;
    }
  };

  const logOut = async () => {
    await signOut(auth);
    setUser(null);
    setProfile(null);
  };

  const getUsername = () => {
    if (profile && profile.username) return profile.username;
    if (user && user.email) return user.email.split("@")[0];
    return "";
  };

  return (
    <AccountContext.Provider
      value={{ user, profile, signIn, signInWithGoogle, signUp, logOut, getUsername }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };