import type { Metadata } from "next";
import BentoGrid, { BentoItem } from "@/components/dashboard/BentoGrid";
import ProfileCard from "@/components/settings/ProfileCard";
import LearningPreferences from "@/components/settings/LearningPreferences";
import NotificationSettings from "@/components/settings/NotificationSettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import GoalProgress from "@/components/settings/GoalProgress";
import SecuritySettings from "@/components/settings/SecuritySettings";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your profile, preferences, and learning experience.",
};

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* ── Header Section ── */}
      <header className="mb-2">
        <h1 className="text-3xl font-bold text-fg-primary tracking-tight">
          Settings
        </h1>
        <p className="text-fg-secondary mt-2 font-medium">
          Manage your profile, preferences, and learning experience.
        </p>
      </header>

      {/* ── Settings Grid Layout ── */}
      <BentoGrid>
        {/* Full width profile card */}
        <BentoItem colSpan={4} disableHover={true}>
          <ProfileCard />
        </BentoItem>

        {/* First row of preferences */}
        <BentoItem colSpan={2} disableHover={true}>
          <LearningPreferences />
        </BentoItem>
        <BentoItem colSpan={2} disableHover={true}>
          <NotificationSettings />
        </BentoItem>

        {/* Second row of preferences */}
        <BentoItem colSpan={2} disableHover={true}>
          <AppearanceSettings />
        </BentoItem>
        <BentoItem colSpan={1} disableHover={true}>
          <GoalProgress />
        </BentoItem>
        <BentoItem colSpan={1} disableHover={true}>
          <SecuritySettings />
        </BentoItem>
      </BentoGrid>
    </div>
  );
}
