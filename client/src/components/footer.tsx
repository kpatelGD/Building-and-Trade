import { Hammer } from "lucide-react";

const footerLinks = {
  services: [
    "Basement Remodeling",
    "Kitchen Renovation",
    "Professional Painting",
    "Plumbing Services",
    "Electrical Work",
  ],
  company: ["About Us", "Our Team", "Portfolio", "Testimonials", "Contact"],
  areas: [
    "Chicago, IL",
    "Naperville, IL",
    "Aurora, IL",
    "Schaumburg, IL",
    "Evanston, IL",
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-14" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
                <Hammer className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-bold leading-tight">Building & Trade</p>
                <p className="text-[10px] text-background/60 leading-tight">Industry Inc.</p>
              </div>
            </div>
            <p className="text-sm text-background/60 leading-relaxed">
              Transforming homes across Illinois and the Chicagoland suburbs with expert
              craftsmanship and dedication to quality.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link}>
                  <span className="text-sm text-background/60">{link}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <span className="text-sm text-background/60">{link}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Service Areas</h4>
            <ul className="space-y-2">
              {footerLinks.areas.map((link) => (
                <li key={link}>
                  <span className="text-sm text-background/60">{link}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/50">
            &copy; {new Date().getFullYear()} Building and Trade Industry Inc. All rights reserved.
          </p>
          <p className="text-xs text-background/50">
            Licensed & Insured in the State of Illinois
          </p>
        </div>
      </div>
    </footer>
  );
}
