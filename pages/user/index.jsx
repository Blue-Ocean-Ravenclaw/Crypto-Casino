import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext.js";

export default function Wallet() {
  const router = useRouter();
  const { currentUser } = useAuth();

  // Only allows logged in user to access this page
  if (!currentUser) {
    router.push("/login");
  }

  return <h1>User</h1>;
}
