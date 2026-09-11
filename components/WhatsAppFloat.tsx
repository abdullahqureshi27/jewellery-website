'use client';

/**
 * Client Component: Floating VIP WhatsApp concierge action button.
 * Styled as a sleek circular floating action button featuring the official WhatsApp brand icon.
 */

export default function WhatsAppFloat() {
  return (
    <aside aria-label="WhatsApp Concierge" className="fixed bottom-6 right-6 z-40">
      <a
        href="https://wa.me/923001234567?text=Hello,%20I%20am%20browsing%20your%20jewellery%20showcase%20and%20would%20like%20assistance."
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl hover:shadow-[0_10px_25px_-5px_rgba(37,211,102,0.5)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
        aria-label="Chat with Jewellery Concierge on WhatsApp"
        title="Chat with Jewellery Concierge on WhatsApp"
      >
        {/* Subtle Online Availability Pulse Indicator */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300 border-2 border-white"></span>
        </span>

        {/* Authentic WhatsApp SVG Logo */}
        <svg
          className="w-7 h-7 fill-current transition-transform duration-300 group-hover:rotate-6"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.042 0C5.399 0 0 5.399 0 12.042c0 2.121.554 4.192 1.606 6.014L.014 24l6.096-1.599a11.968 11.968 0 0 0 5.932 1.569h.005c6.641 0 12.042-5.399 12.042-12.042C24.089 5.399 18.687 0 12.042 0zm6.918 17.075c-.286.804-1.427 1.488-1.97 1.57-.52.078-1.18.111-1.902-.12-.437-.139-1-.325-1.716-.635-3.019-1.304-4.991-4.344-5.141-4.544-.151-.2-1.229-1.63-1.229-3.11 0-1.48.777-2.207 1.053-2.508.275-.301.602-.376.802-.376s.402.001.577.01c.184.01.433-.07.677.517.251.603.852 2.083.927 2.233.075.15.125.326.025.526-.1.2-.151.325-.301.502-.15.176-.315.392-.451.527-.151.15-.307.313-.132.614.176.301.781 1.288 1.677 2.087 1.151 1.027 2.122 1.346 2.423 1.496.301.151.477.125.652-.075.176-.201.752-.878.952-1.179.2-.301.4-.25.676-.15.276.1 1.755.828 2.056.978.301.15.502.226.577.351.075.126.075.728-.176 1.43z" />
        </svg>
      </a>
    </aside>
  );
}
