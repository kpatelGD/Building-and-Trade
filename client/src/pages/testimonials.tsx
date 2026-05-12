import { PageLayout } from "@/components/page-layout";
import { TestimonialsSection } from "@/components/testimonials-section";

export default function Testimonials() {
  return (
    <PageLayout
      title="Client Reviews & Testimonials | Building and Trade Industries"
      description="Read 5-star reviews from Chicagoland homeowners who trusted Building and Trade Industries with their renovation projects."
    >
      <TestimonialsSection />
    </PageLayout>
  );
}
