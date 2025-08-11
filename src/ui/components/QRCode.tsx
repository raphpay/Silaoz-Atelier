import { QRCodeSVG } from "qrcode.react";

interface QRCodeProps {
  value: string;
}

function QRCode({ value }: QRCodeProps) {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <QRCodeSVG value={value} size={200} />
    </div>
  );
}

export default QRCode;
