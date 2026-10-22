
import { sql } from "./db";

export async function krijoKerkese(udhetimiId: number) {
  const rezultatet = await sql`
    INSERT INTO kerkesat (udhetimi_id, vende, statusi)
    SELECT id, 1, 'ne_pritje'
    FROM udhetimet
    WHERE id = ${udhetimiId}
      AND vendet_lira > 0
      AND NOT EXISTS (
        SELECT 1
        FROM kerkesat
        WHERE udhetimi_id = ${udhetimiId}
          AND statusi = 'ne_pritje'
      )
    RETURNING id
  `;

  return rezultatet.length > 0;
}
