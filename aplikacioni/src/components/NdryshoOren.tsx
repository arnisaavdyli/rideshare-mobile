
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NdryshoOren({
  id,
  oraFillestare,
}: {
  id: string;
  oraFillestare: string;
}) {
  const [ora, setOra] = useState(oraFillestare);
  const [mesazhi, setMesazhi] = useState("");
  const [dukeRuajtur, setDukeRuajtur] = useState(false);
  const router = useRouter();

  async function ruajOren(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDukeRuajtur(true);
    setMesazhi("");

    try {
      const response = await fetch(
        `/api/udhetimet/${id}/ora`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ora }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMesazhi(data.error ?? "Ndodhi një gabim.");
        return;
      }

      setMesazhi("Ora u ndryshua me sukses.");
      router.refresh();
    } catch {
      setMesazhi("Nuk u realizua kërkesa.");
    } finally {
      setDukeRuajtur(false);
    }
  }

  return (
    <form onSubmit={ruajOren} className="mt-6 space-y-3">
      <label htmlFor={`ora-${id}`} className="block">
        Ndrysho orën e udhëtimit #{id}
      </label>

      <input
        id={`ora-${id}`}
        type="time"
        value={ora}
        onChange={(e) => setOra(e.target.value)}
        required
        className="border rounded p-2"
      />

      <button
        type="submit"
        disabled={dukeRuajtur}
        className="block border rounded px-4 py-2"
      >
        {dukeRuajtur ? "Duke ruajtur..." : "Ruaj orën"}
      </button>

      {mesazhi && <p role="status">{mesazhi}</p>}
    </form>
  );
}
