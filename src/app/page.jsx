import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Stack from "@/app/components/Stack";
import Projects from "@/app/components/Projects";
import Experience from "@/app/components/Experience";
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
        <Stack />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ContactModal />
      <TerminalDrawer />
    </UiProvider>
  );
}