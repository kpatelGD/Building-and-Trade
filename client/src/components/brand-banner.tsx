import logoUrl from "@assets/IMG_5286_1778552955962.png";

export function BrandBanner() {
  return (
    <section
      className="w-full"
      style={{ backgroundColor: "#E8A93C" }}
      data-testid="brand-banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 text-center sm:text-left">
        <img
          src={logoUrl}
          alt="Building and Trade Industries logo"
          className="w-28 h-28 sm:w-36 sm:h-36 rounded-md object-cover flex-shrink-0 shadow-md"
          data-testid="img-brand-logo"
        />
        <div className="flex-1">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
            style={{ color: "#0D2747" }}
          >
            Building and Trade Industries
          </h2>
          <p
            className="text-base sm:text-lg mt-3 max-w-2xl mx-auto sm:mx-0"
            style={{ color: "#0D2747", opacity: 0.85 }}
          >
            Trusted home renovation experts proudly serving Illinois and the
            Chicagoland suburbs with quality craftsmanship since day one.
          </p>
        </div>
      </div>
    </section>
  );
}
