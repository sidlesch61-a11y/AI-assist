import { ConsultationForm } from "../../components/features/ConsultationForm";

export function ConsultationPage() {
  return (
    <div className="space-y-6 animate-fade-in p-6">
      <div>
        <h1 className="text-3xl font-bold text-industrial-100 mb-2">
          New Consultation
        </h1>
        <p className="text-industrial-400">
          Create a new vehicle diagnostic consultation using AI-powered analysis
        </p>
      </div>
      <ConsultationForm />
    </div>
  );
}


