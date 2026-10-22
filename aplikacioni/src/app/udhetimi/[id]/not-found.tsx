
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          Udhëtimi nuk u gjet
        </h1>

        <p className="mt-3">
          Udhëtimi që po kërkon nuk ekziston.
        </p>

        <Link href="/" className="mt-5 block text-blue-600">
          ← Kthehu te lista
        </Link>
      </div>
    </main>
  );
}
