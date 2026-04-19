import { AccountSettings } from "@/components/settings/account-settings";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Account Settings | Medical Exam UCAT",
  description: "Manage your account settings and preferences",
};

export default function SettingsPage() {
  return <AccountSettings />;
}
