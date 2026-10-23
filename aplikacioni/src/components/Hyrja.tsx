
"use client";

import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

export default function Hyrja() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Duke kontrolluar hyrjen...</p>;
  }

  if (!session) {
    return (
      <button onClick={() => signIn("github")}>
        Hyr me GitHub
      </button>
    );
  }

  return (
    <div>
      <p>Mirë se erdhe, {session.user?.name}!</p>
      <button onClick={() => signOut()}>
        Dil nga llogaria
      </button>
    </div>
  );
}
