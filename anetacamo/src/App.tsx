import { Outlet, useParams } from "@tanstack/react-router";
import Menu from "./components/layout/Menu";
import { LangProvider } from "./LangContext";
import type { Lang } from "./translations";
import Footer from "./components/layout/Footer";

export default function App() {
  const { lang } = useParams({ strict: false });

  return (
    <LangProvider lang={(lang as Lang) ?? "en"}>
      <header>
        <Menu />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </LangProvider>
  );
}
