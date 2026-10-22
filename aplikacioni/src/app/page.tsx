
import { merrUdhetimetNgaDB } from "@/lib/udhetimet";
import { KartaUdhetimi } from "@/components/KartaUdhetimi";

export default async function Home() {
  let udhetimet: Awaited<
    ReturnType<typeof merrUdhetimetNgaDB>
  > = [];

  let gabim = false;

  try {
    udhetimet = await merrUdhetimetNgaDB();
  } catch {
    gabim = true;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 text-gray-900">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-2 text-3xl font-bold">
          RideShare 🚗
        </h1>

        <p className="mb-6 text-gray-600">
          Gjej një udhëtim për në AAB
        </p>

        <h2 className="mb-4 text-xl font-semibold">
          Udhëtimet e disponueshme
        </h2>

        {gabim ? (
          <p>Gabim gjatë lidhjes me databazën.</p>
        ) : udhetimet.length === 0 ? (
          <p>Nuk ka udhëtime të disponueshme.</p>
        ) : (
          <div className="space-y-4">
            {udhetimet.map((udhetimi) => (
              <KartaUdhetimi
                key={udhetimi.id}
                udhetim={udhetimi}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
