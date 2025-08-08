import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

export async function uploadImageToSession(
  file: File | null,
  sessionId: string | undefined
): Promise<string> {
  if (!file || !sessionId) {
    throw new Error("Fichier ou sessionId manquant ");
  }

  try {
    // Création d'un chemin unique pour l'image (ex: uploads/sessionId/nom_du_fichier)
    const storageRef = ref(storage, `uploads/${sessionId}/${file.name}`);

    // Upload du fichier
    await uploadBytes(storageRef, file);

    // Récupérer l'URL publique
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    throw error;
  }
}
