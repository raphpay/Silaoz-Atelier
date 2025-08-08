import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

export function generateSessionId() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  const timestamp = `${yyyy}_${mm}_${dd}-${hh}${min}${ss}`;

  // Générer un suffixe alphanumérique court (4 caractères)
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let suffix = "";
  for (let i = 0; i < 4; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `${timestamp}-${suffix}`;
}

export async function saveToFirestore(data: any, path: string): Promise<void> {
  await addDoc(collection(db, path), data);
}
