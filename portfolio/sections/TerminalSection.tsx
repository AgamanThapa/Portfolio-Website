import SectionHeader from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import Terminal from "@/components/Terminal";

export default function TerminalSection() {
  return (
    <section id="terminal" data-nav="contact" className="section-y border-t border-white/[0.05]">
      <div className="container-x">
        <SectionHeader
          index="10"
          label="Terminal"
          title="Prefer a command line? Go ahead."
          kicker="This one actually works. Try help, projects, or something a little less obvious."
        />
        <Reveal>
          <Terminal />
        </Reveal>
      </div>
    </section>
  );
}
