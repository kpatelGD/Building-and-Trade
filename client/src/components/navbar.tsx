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

const NAVY = "#1A2B4A";
const GOLD = "#E8A93C";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ backgroundColor: NAVY, borderColor: "rgba(255,255,255,0.1)" }}
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
              alt="Building and Trade Industry Inc. logo"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-md object-cover"
              data-testid="img-nav-logo"
            />
            <span
              className="text-base sm:text-lg font-extrabold leading-tight tracking-tight text-white"
            >
              Building and Trade Industry Inc.
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
                  className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                    active ? "text-white underline underline-offset-4" : "text-white/80 hover:text-white"
                  }`}
                  style={active ? { textDecorationColor: GOLD } : undefined}
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
                style={{ backgroundColor: GOLD, color: NAVY }}
                className="hover:opacity-90 font-semibold"
                data-testid="button-get-quote-nav"
              >
                Get a Free Quote
              </Button>
            </Link>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="lg:hidden text-white hover:bg-white/10 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t" style={{ backgroundColor: NAVY, borderColor: "rgba(255,255,255,0.1)" }}>
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block w-full text-left px-3 py-2.5 text-sm font-semibold rounded-md text-white hover:bg-white/10"
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <Button
                  className="w-full hover:opacity-90 font-semibold"
                  style={{ backgroundColor: GOLD, color: NAVY }}
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
