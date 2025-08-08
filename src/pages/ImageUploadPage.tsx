import { serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { saveToFirestore } from "../business-logic/firestore";
import { uploadImageToSession } from "../business-logic/storage";

const ImageUploadPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null);
      setPreviewUrl(null);
      return;
    }
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      setMessage("");
      // Upload in Firebase Storage
      const downloadUrl = await uploadImageToSession(file, sessionId);
      const dataToSave = {
        sessionId,
        imageUrl: downloadUrl,
        timestamp: serverTimestamp(),
      };

      // Save in Firestore
      await saveToFirestore(dataToSave, "uploads");
      setMessage("Upload réussi !");
      setFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Erreur upload :", error);
      setMessage("Erreur lors de l'upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Uploader votre photo</h1>

      {sessionId ? (
        <p className="mb-4">
          Session : <code>{sessionId}</code>
        </p>
      ) : (
        <p className="mb-4 text-red-600">Session ID manquant dans l'URL</p>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {previewUrl && (
        <div className="mb-4">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-full rounded shadow"
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
      >
        {uploading ? "Uploading..." : "Envoyer"}
      </button>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default ImageUploadPage;
