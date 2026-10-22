
import Link from "next/link";

export default async function Kerkesa({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6 text-gray-900">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow">
        <div className="mb-4 text-5xl">⏳</div>

        <h1 className="mb-4 text-2xl font-bold">
          Simulim: Në pritje
        </h1>

        <p className="mb-3 text-gray-600">
          Kërkesa për vend është në pritje.
        </p>

        <p className="mb-6">
          💺 Ke kërkuar 1 vend.
        </p>

        <p className="mb-6 text-sm text-gray-500">
          Udhëtimi #{id}
        </p>

        <p className="mb-6 text-sm text-gray-500">
          Ky është vetëm një simulim. Kërkesa nuk ruhet.
        </p>

        <Link
          href="/"
          className="inline-block rounded-lg bg-red-600 px-5 py-3 text-white"
        >
          Anulo kërkesën
        </Link>
      </div>
    </main>
  );
}
