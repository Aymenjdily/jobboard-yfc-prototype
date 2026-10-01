import type { Metadata } from "next";
import { ProfileWizard } from "@/components/reception/ProfileWizard";
import type { OnboardingStep } from "@/lib/types";

export const metadata: Metadata = {
  title: "Prepare your profile",
  description: "Upload your CV, review what our AI extracted, and choose the regions and industries you want to work in.",
};

function toStep(value: string | string[] | undefined): OnboardingStep {
  const step = Number(Array.isArray(value) ? value[0] : value);
  return step === 2 || step === 3 ? step : 1;
}

export default async function ReceptionProfilePage({ searchParams }: PageProps<"/reception/profile">) {
  const { step } = await searchParams;
  return <ProfileWizard step={toStep(step)} />;
}
