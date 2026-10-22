
import { udhetimet } from "@/lib/udhetimet";
import { KartaUdhetimi } from "@/components/KartaUdhetimi";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-6 text-gray-900">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-2 text-3xl font-bold">RideShare 🚗</h1>

        <p className="mb-6 text-gray-600">
          Gjej një udhëtim për në AAB
        </p>

        <h2 className="mb-4 text-xl font-semibold">
          Udhëtimet e disponueshme
        </h2>

        <div className="space-y-4">
          {udhetimet.map((udhetimi) => (
            <KartaUdhetimi
              key={udhetimi.id}
              udhetim={udhetimi}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
