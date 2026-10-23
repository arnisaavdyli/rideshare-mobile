
import { sql } from "./db";

export async function eshteShofer(githubId: string) {
  const rezultati = await sql`
    SELECT roli FROM profilet
    WHERE github_user_id = ${githubId}
    LIMIT 1
  `;

  return rezultati[0]?.roli === "shofer";
}

export async function eshtePronari(
  udhetimiId: number,
  githubId: string
) {
  const rezultati = await sql`
    SELECT id FROM udhetimet
    WHERE id = ${udhetimiId}
      AND shofer_id = ${githubId}
    LIMIT 1
  `;

  return rezultati.length > 0;
}
