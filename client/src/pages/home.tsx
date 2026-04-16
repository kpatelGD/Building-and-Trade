import { useEffect } from "react";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { AboutSection } from "@/components/about-section";
import { GallerySection } from "@/components/gallery-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ContactSection } from "@/components/contact-section";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const sectionMeta: Record<string, { title: string; description: string }> = {
  home: {
    title: "Building and Trade Industry Inc. | Chicagoland's Premier Remodeling",
    description:
      "Expert basement remodeling, painting, plumbing, and electrical services in Illinois and Chicagoland suburbs. Transform your home with BTI.",
  },
  services: {
    title: "Our Services – Basement, Kitchen, Painting & More | BTI Chicago",
    description:
      "Explore BTI's full range of home renovation services: basement finishing, kitchen remodels, professional painting, plumbing, and electrical work across Chicagoland.",
  },
  about: {
    title: "About BTI – Trusted Chicagoland Renovators | BTI Chicago",
    description:
      "Building and Trade Industry Inc. has 15+ years transforming homes across Illinois. 500+ completed projects, licensed & insured, 100% client satisfaction.",
  },
  gallery: {
    title: "Project Gallery – Renovation Portfolio | BTI Chicago",
    description:
      "Browse BTI's portfolio of completed basement, kitchen, and home renovation projects across Naperville, Schaumburg, Aurora, Evanston, and Chicago.",
  },
  testimonials: {
    title: "Client Reviews & Testimonials | BTI Chicago",
    description:
      "Read 5-star reviews from Chicagoland homeowners who trusted BTI with their renovation projects. See why we're the area's most recommended contractor.",
  },
  contact: {
    title: "Get a Free Renovation Estimate | BTI Chicago",
    description:
      "Request a free, no-obligation estimate from BTI. We respond within 24 hours for basement remodeling, kitchen renovation, painting, plumbing, and electrical services.",
  },
};

function applyMeta(title: string, description: string) {
  document.title = title;
  const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (metaDesc) metaDesc.content = description;
}

export default function Home() {
  useEffect(() => {
    const sectionIds = Object.keys(sectionMeta);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const { title, description } = sectionMeta[id];
            applyMeta(title, description);
          }
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-background" data-testid="page-home">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
