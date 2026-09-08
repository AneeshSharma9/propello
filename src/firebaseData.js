import { db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

export const fetchData = async (collectionName) => {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const putData = async (collectionName, data) => {
  return addDoc(collection(db, collectionName), data);
};

export const updateData = async (collectionName, documentId, updates) => {
  return updateDoc(doc(db, collectionName, documentId), updates);
};

export const deleteData = async (collectionName, documentId) => {
  return deleteDoc(doc(db, collectionName, documentId));
};

export const doesUsernameExist = async (username) => {
  const q = query(collection(db, "users"), where("username", "==", username));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
};