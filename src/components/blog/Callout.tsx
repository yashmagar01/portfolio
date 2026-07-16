import type { ReactNode } from 'react';
import { AlertTriangle, Info, CheckCircle2, Lightbulb, Quote } from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'success' | 'tip' | 'quote';

interface CalloutProps {
  type: CalloutType;
  children: ReactNode;
}

const config: Record<CalloutType, { icon: typeof Info; bg: string; border: string; iconColor: string }> = {
  info: {
    icon: Info,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconColor: 'text-blue-600',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    iconColor: 'text-amber-600',
  },
  success: {
    icon: CheckCircle2,
    bg: 'bg-green-50',
    border: 'border-green-200',
    iconColor: 'text-green-600',
  },
  tip: {
    icon: Lightbulb,
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    iconColor: 'text-purple-600',
  },
  quote: {
    icon: Quote,
    bg: 'bg-muted/50',
    border: 'border-border',
    iconColor: 'text-muted-foreground',
  },
};

export function Callout({ type, children }: CalloutProps) {
  const c = config[type];
  const Icon = c.icon;

  return (
    <div className={`my-6 flex gap-3 rounded-lg border ${c.bg} ${c.border} p-4`}>
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${c.iconColor}`} />
      <div className="text-sm leading-relaxed text-foreground/90 [&_p]:my-0 [&_p]:text-sm">
        {children}
      </div>
    </div>
  );
}
