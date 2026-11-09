
"use client";

import { useEffect } from "react";

export default function Pwa() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js")
      .catch((error) => {
        console.error("Gabim gjatë regjistrimit të PWA:", error);
      });
  }, []);

  return null;
}
