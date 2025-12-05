import type { ReactNode } from "react";

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ title, open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-industrial-950/80">
      <div className="w-full max-w-lg rounded-lg border border-industrial-800 bg-industrial-900 p-4 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-industrial-100">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-industrial-400 hover:text-industrial-200"
          >
            ×
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}


