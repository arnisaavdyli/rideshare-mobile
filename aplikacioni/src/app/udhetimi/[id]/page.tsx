
import Link from "next/link";
import { notFound } from "next/navigation";
import { merrUdhetimetNgaDB } from "@/lib/udhetimet";

export default async function Detajet({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const udhetimet = await merrUdhetimetNgaDB();
  const udhetimi = udhetimet.find((u) => u.id === id);

  if (!udhetimi) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 text-gray-900">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow">
        <Link href="/" className="text-blue-600">
          ← Kthehu te lista
        </Link>

        <h1 className="mt-6 mb-4 text-2xl font-bold">
          Detajet e udhëtimit
        </h1>

        <h2 className="text-xl font-semibold">
          {udhetimi.shoferi}
        </h2>

        <p>📍 Nisja: {udhetimi.nisja}</p>
        <p>🏫 Destinacioni: {udhetimi.destinacioni}</p>
        <p>🕒 Ora: {udhetimi.ora}</p>
        <p>📌 Vendtakimi: {udhetimi.vendtakimi}</p>
        <p>💺 Vende të lira: {udhetimi.vende}</p>

        {udhetimi.vende > 0 ? (
          <Link
            href={`/udhetimi/${udhetimi.id}/kerkesa`}
            className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-white"
          >
            Kërko vend
          </Link>
        ) : (
          <button
            disabled
            className="mt-6 rounded-lg bg-gray-400 px-5 py-3 text-white"
          >
            Nuk ka vende të lira
          </button>
        )}
      </div>
    </main>
  );
}
