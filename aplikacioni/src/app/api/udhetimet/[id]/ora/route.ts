
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { sql } from "../../../../../lib/db";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Duhet të kyçesh." },
      { status: 401 }
    );
  }

  const githubId = session.user.id;

  const { id } = await context.params;
  const udhetimiId = Number(id);

  if (!Number.isSafeInteger(udhetimiId) || udhetimiId <= 0) {
    return NextResponse.json(
      { error: "ID e pavlefshme." },
      { status: 400 }
    );
  }

  const body = await request.json().catch(() => null);
  const ora = body?.ora;

  if (
    typeof ora !== "string" ||
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(ora)
  ) {
    return NextResponse.json(
      { error: "Ora duhet të jetë në formatin HH:MM." },
      { status: 400 }
    );
  }

  const rezultat = await sql`
    UPDATE udhetimet
    SET ora = ${ora}
    WHERE id = ${udhetimiId}
      AND shofer_id = ${githubId}
      AND EXISTS (
        SELECT 1
        FROM profilet
        WHERE github_user_id = ${githubId}
          AND roli = 'shofer'
      )
    RETURNING id, ora
  `;

  if (rezultat.length === 0) {
    return NextResponse.json(
      { error: "Nuk ke leje ta ndryshosh këtë udhëtim." },
      { status: 403 }
    );
  }

  return NextResponse.json({
    message: "Ora u përditësua me sukses.",
    udhetimi: rezultat[0],
  });
}
