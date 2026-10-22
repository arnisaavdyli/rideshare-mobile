
import Link from "next/link";
import type { Udhetim } from "@/lib/udhetimet";

export function KartaUdhetimi({
  udhetim,
}: {
  udhetim: Udhetim;
}) {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h3 className="text-lg font-bold">
        {udhetim.shoferi}
      </h3>

      <p>
        📍 {udhetim.nisja} → {udhetim.destinacioni}
      </p>

      <p>🕒 Ora: {udhetim.ora}</p>
      <p>💺 Vende të lira: {udhetim.vende}</p>

      <Link
        href={`/udhetimi/${udhetim.id}`}
        className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white"
      >
        Shiko detajet
      </Link>
    </div>
  );
}
