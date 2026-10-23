
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { sql } from "../../lib/db";
import {
  SignInButton,
  SignOutButton,
} from "../../components/AuthButtons";
import NdryshoOren from "../../components/NdryshoOren";

export default async function PanelPage() {
  const session = await getServerSession(authOptions);
  const githubId = session?.user?.id;

  const profilet = githubId
    ? await sql`
        SELECT roli
        FROM profilet
        WHERE github_user_id = ${githubId}
        LIMIT 1
      `
    : [];

  const eshteShofer = profilet[0]?.roli === "shofer";

  const udhetimet = githubId && eshteShofer
    ? await sql`
        SELECT id, shoferi, ora
        FROM udhetimet
        WHERE shofer_id = ${githubId}
        ORDER BY id
      `
    : [];

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">
        Paneli RideShare
      </h1>

      {session?.user ? (
        <>
          <p>Mirë se erdhe, {session.user.name}!</p>

          <p>
            GitHub ID nga sesioni: {githubId ?? "MUNGON"}
          </p>

          <p>
            Roli: {eshteShofer ? "Shofer" : "Pasagjer"}
          </p>

          <SignOutButton />

          {eshteShofer ? (
            <>
              <h2 className="mt-8 text-xl font-bold">
                Udhëtimet e mia
              </h2>

              {udhetimet.length === 0 ? (
                <p>Nuk ke udhëtime të regjistruara.</p>
              ) : (
                udhetimet.map((udhetimi) => (
                  <div
                    key={String(udhetimi.id)}
                    className="mt-4 rounded border p-4"
                  >
                    <p>
                      Shoferi: {String(udhetimi.shoferi)}
                    </p>

                    <p>
                      Ora aktuale: {String(udhetimi.ora)}
                    </p>

                    <NdryshoOren
                      id={String(udhetimi.id)}
                      oraFillestare={String(udhetimi.ora)}
                    />
                  </div>
                ))
              )}
            </>
          ) : (
            <p className="mt-8">
              Vetëm shoferët mund t'i menaxhojnë udhëtimet.
            </p>
          )}
        </>
      ) : (
        <>
          <p>Duhet të kyçesh për ta parë panelin.</p>
          <SignInButton />
        </>
      )}
    </main>
  );
}
