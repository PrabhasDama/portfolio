import { Intro } from "@/components/sections/intro";
import { SelectedWork } from "@/components/sections/selected-work";
import { Writing } from "@/components/sections/writing";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main id="main" className="page">
      <Intro />
      <SelectedWork />
      <Writing />
      <About />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
