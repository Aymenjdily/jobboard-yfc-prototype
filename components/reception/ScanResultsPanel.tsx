"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState, type KeyboardEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { TextAreaField, TextField } from "@/components/ui/Field";
import { useAppStore } from "@/lib/store";
import type { CandidateProfile, Education, Experience } from "@/lib/types";
import { cn } from "@/lib/utils";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isResultsValid(profile: CandidateProfile) {
  return profile.fullName.trim() !== "" && EMAIL_RE.test(profile.email.trim());
}

const EMPTY_EXPERIENCE: Experience = { company: "", role: "", location: "", start: "", end: null, description: "" };
const EMPTY_EDUCATION: Education = { school: "", degree: "", start: "", end: "" };

/** Sections fade in one after another when the results appear. */
const stagger = (index: number) => ({ animationDelay: `${index * 80}ms` });
const REVEAL = "animate-fade-in-up motion-reduce:animate-none";

interface SectionProps {
  title: string;
  index: number;
  action?: ReactNode;
  children: ReactNode;
}

function Section({ title, index, action, children }: SectionProps) {
  return (
    <section className={cn("flex flex-col gap-4", REVEAL)} style={stagger(index)}>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base font-semibold text-fg">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

function RemoveButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="rounded-md p-2 text-fg-muted transition-colors hover:bg-btn hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <Trash2 size={18} aria-hidden="true" />
    </button>
  );
}

