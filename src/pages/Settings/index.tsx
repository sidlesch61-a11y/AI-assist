import { WorkshopCustomization } from "./WorkshopCustomization";

export function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in p-6 h-full overflow-y-auto">
      <div>
        <h1 className="text-3xl font-bold text-industrial-100 mb-2">Settings</h1>
        <p className="text-industrial-400">
          Configure workshop and account settings
        </p>
      </div>
      <WorkshopCustomization />
    </div>
  );
}

