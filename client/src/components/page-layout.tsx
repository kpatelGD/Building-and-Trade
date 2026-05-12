import { useEffect, ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

interface PageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  topPadded?: boolean;
}

export function PageLayout({
  title,
  description,
  children,
  topPadded = true,
}: PageLayoutProps) {
  useEffect(() => {
    document.title = title;
    const metaDesc = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    if (metaDesc) metaDesc.content = description;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [title, description]);

  return (
    <div className="min-h-screen bg-background flex flex-col" data-testid="page-layout">
      <Navbar />
      <main className={`flex-1 ${topPadded ? "pt-16 sm:pt-20" : ""}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
