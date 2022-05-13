import Navigation from "./Navigation";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";

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
