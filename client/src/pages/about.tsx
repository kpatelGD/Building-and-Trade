import { PageLayout } from "@/components/page-layout";
import { AboutSection } from "@/components/about-section";

export default function About() {
  return (
    <PageLayout
      title="About Us – Trusted Chicagoland Renovators | Building and Trade Industry Inc."
      description="Building and Trade Industry Inc. has 15+ years transforming homes across Illinois. 500+ completed projects, licensed and insured, 100% client satisfaction."
    >
      <AboutSection />
    </PageLayout>
  );
}