export function ScanResultsPanel() {
  const { state, dispatch } = useAppStore();
  const { profile } = state;
  const [touched, setTouched] = useState<{ fullName?: boolean; email?: boolean }>({});
  const [skillDraft, setSkillDraft] = useState("");

  const update = (patch: Partial<CandidateProfile>) => dispatch({ type: "updateProfile", profile: patch });

  const updateExperience = (index: number, patch: Partial<Experience>) =>
    update({ experiences: profile.experiences.map((item, i) => (i === index ? { ...item, ...patch } : item)) });
  const updateEducation = (index: number, patch: Partial<Education>) =>
    update({ education: profile.education.map((item, i) => (i === index ? { ...item, ...patch } : item)) });

  function addSkill() {
    const skill = skillDraft.trim();
    if (skill && !profile.skills.some((s) => s.toLowerCase() === skill.toLowerCase())) {
      update({ skills: [...profile.skills, skill] });
    }
    setSkillDraft("");
  }

  function onSkillKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addSkill();
    }
  }

  const nameError = touched.fullName && !profile.fullName.trim() ? "Full name is required." : null;
  const emailError =
    touched.email && !EMAIL_RE.test(profile.email.trim())
      ? profile.email.trim()
        ? "Enter a valid email address."
        : "Email is required."
      : null;

  return (
    <div className="flex flex-col gap-[30px]">
      <div className={REVEAL} style={stagger(0)}>
        <h2 className="text-xl font-semibold text-fg">Scanning results</h2>
        <p className="mt-2 text-sm text-fg-secondary">
          We filled this in from your CV. Check everything and fix anything that&apos;s off.
        </p>
      </div>

      <Section title="Personal information" index={1}>
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="Full name"
            required
            value={profile.fullName}
            onChange={(e) => update({ fullName: e.target.value })}
            onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
            error={nameError}
            autoComplete="name"
          />
          <TextField
            label="Job title"
            value={profile.title}
            onChange={(e) => update({ title: e.target.value })}
            placeholder="e.g. Financial Analyst"
          />
          <TextField
            label="Email"
            required
            type="email"
            value={profile.email}
            onChange={(e) => update({ email: e.target.value })}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            error={emailError}
            autoComplete="email"
          />
          <TextField
            label="Phone"
            type="tel"
            value={profile.phone}
            onChange={(e) => update({ phone: e.target.value })}
            autoComplete="tel"
          />
          <TextField
            label="Location"
            value={profile.location}
            onChange={(e) => update({ location: e.target.value })}
            placeholder="e.g. Casablanca, Morocco"
            className="md:col-span-2"
          />
          <TextAreaField
            label="Summary"
            value={profile.summary}
            onChange={(e) => update({ summary: e.target.value })}
            rows={4}
            className="md:col-span-2"
          />
        </div>
      </Section>

      <Section
        title="Work experience"
        index={2}
        action={
          <Button onClick={() => update({ experiences: [...profile.experiences, EMPTY_EXPERIENCE] })} className="h-9 px-3">
            <Plus size={16} aria-hidden="true" /> Add experience
          </Button>
        }
      >
        {profile.experiences.length === 0 && <p className="text-sm text-fg-muted">No work experience found in your CV.</p>}
        {profile.experiences.map((exp, index) => (
          <div key={index} className="animate-fade-in-up rounded-lg border border-border p-4 motion-reduce:animate-none">
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="truncate text-sm font-medium text-fg-secondary">
                {[exp.role, exp.company].filter(Boolean).join(" · ") || "New experience"}
              </p>
              <RemoveButton
                label={`Remove ${exp.role || "experience"}`}
                onClick={() => update({ experiences: profile.experiences.filter((_, i) => i !== index) })}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="Role" value={exp.role} onChange={(e) => updateExperience(index, { role: e.target.value })} />
              <TextField
                label="Company"
                value={exp.company}
                onChange={(e) => updateExperience(index, { company: e.target.value })}
              />
              <TextField
                label="Start"
                value={exp.start}
                onChange={(e) => updateExperience(index, { start: e.target.value })}
                placeholder="e.g. Dec 2021"
              />
              <TextField
                label="End"
                value={exp.end ?? ""}
                onChange={(e) => updateExperience(index, { end: e.target.value || null })}
                placeholder="Present"
              />
              <TextField
                label="Location"
                value={exp.location}
                onChange={(e) => updateExperience(index, { location: e.target.value })}
                className="md:col-span-2"
              />
              <TextAreaField
                label="Description"
                value={exp.description}
                onChange={(e) => updateExperience(index, { description: e.target.value })}
                className="md:col-span-2"
              />
            </div>
          </div>
        ))}
      </Section>

      <Section
        title="Education"
        index={3}
        action={
          <Button onClick={() => update({ education: [...profile.education, EMPTY_EDUCATION] })} className="h-9 px-3">
            <Plus size={16} aria-hidden="true" /> Add education
          </Button>
        }
      >
        {profile.education.length === 0 && <p className="text-sm text-fg-muted">No education found in your CV.</p>}
        {profile.education.map((edu, index) => (
          <div key={index} className="animate-fade-in-up rounded-lg border border-border p-4 motion-reduce:animate-none">
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="truncate text-sm font-medium text-fg-secondary">{edu.school || "New education"}</p>
              <RemoveButton
                label={`Remove ${edu.school || "education"}`}
                onClick={() => update({ education: profile.education.filter((_, i) => i !== index) })}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="School" value={edu.school} onChange={(e) => updateEducation(index, { school: e.target.value })} />
              <TextField label="Degree" value={edu.degree} onChange={(e) => updateEducation(index, { degree: e.target.value })} />
              <TextField label="Start" value={edu.start} onChange={(e) => updateEducation(index, { start: e.target.value })} />
              <TextField label="End" value={edu.end} onChange={(e) => updateEducation(index, { end: e.target.value })} />
            </div>
          </div>
        ))}
      </Section>

      <Section title="Skills" index={4}>
        <TextField
          label="Add a skill"
          value={skillDraft}
          onChange={(e) => setSkillDraft(e.target.value)}
          onKeyDown={onSkillKeyDown}
          onBlur={addSkill}
          placeholder="Type a skill and press Enter"
        />
        {profile.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onRemove={() => update({ skills: profile.skills.filter((s) => s !== skill) })}
              />
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
