import dynamic from "next/dynamic";
import BootSequence from "@/components/BootSequence";
import Cursor from "@/components/Cursor";
import EasterEggs from "@/components/EasterEggs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import About from "@/sections/About";
import CyberLab from "@/sections/CyberLab";
import Exploring from "@/sections/Exploring";
import Hero from "@/sections/Hero";
import Interests from "@/sections/Interests";
import Journey from "@/sections/Journey";
import Philosophy from "@/sections/Philosophy";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import Stats from "@/sections/Stats";

// Code-split the heaviest below-the-fold sections.
const TerminalSection = dynamic(() => import("@/sections/TerminalSection"));
const Contact = dynamic(() => import("@/sections/Contact"));

export default function Home() {
  return (
    <>
      <BootSequence />
      <Cursor />
      <EasterEggs />
      <Navbar />
      <main id="main">
        <Hero />
        <Ticker />
        <About />
        <Interests />
        <Skills />
        <Projects />
        <CyberLab />
        <Journey />
        <Exploring />
        <Philosophy />
        <Stats />
        <TerminalSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
