import { PageLayout } from "@/components/page-layout";
import { HeroSection } from "@/components/hero-section";
import { BrandBanner } from "@/components/brand-banner";

export default function Home() {
  return (
    <PageLayout
      title="Building and Trade Industries | Chicagoland's Premier Remodeling"
      description="Expert basement remodeling, painting, plumbing, and electrical services in Illinois and Chicagoland suburbs. Transform your home with Building and Trade Industries."
      topPadded={false}
    >
      <HeroSection />
      <BrandBanner />
    </PageLayout>
  );
}
