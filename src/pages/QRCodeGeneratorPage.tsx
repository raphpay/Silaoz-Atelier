import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateSessionId } from "../business-logic/firestore";
import { db } from "../config/firebase";
import { Button } from "../ui/components/Button";
import QRCode from "../ui/components/QRCode";

export default function QRCodeGeneratorPage() {
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(null);
  const sessionId = generateSessionId();
  // URL du formulaire d’upload à scanner (à héberger)
  const uploadUrl = `${import.meta.env.VITE_APP_ADDRESS}/upload/${sessionId}`;

  useEffect(() => {
    // Requête Firestore pour écouter les uploads sur la session
    const q = query(
      collection(db, "uploads"),
      where("sessionId", "==", sessionId),
      orderBy("timestamp", "desc"),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        setImageUrl(data.imageUrl);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Scannez ce QR code pour envoyer votre photo
      </h1>
      <div className="p-4 bg-white rounded shadow mb-8">
        <QRCode value={uploadUrl} />
      </div>

      <a href={uploadUrl} target="_blank">
        Lien vers l'upload : {sessionId}
      </a>

      <Button onClick={() => navigate("/customisation")}>
        Personaliser un produit
      </Button>

      {imageUrl ? (
        <div className="max-w-xs w-full">
          <h2 className="text-lg font-semibold mb-2">Image reçue :</h2>
          <img src={imageUrl} alt="Upload client" className="rounded shadow" />
        </div>
      ) : (
        <p className="text-gray-500">En attente d'une image...</p>
      )}
    </div>
  );
}
