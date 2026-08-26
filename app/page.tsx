import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Operator } from "@/components/sections/Operator";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Capabilities } from "@/components/sections/Capabilities";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Technology } from "@/components/sections/Technology";
import { Philosophy } from "@/components/sections/Philosophy";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <Operator />
        <SelectedWork />
        <Capabilities />
        <Services />
        <Process />
        <Technology />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
