import { PageLayout } from "@/components/page-layout";
import { TestimonialsSection } from "@/components/testimonials-section";

export default function Testimonials() {
  return (
    <PageLayout
      title="Client Reviews & Testimonials | Building and Trade Industry Inc."
      description="Read 5-star reviews from Chicagoland homeowners who trusted Building and Trade Industry Inc. with their renovation projects."
    >
      <TestimonialsSection />
    </PageLayout>
  );
}
