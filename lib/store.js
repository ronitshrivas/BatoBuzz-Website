// -------------------------------------------------------------------------
// Firestore / Storage / Auth access for the website.
//
// This project is SHARED with the BatoBuzz mobile apps, so every website
// collection is suffixed with "Website" to avoid colliding with app data:
//   contentWebsite            - all site content (doc id: "site")
//   projectInquiriesWebsite   - "start a project" / schedule-a-call form
//   applicationsWebsite       - job applications (CV in Storage)
// -------------------------------------------------------------------------

import { db, auth, storage, firebaseReady } from "./firebase";
import {
  doc, getDoc, setDoc,
  addDoc, collection, getDocs, orderBy, query as fsQuery, serverTimestamp,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword, signOut, onAuthStateChanged,
  reauthenticateWithCredential, updatePassword, EmailAuthProvider,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { defaultContent } from "./defaults";

const CONTENT_COLLECTION = "contentWebsite";
const INQUIRY_COLLECTION = "projectInquiriesWebsite";
const APPLICATION_COLLECTION = "applicationsWebsite";

const CONTENT_REF = () => doc(db, CONTENT_COLLECTION, "site");

export function mergeContent(remote) {
  if (!remote) return defaultContent;
  return { ...defaultContent, ...remote };
}

export async function loadContent() {
  if (!firebaseReady || !db) return defaultContent;
  try {
    const snap = await getDoc(CONTENT_REF());
    return snap.exists() ? mergeContent(snap.data()) : defaultContent;
  } catch (e) {
    console.warn("loadContent failed, using defaults:", e?.message || e);
    return defaultContent;
  }
}

// Writes the default content into Firestore if the document does not exist
// yet, so the admin has real, editable/deletable data. Requires auth.
export async function seedIfEmpty() {
  if (!firebaseReady || !db) return false;
  const snap = await getDoc(CONTENT_REF());
  if (!snap.exists()) {
    await setDoc(CONTENT_REF(), defaultContent, { merge: false });
    return true;
  }
  return false;
}

export async function saveContent(content) {
  if (!firebaseReady || !db) throw new Error("Firebase is not configured.");
  await setDoc(CONTENT_REF(), content, { merge: false });
}

// ---- Auth ----
export async function signIn(email, password) {
  if (!firebaseReady || !auth) throw new Error("Firebase is not configured.");
  return signInWithEmailAndPassword(auth, email, password);
}
export async function signOutUser() {
  if (!firebaseReady || !auth) return;
  return signOut(auth);
}
export async function changePassword(currentPassword, newPassword) {
  if (!firebaseReady || !auth || !auth.currentUser) throw new Error("Not signed in.");
  const user = auth.currentUser;
  const cred = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, cred);
  await updatePassword(user, newPassword);
}

export function onAuth(callback) {
  if (!firebaseReady || !auth) { callback(null); return () => {}; }
  return onAuthStateChanged(auth, callback);
}

// ---- Public form submissions ----
export async function submitProjectInquiry(data) {
  if (!firebaseReady || !db) throw new Error("Firebase is not configured.");
  await addDoc(collection(db, INQUIRY_COLLECTION), {
    ...data, createdAt: serverTimestamp(), source: "website",
  });
}

export async function submitApplication(data, cvFile) {
  if (!firebaseReady || !db) throw new Error("Firebase is not configured.");
  let cvUrl = "", cvName = "";
  if (cvFile && storage) {
    const safe = cvFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `applicationsWebsite/${Date.now()}_${safe}`;
    const snap = await uploadBytes(ref(storage, path), cvFile);
    cvUrl = await getDownloadURL(snap.ref);
    cvName = cvFile.name;
  }
  await addDoc(collection(db, APPLICATION_COLLECTION), {
    ...data, cvUrl, cvName, createdAt: serverTimestamp(),
  });
}

async function loadCollection(name) {
  if (!firebaseReady || !db) return [];
  try {
    const q = fsQuery(collection(db, name), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.warn("loadCollection failed:", name, e?.message || e);
    return [];
  }
}
export async function loadProjectInquiries() { return loadCollection(INQUIRY_COLLECTION); }
export async function loadApplications() { return loadCollection(APPLICATION_COLLECTION); }

export { firebaseReady };
