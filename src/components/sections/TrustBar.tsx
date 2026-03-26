import { LogoCloud } from '@/src/components/ui/logo-cloud';

const logos = [
  {
    src: "https://svgl.app/library/nvidia-wordmark-light.svg",
    alt: "Nvidia",
  },
  {
    src: "https://svgl.app/library/supabase_wordmark_light.svg",
    alt: "Supabase",
  },
  {
    src: "https://svgl.app/library/openai_wordmark_light.svg",
    alt: "OpenAI",
  },
  {
    src: "https://svgl.app/library/turso-wordmark-light.svg",
    alt: "Turso",
  },
  {
    src: "https://svgl.app/library/vercel_wordmark.svg",
    alt: "Vercel",
  },
  {
    src: "https://svgl.app/library/github_wordmark_light.svg",
    alt: "GitHub",
  },
  {
    src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
    alt: "Claude AI",
  },
  {
    src: "https://svgl.app/library/clerk-wordmark-light.svg",
    alt: "Clerk",
  },
];

export default function TrustBar() {
  return (
    <section className="py-12 md:py-16 border-t border-b border-white/5">
      <div className="relative mx-auto max-w-5xl">
        <p className="mb-5 text-center text-[10px] uppercase tracking-[0.3em] font-black text-white/20">
          Trusted by industry leaders
        </p>
        <div className="mx-auto my-5 h-px max-w-sm bg-white/10 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />

        <LogoCloud logos={logos} />

        <div className="mt-5 h-px bg-white/10 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
      </div>
    </section>
  );
}
