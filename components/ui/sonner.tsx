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
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl group-[.toaster]:p-4',
          title: 'group-[.toast]:font-serif group-[.toast]:font-bold group-[.toast]:text-sm group-[.toast]:text-foreground',
          description: 'group-[.toast]:text-xs group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:hover:bg-primary/90 group-[.toast]:text-primary-foreground group-[.toast]:rounded-xl group-[.toast]:text-xs group-[.toast]:font-semibold group-[.toast]:px-3.5 group-[.toast]:py-2 cursor-pointer',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-xl cursor-pointer',
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
