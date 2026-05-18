import { PageLayout } from "@/components/page-layout";
import { HeroSection } from "@/components/hero-section";

export default function Home() {
  return (
    <PageLayout
      title="Building and Trade Industry Inc. | Chicagoland's Premier Remodeling"
      description="Expert basement remodeling, painting, plumbing, and electrical services in Illinois and Chicagoland suburbs. Transform your home with Building and Trade Industry Inc."
      topPadded={false}
    >
      <HeroSection />
    </PageLayout>
  );
}
