import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Award } from "lucide-react";

export function HeroSection() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center"
      data-testid="section-hero"
    >
      <div className="absolute inset-0">
        <img
          src="images/hero-basement.png"
          alt="Beautiful basement remodel by BTI"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/20 backdrop-blur-sm border border-primary/30 mb-6">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary-foreground/90">
              Chicagoland's Trusted Renovation Experts
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Transform Your Home
            <span className="block text-primary">
              Into Something Extraordinary
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-xl">
            From basement remodels to complete home renovations, Building and
            Trade Industry Inc. delivers expert craftsmanship throughout
            Illinois and the Chicagoland suburbs.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <Button
              size="lg"
              onClick={() => scrollTo("#contact")}
              data-testid="button-hero-quote"
            >
              Get Your Free Estimate
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white"
              onClick={() => scrollTo("#services")}
              data-testid="button-hero-services"
            >
              View Our Services
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-md">
            <div className="text-center">
              <Shield className="w-6 h-6 text-primary mx-auto mb-1.5" />
              <p className="text-xs sm:text-sm font-semibold text-white">
                Licensed & Insured
              </p>
            </div>
            <div className="text-center">
              <Clock className="w-6 h-6 text-primary mx-auto mb-1.5" />
              <p className="text-xs sm:text-sm font-semibold text-white">
                On-Time Delivery
              </p>
            </div>
            <div className="text-center">
              <Award className="w-6 h-6 text-primary mx-auto mb-1.5" />
              <p className="text-xs sm:text-sm font-semibold text-white">
                Quality Guaranteed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
