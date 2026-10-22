
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { krijoKerkese } from "@/lib/kerkesat";

export default async function Kerkesa({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const { id } = await params;
  const { status } = await searchParams;

  const udhetimiId = Number(id);

  if (!Number.isSafeInteger(udhetimiId) || udhetimiId <= 0) {
    notFound();
  }

  async function dergoKerkesen() {
    "use server";

    const uRuajt = await krijoKerkese(udhetimiId);

    if (uRuajt) {
      redirect(`/udhetimi/${udhetimiId}/kerkesa?status=sukses`);
    }

    redirect(`/udhetimi/${udhetimiId}/kerkesa?status=pa-vende`);
  }

  const sukses = status === "sukses";
  const paVende = status === "pa-vende";

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6 text-gray-900">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow">
        <div className="mb-4 text-5xl">
          {sukses ? "⏳" : paVende ? "❌" : "💺"}
        </div>

        <h1 className="mb-4 text-2xl font-bold">
          {sukses
            ? "Kërkesa u ruajt me sukses!"
            : paVende
              ? "Nuk ka vende të lira"
              : "Kërko vend"}
        </h1>

        {sukses ? (
          <>
            <p className="mb-3 text-gray-600">
              Kërkesa jote është në pritje.
            </p>
            <p className="mb-6">💺 Ke kërkuar 1 vend.</p>
            <p className="mb-6 text-sm text-gray-500">
              Udhëtimi #{id}
            </p>
            <p className="mb-6 text-sm text-gray-500">
              Kërkesa është ruajtur në databazën Neon.
            </p>
          </>
        ) : paVende ? (
          <p className="mb-6 text-gray-600">
            Nuk mund të dërgohet kërkesa për këtë udhëtim.
          </p>
        ) : (
          <>
            <p className="mb-6 text-gray-600">
              Dëshiron të kërkosh 1 vend për udhëtimin #{id}?
            </p>

            <form action={dergoKerkesen}>
              <button
                type="submit"
                className="mb-4 rounded-lg bg-blue-600 px-5 py-3 text-white"
              >
                Konfirmo kërkesën
              </button>
            </form>
          </>
        )}

        <Link href="/" className="text-gray-600">
          ← Kthehu te lista
        </Link>
      </div>
    </main>
  );
}
