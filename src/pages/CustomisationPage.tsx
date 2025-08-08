import Konva from "konva"; // important pour les types
import { useEffect, useRef, useState } from "react";
import { Image as KonvaImage, Layer, Stage, Transformer } from "react-konva";
import useImage from "use-image";
import CilaosImage from "../assets/cilaos.jpg";
import MousePadImage from "../assets/mouse-pad.png";

function CustomisationPage() {
  const [mousePadImage] = useImage(MousePadImage);
  const [clientImage] = useImage(CilaosImage);
  const imageRef = useRef<Konva.Image>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const [isSelected, setIsSelected] = useState(false);

  // Quand on sélectionne l'image → attacher le transformer
  useEffect(() => {
    if (isSelected && transformerRef.current && imageRef.current) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <div>
      <Stage
        width={700}
        height={700}
        style={{
          border: "1px solid #ddd",
          background: "#f9f9f9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onMouseDown={(e) => {
          if (e.target === e.target.getStage()) {
            setIsSelected(false);
          }
        }}
      >
        <Layer>
          {/* Fond tapis */}
          <KonvaImage
            image={mousePadImage}
            x={0}
            y={0}
            width={500}
            height={300}
          />

          {/* Image du client */}
          <KonvaImage
            image={clientImage}
            x={150}
            y={80}
            width={200}
            height={140}
            draggable
            ref={imageRef}
            onClick={() => setIsSelected(true)}
            onTap={() => setIsSelected(true)}
          />

          {/* Transformer visible uniquement si image sélectionnée */}
          {isSelected && (
            <Transformer
              ref={transformerRef}
              rotateEnabled={true}
              enabledAnchors={[
                "top-left",
                "top-right",
                "bottom-left",
                "bottom-right",
              ]}
              boundBoxFunc={(oldBox, newBox) => {
                // Empêche de redimensionner trop petit
                if (newBox.width < 50 || newBox.height < 50) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          )}
        </Layer>
      </Stage>
      <p>Is selected: {isSelected === true ? "true" : "false"}</p>
    </div>
  );
}

export default CustomisationPage;
