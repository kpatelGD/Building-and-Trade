import { CheckCircle2, Users, Home, Wrench } from "lucide-react";

const stats = [
  { icon: Home, value: "500+", label: "Projects Completed" },
  { icon: Users, value: "15+", label: "Years Experience" },
  { icon: Wrench, value: "50+", label: "Expert Team Members" },
  { icon: CheckCircle2, value: "100%", label: "Client Satisfaction" },
];

const values = [
  "Licensed, bonded, and fully insured for your protection",
  "Transparent pricing with detailed written estimates",
  "On-time project completion guaranteed",
  "Premium materials from trusted suppliers",
  "Clean job sites maintained throughout the project",
  "Dedicated project manager for every renovation",
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-card" data-testid="section-about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">About BTI</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-6">
              Chicagoland's Most Trusted Renovation Company
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Building and Trade Industry Inc. has been transforming homes across Illinois and the
              Chicagoland suburbs for over 15 years. Our team of skilled craftsmen, licensed plumbers,
              electricians, and designers work together to deliver renovations that exceed expectations.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We believe every homeowner deserves a beautiful, functional living space. Whether you're
              finishing a basement, updating a kitchen, or tackling a whole-home renovation, we bring
              the same dedication to quality and attention to detail to every project.
            </p>

            <div className="space-y-3">
              {values.map((value) => (
                <div key={value} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-md bg-background border border-border"
                data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-2xl sm:text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
