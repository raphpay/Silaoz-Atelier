import { QRCodeSVG } from "qrcode.react";
import Logo from "../../assets/tof-bike.png";

interface QRCodeProps {
  value: string;
}

function QRCode({ value }: QRCodeProps) {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <QRCodeSVG value={value} size={200} />
      <img
        src={Logo}
        alt="logo"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 40,
          height: 40,
          transform: "translate(-50%, -50%)",
          borderRadius: "8px", // optional
        }}
      />
    </div>
  );
}

export default QRCode;
