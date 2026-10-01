import type { Metadata } from "next";
import { ReceptionStepCards } from "@/components/reception/ReceptionStepCards";

export const metadata: Metadata = {
  title: "Reception",
  description: "Create your profile to start applying: upload your CV, set your preferences and attend workshops.",
};

export default function ReceptionPage() {
  return (
    <main className="flex flex-1 flex-col items-center px-4 pt-16 pb-16 sm:px-6 sm:pt-36">
      <h1 className="text-center text-xl font-semibold text-fg">Create your profile to start applying</h1>
      <p className="mt-2 text-center text-base text-fg-secondary">Prepare your profile for interviews</p>
      <div className="mt-11 flex w-full justify-center">
        <ReceptionStepCards />
      </div>
    </main>
  );
}
