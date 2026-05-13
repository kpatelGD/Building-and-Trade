import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoUrl from "@assets/IMG_5286_1778552955962.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

const GOLD = "#E8A93C";
const NAVY = "#0D2747";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ backgroundColor: GOLD, borderColor: "rgba(13,39,71,0.15)" }}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 sm:gap-3 flex-shrink-0"
            data-testid="link-logo"
          >
            <img
              src={logoUrl}
              alt="Building and Trade Industries logo"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-md object-cover"
              data-testid="img-nav-logo"
            />
            <span
              className="text-base sm:text-lg font-extrabold leading-tight tracking-tight"
              style={{ color: NAVY }}
            >
              Building and Trade Industries
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 text-sm font-semibold rounded-md transition-opacity ${
                    active ? "opacity-100 underline underline-offset-4" : "opacity-80 hover:opacity-100"
                  }`}
                  style={{ color: NAVY }}
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <Link href="/contact">
              <Button
                style={{ backgroundColor: NAVY, color: "white" }}
                className="hover:opacity-90"
                data-testid="button-get-quote-nav"
              >
                Get a Free Quote
              </Button>
            </Link>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="lg:hidden hover:bg-black/10"
            style={{ color: NAVY }}
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t" style={{ backgroundColor: GOLD, borderColor: "rgba(13,39,71,0.15)" }}>
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block w-full text-left px-3 py-2.5 text-sm font-semibold rounded-md hover:bg-black/10"
                style={{ color: NAVY }}
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <Button
                  className="w-full hover:opacity-90"
                  style={{ backgroundColor: NAVY, color: "white" }}
                  data-testid="button-get-quote-mobile"
                >
                  Get a Free Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
