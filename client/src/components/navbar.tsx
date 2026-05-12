import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Building2 } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  const isHome = location === "/";
  const transparentTop = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparentTop
          ? "bg-transparent"
          : "bg-background/95 backdrop-blur-md border-b border-border"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 flex-shrink-0"
            data-testid="link-logo"
          >
            <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span
              className={`text-base sm:text-lg font-extrabold leading-tight tracking-tight ${
                transparentTop ? "text-white" : "text-foreground"
              }`}
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
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    transparentTop
                      ? active
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                      : active
                        ? "text-primary"
                        : "text-foreground/70 hover:text-foreground"
                  }`}
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <Link href="/contact">
              <Button data-testid="button-get-quote-nav">Get a Free Quote</Button>
            </Link>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className={`lg:hidden ${transparentTop ? "text-white hover:text-white" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-background border-b border-border">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block w-full text-left px-3 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground rounded-md"
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full" data-testid="button-get-quote-mobile">
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
