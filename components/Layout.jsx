import * as React from "react";
import Navigation from "./Navigation";
import { useRouter } from "next/router";

function Layout({ children }) {
  const router = useRouter();

  if (
    router.pathname === "/" ||
    router.pathname === "/login" ||
    router.pathname === "/signup"
  ) {
    return <div>{children}</div>;
  }

  return (
    <div>
      {children}
      <Navigation />
    </div>
  );
}

export default Layout;
