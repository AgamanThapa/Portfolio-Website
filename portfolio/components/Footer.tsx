import { Mail } from "lucide-react";
import { profile } from "@/data/portfolioData";
import { isSet } from "@/lib/utils";
import SocialLink from "./SocialLink";
import { GithubIcon, LinkedinIcon } from "./icons";

export default function Footer() {
  const email = isSet(profile.links.email) ? `mailto:${profile.links.email}` : undefined;
  return (
    <footer className="border-t border-white/[0.07] py-14">
      <div className="container-x flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-3xl font-bold tracking-tight">AGAMAN THAPA</p>
          <p className="mt-2 text-muted">Cybersecurity • Development • Technology</p>
          <p className="mono-label mt-4">{profile.location}</p>
        </div>
        <div className="flex flex-col gap-5 md:items-end">
          <div className="flex gap-2">
            <SocialLink href={profile.links.linkedin} label="LinkedIn" icon={<LinkedinIcon className="h-4 w-4" />} showLabel={false} />
            <SocialLink href={profile.links.github} label="GitHub" icon={<GithubIcon className="h-4 w-4" />} showLabel={false} />
            <SocialLink href={email} label="Email" icon={<Mail className="h-4 w-4" />} showLabel={false} />
          </div>
          <p className="font-mono text-xs text-dim">Designed &amp; built with curiosity.</p>
        </div>
      </div>
      <p className="container-x mt-10 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-dim/70">
        © {new Date().getFullYear()} Agaman Thapa · Learn. Build. Break. Understand. Improve.
      </p>
    </footer>
  );
}
