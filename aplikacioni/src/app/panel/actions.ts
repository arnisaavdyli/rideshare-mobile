
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { sql } from "../../lib/db";
import { eshteShofer, eshtePronari } from "../../lib/lejet";
import { revalidatePath } from "next/cache";

export async function ndryshoOren(
  udhetimiId: number,
  ora: string
) {
  const session = await getServerSession(authOptions);
  const githubId = session?.user?.id;

  if (!githubId) {
    return { error: "Duhet të kyçesh." };
  }

  if (!Number.isSafeInteger(udhetimiId) || udhetimiId <= 0) {
    return { error: "ID e pavlefshme." };
  }

  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(ora)) {
    return { error: "Ora duhet të jetë në formatin HH:MM." };
  }

  if (
    !(await eshteShofer(githubId)) ||
    !(await eshtePronari(udhetimiId, githubId))
  ) {
    return { error: "Nuk ke leje ta ndryshosh këtë udhëtim." };
  }

  const rezultat = await sql`
    UPDATE udhetimet
    SET ora = ${ora}
    WHERE id = ${udhetimiId}
      AND shofer_id = ${githubId}
    RETURNING id, ora
  `;

  if (rezultat.length === 0) {
    return { error: "Nuk ke leje ta ndryshosh këtë udhëtim." };
  }

  revalidatePath("/panel");

  return { success: true };
}
