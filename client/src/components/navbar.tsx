import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Hammer } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-2 flex-shrink-0"
            data-testid="link-logo"
          >
            <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
              <Hammer className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-bold leading-tight tracking-tight ${scrolled ? "text-foreground" : "text-white"}`}>
                BTI
              </span>
              <span className={`text-[10px] leading-tight ${scrolled ? "text-muted-foreground" : "text-white/70"}`}>
                Building & Trade
              </span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  scrolled
                    ? "text-foreground/70 hover:text-foreground"
                    : "text-white/80 hover:text-white"
                }`}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <Button
              onClick={() => scrollTo("#contact")}
              data-testid="button-get-quote-nav"
            >
              Get a Free Quote
            </Button>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className={`md:hidden ${scrolled ? "" : "text-white"}`}
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left px-3 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground rounded-md"
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2">
              <Button
                className="w-full"
                onClick={() => scrollTo("#contact")}
                data-testid="button-get-quote-mobile"
              >
                Get a Free Quote
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
