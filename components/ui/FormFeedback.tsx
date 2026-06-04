import { CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';

interface FormFeedbackProps {
  type: 'success' | 'error';
  message: string;
  whatsappNumber?: string;
  whatsappLabel?: string;
}

export default function FormFeedback({ type, message, whatsappNumber, whatsappLabel }: FormFeedbackProps) {
  if (type === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle size={32} color="#10b981" />
        </div>
        <p className="text-emerald-700 font-semibold text-lg">{message}</p>
        {whatsappNumber && (
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#25D366' }}
          >
            <MessageCircle size={18} color="white" />
            {whatsappLabel ?? 'Continuer sur WhatsApp'}
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
      <AlertCircle size={20} color="#ef4444" className="flex-shrink-0 mt-0.5" />
      <p className="text-red-600 text-sm">{message}</p>
    </div>
  );
}
