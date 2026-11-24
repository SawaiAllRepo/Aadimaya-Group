import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Process from "./pages/Process";
import Contact from "./pages/Contact";

import SupportChat from "./components/SupportChat";
import StatsBar from "./components/StatsBar";
import ScrollReveal from "./components/ScrollReveal";
import TransformationPreview from "./components/TransformationPreview";
import LocationMap from "./components/LocationMap";

import Admin from "./pages/Admin";

import { useEffect, useState } from "react";

function App() {
  const getPanel = () => {
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase();

    if (hash === "#developer" || path === "/developer") {
      return "developer";
    }

    if (hash === "#admin" || path === "/admin") {
      return "admin";
    }

    return null;
  };

  const isProjectDetailPath = () => {
    return /^\/projects\/[^/]+\/?$/i.test(
      window.location.pathname
    );
  };

  const [panel, setPanel] = useState(() => getPanel());

  const [isProjectDetail, setIsProjectDetail] = useState(() =>
    isProjectDetailPath()
  );

  useEffect(() => {
    const syncRoute = () => {
      setPanel(getPanel());
      setIsProjectDetail(isProjectDetailPath());
    };

    window.addEventListener("hashchange", syncRoute);
    window.addEventListener("popstate", syncRoute);

    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.removeEventListener("popstate", syncRoute);
    };
  }, []);

  if (panel) {
    return <Admin role={panel} />;
  }

  /*
   * Project detail page:
   * /projects/project-id
   *
   * Only Navbar + Projects + Footer are rendered.
   * Home page sections are NOT rendered.
   */
  if (isProjectDetail) {
    return (
      <>
        <Navbar />

        <main>
          <Projects />
        </main>

        <Footer />

        <SupportChat />
      </>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Adimaya Group",
    url: "https://www.adimayagroup.com/",
    description:
      "Residential and commercial development, contracting, redevelopment and land development solutions.",
    areaServed: "India",
    serviceType: [
      "Residential & Commercial",
      "Contracting",
      "Redevelopment",
      "Land Development",
    ],
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <Navbar />

      <main>
        <ScrollReveal>
          <Home />
        </ScrollReveal>

        <ScrollReveal delay={60}>
          <StatsBar />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <Projects />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <Services />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <Process />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <About />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <TransformationPreview />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <LocationMap />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <Contact />
        </ScrollReveal>
      </main>

      <Footer />

      <SupportChat />
    </>
  );
}

export default App;