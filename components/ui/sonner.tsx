'use client';

import { Toaster as Sonner, toast } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      richColors={false}
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-[#0F172A] group-[.toaster]:border-[#E2E8F0] group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl group-[.toaster]:p-4',
          title: 'group-[.toast]:font-serif group-[.toast]:font-bold group-[.toast]:text-sm group-[.toast]:text-[#0F172A]',
          description: 'group-[.toast]:text-xs group-[.toast]:text-[#64748B]',
          actionButton:
            'group-[.toast]:bg-[#0F172A] group-[.toast]:hover:bg-[#1E293B] group-[.toast]:text-white group-[.toast]:rounded-xl group-[.toast]:text-xs group-[.toast]:font-semibold group-[.toast]:px-3.5 group-[.toast]:py-2',
          cancelButton:
            'group-[.toast]:bg-[#F8FAFC] group-[.toast]:text-[#64748B] group-[.toast]:rounded-xl',
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
