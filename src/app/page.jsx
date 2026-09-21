import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import SkillsSection from "@/app/components/SkillsSection";
import Projects from "@/app/components/Projects";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";
import ContactModal from "@/app/components/ContactModal";
import TerminalDrawer from "@/app/components/TerminalDrawer";
import { UiProvider } from "@/app/components/UiProvider";

export default function Home() {
  return (
    <UiProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <SkillsSection />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ContactModal />
      <TerminalDrawer />
    </UiProvider>
  );
}