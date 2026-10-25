"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Check, Loader2, Mail, Send } from "lucide-react";
import { contactInterests, profile } from "@/data/portfolioData";
import { cn, isSet } from "@/lib/utils";
import SectionHeader from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import SocialLink from "@/components/SocialLink";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

type Fields = "name" | "email" | "subject" | "message";
type Values = Record<Fields, string>;
type Errors = Partial<Record<Fields, string>>;
type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.subject.trim().length < 3) e.subject = "Please add a short subject.";
  if (v.message.trim().length < 10) e.message = "Tell me a little more (at least 10 characters).";
  return e;
}

const FIELDS: { id: Fields; label: string; type: string; autoComplete: string }[] = [
  { id: "name", label: "Name", type: "text", autoComplete: "name" },
  { id: "email", label: "Email", type: "email", autoComplete: "email" },
  { id: "subject", label: "Subject", type: "text", autoComplete: "off" },
];

export default function Contact() {
  const [values, setValues] = useState<Values>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const emailHref = isSet(profile.links.email) ? `mailto:${profile.links.email}` : undefined;

  const set = (k: Fields, val: string) => {
    const next = { ...values, [k]: val };
    setValues(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k: Fields) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(values));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(errs).length) {
      (document.querySelector(`[name="${Object.keys(errs)[0]}"]`) as HTMLElement | null)?.focus();
      return;
    }

    setStatus("loading");
    setErrorMsg("");
    try {
      const honeypot = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: Errors };
      if (res.ok && data.ok) {
        setStatus("success");
        setValues({ name: "", email: "", subject: "", message: "" });
        setTouched({});
        return;
      }
      if (data.error === "validation" && data.fields) setErrors(data.fields);
      setErrorMsg(
        data.error === "not_configured"
          ? "The form isn't connected to an inbox yet, so your message wasn't sent."
          : data.error === "rate_limited"
            ? "Too many attempts — please try again in a few minutes."
            : "Something went wrong sending your message.",
      );
      setStatus("error");
    } catch {
      setErrorMsg("Network error — please check your connection and try again.");
      setStatus("error");
    }
  };

  const inputCls = (k: Fields) =>
    cn(
      "w-full rounded-xl border bg-ink-800/70 px-4 py-3 text-base text-white placeholder:text-dim transition-colors focus:outline-none",
      errors[k] && touched[k]
        ? "border-red-400/60 focus:border-red-400"
        : "border-white/10 focus:border-accent/70",
    );

  return (
    <section id="contact" data-nav="contact" className="section-y border-t border-white/[0.05]">
      <div className="container-x">
        <SectionHeader index="11" label="Contact" title="Let's Build Something." />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="max-w-md text-pretty text-lg leading-relaxed text-muted">
                I'm a student with a lot of curiosity and a growing list of projects. If any of this
                sounds interesting, I'd like to hear from you — I'm open to:
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {contactInterests.map((c) => (
                  <li key={c} className="flex items-center gap-2.5 text-sm text-white/90">
                    <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-2">
                <SocialLink href={profile.links.linkedin} label="LinkedIn" icon={<LinkedinIcon className="h-4 w-4" />} cursor="CONNECT" />
                <SocialLink href={profile.links.github} label="GitHub" icon={<GithubIcon className="h-4 w-4" />} cursor="OPEN" />
                <SocialLink
                  href={emailHref}
                  label={isSet(profile.links.email) ? profile.links.email : "Email"}
                  icon={<Mail className="h-4 w-4" />}
                  cursor="CONNECT"
                />
              </div>
              <p className="mono-label mt-8">{profile.locationShort} · REPLY TIME: HUMAN</p>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="glass relative overflow-hidden rounded-2xl p-6 sm:p-8">
              <AnimatePresence mode="wait" initial={false}>
                {status === "success" ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    role="status"
                    className="flex min-h-[26rem] flex-col items-center justify-center text-center"
                  >
                    <span className="grid h-16 w-16 place-items-center rounded-full border border-signal/50 bg-signal/10 text-signal">
                      <Check className="h-7 w-7" />
                    </span>
                    <h3 className="mt-6 font-display text-3xl tracking-tight">Message sent.</h3>
                    <p className="mt-2 max-w-sm text-muted">Thanks for reaching out — I'll get back to you as soon as I can.</p>
                    <button type="button" onClick={() => setStatus("idle")} className="link-u mt-6 text-sm text-accent">
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    aria-label="Contact form"
                    className="space-y-5"
                  >
                    {FIELDS.map((f) => (
                      <div key={f.id}>
                        <label htmlFor={f.id} className="mono-label mb-2 block">
                          {f.label}
                        </label>
                        <input
                          id={f.id}
                          name={f.id}
                          type={f.type}
                          autoComplete={f.autoComplete}
                          value={values[f.id]}
                          onChange={(e) => set(f.id, e.target.value)}
                          onBlur={() => blur(f.id)}
                          aria-invalid={!!(errors[f.id] && touched[f.id])}
                          aria-describedby={errors[f.id] && touched[f.id] ? `${f.id}-err` : undefined}
                          className={inputCls(f.id)}
                        />
                        {errors[f.id] && touched[f.id] && (
                          <p id={`${f.id}-err`} role="alert" className="mt-1.5 text-sm text-red-300">
                            {errors[f.id]}
                          </p>
                        )}
                      </div>
                    ))}
                    <div>
                      <label htmlFor="message" className="mono-label mb-2 block">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={values.message}
                        onChange={(e) => set("message", e.target.value)}
                        onBlur={() => blur("message")}
                        aria-invalid={!!(errors.message && touched.message)}
                        aria-describedby={errors.message && touched.message ? "message-err" : undefined}
                        className={cn(inputCls("message"), "resize-y")}
                      />
                      {errors.message && touched.message && (
                        <p id="message-err" role="alert" className="mt-1.5 text-sm text-red-300">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* honeypot — hidden from people and assistive tech */}
                    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                      <label>
                        Website
                        <input name="website" tabIndex={-1} autoComplete="off" />
                      </label>
                    </div>

                    {status === "error" && (
                      <div role="alert" className="flex gap-3 rounded-xl border border-red-400/30 bg-red-400/[0.06] p-4 text-sm text-red-100">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        <p>
                          {errorMsg}
                          {emailHref && (
                            <>
                              {" "}
                              You can email me directly at{" "}
                              <a href={emailHref} className="underline">
                                {profile.links.email}
                              </a>
                              .
                            </>
                          )}
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      data-cursor="SEND"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-medium text-ink-950 transition-colors hover:bg-accent disabled:opacity-70 sm:w-auto"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
