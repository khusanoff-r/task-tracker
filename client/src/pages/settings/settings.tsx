import { useState } from "react";

import {
  Button,
  FormField,
  PageHeader,
  SettingsSection,
  Toggle,
} from "@/components";
import { FIELD_CLASS } from "@/constants";

type SaveState = "idle" | "dirty" | "saved";

const saveMessages: Record<SaveState, string> = {
  idle: "No changes yet.",
  dirty: "You have unsaved changes.",
  saved: "Your changes have been saved locally.",
};

export const Settings = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: "Frontend Developer",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    taskReminders: true,
    projectUpdates: false,
    weeklyReport: true,
  });

  const [language, setLanguage] = useState("en");
  const [saveState, setSaveState] = useState<SaveState>("idle");

  const updateProfile = (field: keyof typeof profile, value: string) => {
    setProfile((previous) => ({ ...previous, [field]: value }));
    setSaveState("dirty");
  };

  const updatePreference = (
    field: keyof typeof preferences,
    value: boolean,
  ) => {
    setPreferences((previous) => ({ ...previous, [field]: value }));
    setSaveState("dirty");
  };

  // Пока настройки хранятся только в состоянии приложения.
  const handleSave = () => setSaveState("saved");

  return (
    <section className="mx-auto w-full max-w-360 space-y-8">
      <PageHeader
        title="Settings"
        description="Manage your profile and application preferences."
      />

      <div className="space-y-6">
        <SettingsSection
          title="Profile Information"
          description="Update your personal information."
        >
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-2xl font-bold text-violet-600">
              {profile.name.charAt(0).toUpperCase() || "?"}
            </div>

            <div>
              <p className="font-semibold text-gray-900">{profile.name}</p>
              <p className="mt-1 text-sm text-gray-400">{profile.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField label="Full Name" htmlFor="profile-name">
              <input
                id="profile-name"
                value={profile.name}
                onChange={(event) => updateProfile("name", event.target.value)}
                className={FIELD_CLASS}
              />
            </FormField>

            <FormField label="Email Address" htmlFor="profile-email">
              <input
                id="profile-email"
                type="email"
                value={profile.email}
                onChange={(event) => updateProfile("email", event.target.value)}
                className={FIELD_CLASS}
              />
            </FormField>

            <FormField label="Job Title" htmlFor="profile-role">
              <input
                id="profile-role"
                value={profile.role}
                onChange={(event) => updateProfile("role", event.target.value)}
                className={FIELD_CLASS}
              />
            </FormField>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Notifications"
          description="Choose which notifications you want to receive."
        >
          <div className="divide-y divide-gray-100">
            <Toggle
              label="Email Notifications"
              description="Receive important updates by email."
              checked={preferences.emailNotifications}
              onChange={(value) =>
                updatePreference("emailNotifications", value)
              }
            />

            <Toggle
              label="Task Reminders"
              description="Get reminders about upcoming task deadlines."
              checked={preferences.taskReminders}
              onChange={(value) => updatePreference("taskReminders", value)}
            />

            <Toggle
              label="Project Updates"
              description="Receive notifications about project changes."
              checked={preferences.projectUpdates}
              onChange={(value) => updatePreference("projectUpdates", value)}
            />

            <Toggle
              label="Weekly Report"
              description="Receive a weekly summary of your productivity."
              checked={preferences.weeklyReport}
              onChange={(value) => updatePreference("weeklyReport", value)}
            />
          </div>
        </SettingsSection>

        <SettingsSection
          title="Application Preferences"
          description="Customize your application experience."
        >
          <div className="max-w-sm">
            <FormField label="Language" htmlFor="language">
              <select
                id="language"
                value={language}
                onChange={(event) => {
                  setLanguage(event.target.value);
                  setSaveState("dirty");
                }}
                className={FIELD_CLASS}
              >
                <option value="en">English</option>
                <option value="ru">Русский</option>
              </select>
            </FormField>
          </div>
        </SettingsSection>

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-gray-400" role="status">
            {saveMessages[saveState]}
          </p>

          <Button onClick={handleSave} disabled={saveState !== "dirty"}>
            Save Changes
          </Button>
        </div>
      </div>
    </section>
  );
};
