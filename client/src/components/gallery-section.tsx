import { useQuery } from "@tanstack/react-query";
import type { Project } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

export function GallerySection() {
  const { data: projects, isLoading, isError, refetch } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-background" data-testid="section-gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Our Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
            Recent Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Browse our portfolio of completed renovations across the Chicagoland area.
            Every project showcases our commitment to excellence.
          </p>
        </div>

        {isError ? (
          <div className="text-center py-12">
            <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground mb-4">Unable to load projects right now.</p>
            <Button variant="secondary" onClick={() => refetch()} data-testid="button-retry-gallery">
              <RefreshCw className="w-4 h-4 mr-2" /> Try Again
            </Button>
          </div>
        ) : isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[4/3] w-full rounded-md" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-md"
                data-testid={`gallery-item-${project.id}`}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-md">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex items-end">
                  <div className="p-5">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {project.service}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">{project.title}</h3>
                    <p className="text-sm text-white/80 mt-1 line-clamp-2">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
