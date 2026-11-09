
import { NextResponse } from "next/server";
import { sql } from "../../../lib/db";

export async function GET() {
  try {
    const udhetimet = await sql`
      SELECT id, nisja, destinacioni, ora
      FROM udhetimet
      ORDER BY id DESC
      LIMIT 3
    `;

    return NextResponse.json(udhetimet, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Gabimi i API udhetimet:", error);

    return NextResponse.json(
      { error: "Nuk u arrit të merren udhëtimet." },
      { status: 500 }
    );
  }
}
