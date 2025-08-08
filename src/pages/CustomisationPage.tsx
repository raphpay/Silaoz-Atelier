import { Image as KonvaImage, Layer, Stage } from "react-konva";
import useImage from "use-image";
import MousePadImage from "../assets/mouse-pad.png";

function CustomisationPage() {
  const customerImageUrl = import.meta.env.VITE_CUSTOM_TEST_URL;
  const [mousePadImage] = useImage(MousePadImage);
  const [clientImage] = useImage(customerImageUrl);

  return (
    <Stage width={500} height={300}>
      <Layer>
        {/* Arrière-plan = tapis */}
        <KonvaImage
          image={mousePadImage}
          x={0}
          y={0}
          width={500}
          height={300}
        />

        {/* Image client par-dessus */}
        <KonvaImage
          image={clientImage}
          x={150}
          y={80}
          width={200}
          height={140}
          draggable
        />
      </Layer>
    </Stage>
  );
}

export default CustomisationPage;
