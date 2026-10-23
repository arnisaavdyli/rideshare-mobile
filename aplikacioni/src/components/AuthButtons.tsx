
"use client";

import { signIn, signOut } from "next-auth/react";

export function SignInButton() {
  return (
    <button type="button" onClick={() => signIn("github")}>
      Hyr me GitHub
    </button>
  );
}

export function SignOutButton() {
  return (
    <button type="button" onClick={() => signOut()}>
      Dil nga llogaria
    </button>
  );
}
