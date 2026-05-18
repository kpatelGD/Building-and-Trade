import { PageLayout } from "@/components/page-layout";
import { GallerySection } from "@/components/gallery-section";

export default function Gallery() {
  return (
    <PageLayout
      title="Project Gallery – Renovation Portfolio | Building and Trade Industry Inc."
      description="Browse our portfolio of completed basement, kitchen, and home renovation projects across Naperville, Schaumburg, Aurora, Evanston, and Chicago."
    >
      <GallerySection />
    </PageLayout>
  );
}
