import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Basement Remodeling",
    description:
      "Transform your unfinished basement into a stunning living space. We handle everything from framing and drywall to flooring, lighting, and custom finishes.",
    image: "images/hero-basement.png",
    alt: "Finished basement with home theater and custom bar remodeled by BTI in Chicagoland",
    features: ["Custom Design", "Waterproofing", "Egress Windows", "Built-in Storage"],
  },
  {
    title: "Kitchen Renovation",
    description:
      "Create the kitchen of your dreams with custom cabinetry, premium countertops, modern appliances, and thoughtful layouts that maximize your space.",
    image: "images/service-kitchen.png",
    alt: "Modern kitchen renovation with custom cabinets and quartz countertops by BTI",
    features: ["Cabinet Installation", "Countertops", "Backsplash", "Lighting Design"],
  },
  {
    title: "Professional Painting",
    description:
      "Expert interior and exterior painting services. We use premium paints and meticulous prep work to deliver flawless, long-lasting finishes every time.",
    image: "images/service-painting.png",
    alt: "Freshly painted interior room with clean edges and premium finish by BTI painters",
    features: ["Interior Painting", "Exterior Painting", "Staining", "Color Consultation"],
  },
  {
    title: "Plumbing Services",
    description:
      "Complete plumbing solutions from bathroom remodels to whole-house repiping. Our licensed plumbers ensure reliable, code-compliant installations.",
    image: "images/service-plumbing.png",
    alt: "Spa-style bathroom remodel with freestanding tub and frameless glass shower by BTI",
    features: ["Bathroom Remodel", "Fixture Install", "Pipe Repair", "Water Heaters"],
  },
  {
    title: "Electrical Work",
    description:
      "Modern electrical upgrades including panel replacements, LED lighting installations, smart home wiring, and complete electrical system overhauls.",
    image: "images/service-electrical.png",
    alt: "Smart home electrical panel upgrade and LED lighting installation by BTI electricians",
    features: ["Panel Upgrades", "LED Lighting", "Smart Home", "Code Updates"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-background" data-testid="section-services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">What We Do</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
            Our Expert Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            We provide comprehensive home renovation services across Illinois and the
            Chicagoland suburbs, backed by years of expertise and dedication to quality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className={`group overflow-visible ${
                index >= 3 ? "lg:col-span-1 md:col-span-1" : ""
              }`}
              data-testid={`card-service-${index}`}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-t-md">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-0.5 text-xs font-medium rounded-md bg-accent text-accent-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <Link href="/contact">
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-primary font-semibold text-sm no-default-hover-elevate no-default-active-elevate"
                    data-testid={`button-service-quote-${index}`}
                  >
                    Request a Quote <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
