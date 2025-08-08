import Konva from "konva"; // important pour les types
import { useEffect, useRef, useState } from "react";
import { Image as KonvaImage, Layer, Stage, Transformer } from "react-konva";
import useImage from "use-image";
import CilaosImage from "../assets/cilaos.jpg";
import MousePadImage from "../assets/mouse-pad.png";

import { Line } from "react-konva";

const snapAngles = [0, 90, 180, 270];
const snapDistance = 5;

function CustomisationPage() {
  const [mousePadImage] = useImage(MousePadImage);
  const [clientImage] = useImage(CilaosImage);
  const imageRef = useRef<Konva.Image>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const [isSelected, setIsSelected] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [guideOrientation, setGuideOrientation] = useState<
    "horizontal" | "vertical" | null
  >(null);

  function onClientImageTransform(e: any) {
    const node = e.target;
    let rotation = ((node.rotation() % 360) + 360) % 360;

    let closeTo = snapAngles.find(
      (angle) => Math.abs(rotation - angle) < snapDistance
    );
    if (closeTo !== undefined) {
      setShowGuide(true);
      setGuideOrientation(
        closeTo === 0 || closeTo === 180 ? "horizontal" : "vertical"
      );
    } else {
      setShowGuide(false);
    }
  }

  function onClientImageTransformEnd(e: any) {
    const node = e.target;
    let rotation = ((node.rotation() % 360) + 360) % 360;

    let closeTo = snapAngles.find(
      (angle) => Math.abs(rotation - angle) < snapDistance
    );
    if (closeTo !== undefined) {
      node.rotation(closeTo);
    }
    setShowGuide(false);
  }

  useEffect(() => {
    if (isSelected && transformerRef.current && imageRef.current) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <Stage
      width={700}
      height={700}
      style={{ border: "1px solid #ddd", background: "#f9f9f9" }}
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
          onTransform={(e) => onClientImageTransform(e)}
          onTransformEnd={(e) => onClientImageTransformEnd(e)}
        />

        {/* Transformer */}
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
              if (newBox.width < 50 || newBox.height < 50) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}

        {/* Guide visuel */}
        {showGuide && guideOrientation === "horizontal" && (
          <Line
            points={[0, 230, 700, 230]}
            stroke="red"
            strokeWidth={1}
            dash={[5, 5]}
          />
        )}
        {showGuide && guideOrientation === "vertical" && (
          <Line
            points={[350, 0, 350, 700]}
            stroke="red"
            strokeWidth={1}
            dash={[5, 5]}
          />
        )}
      </Layer>
    </Stage>
  );
}

export default CustomisationPage;
