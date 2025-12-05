import { ConsultationHistory } from "../../components/features/ConsultationHistory";

export function HistoryPage() {
  return (
    <div className="space-y-6 animate-fade-in p-6">
      <div>
        <h1 className="text-3xl font-bold text-industrial-100 mb-2">
          Consultation History
        </h1>
        <p className="text-industrial-400">
          View and manage all your vehicle diagnostic consultations
        </p>
      </div>
      <ConsultationHistory />
    </div>
  );
}


