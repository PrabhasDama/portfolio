import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { CalTrackFeature } from "@/components/sections/caltrack-feature";
import { OtherProjects } from "@/components/sections/other-projects";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Capabilities } from "@/components/sections/capabilities";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main id="main" className="page-container">
      <div id="top" />
      <Hero />
      <SelectedWork />
      <CalTrackFeature />
      <OtherProjects />
      <About />
      <Experience />
      <Capabilities />
      <Contact />
      <Footer />
    </main>
  );
}
