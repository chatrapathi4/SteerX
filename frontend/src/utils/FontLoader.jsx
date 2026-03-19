import { useEffect } from "react";

export default function FontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&display=swap";
    document.head.appendChild(link);

    const clash = document.createElement("link");
    clash.rel = "stylesheet";
    clash.href =
      "https://api.fontshare.com/v2/css?f[]=clash-display@700,600&f[]=satoshi@400,500,700&display=swap";
    document.head.appendChild(clash);
  }, []);

  return null;
}