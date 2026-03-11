import { db } from "./db";
import { testimonials, projects } from "@shared/schema";
import { sql } from "drizzle-orm";

export async function seedDatabase() {
  const existingTestimonials = await db.select({ count: sql<number>`count(*)` }).from(testimonials);
  if (Number(existingTestimonials[0].count) > 0) return;

  await db.insert(testimonials).values([
    {
      name: "Michael Torres",
      location: "Naperville, IL",
      rating: 5,
      text: "BTI completely transformed our basement into a gorgeous family entertainment space. The team was professional from start to finish, kept the job site clean, and finished ahead of schedule. The quality of the drywall work and the custom bar they built exceeded our expectations. Highly recommend!",
      service: "Basement Remodeling",
    },
    {
      name: "Sarah Chen",
      location: "Schaumburg, IL",
      rating: 5,
      text: "We hired BTI for a complete kitchen renovation and couldn't be happier. They helped us choose beautiful quartz countertops and the cabinet installation was flawless. Their attention to detail with the tile backsplash was incredible. The project manager kept us informed every step of the way.",
      service: "Kitchen Renovation",
    },
    {
      name: "David & Karen Miller",
      location: "Evanston, IL",
      rating: 5,
      text: "After getting quotes from several companies, we chose BTI for our whole-house painting project. Best decision we made. The prep work was thorough, the paint lines are crisp, and they even helped us pick the perfect colors for each room. Our home looks brand new.",
      service: "Professional Painting",
    },
    {
      name: "Robert Hernandez",
      location: "Aurora, IL",
      rating: 5,
      text: "BTI handled our complete bathroom renovation including all new plumbing. They replaced old galvanized pipes, installed a beautiful walk-in shower, and added heated floors. The plumber was licensed, courteous, and explained everything clearly. Outstanding work all around.",
      service: "Plumbing Services",
    },
    {
      name: "Jennifer Walsh",
      location: "Oak Park, IL",
      rating: 5,
      text: "We needed a full electrical panel upgrade and smart lighting installation throughout our 1920s home. BTI's electricians were knowledgeable about code requirements for older homes and did a meticulous job. The new recessed lighting completely changed the feel of our living spaces.",
      service: "Electrical Work",
    },
  ]);

  await db.insert(projects).values([
    {
      title: "Modern Basement Entertainment Suite",
      description: "Complete basement transformation featuring a home theater, custom wet bar, and guest bedroom with egress window in Naperville.",
      service: "Basement Remodeling",
      imageUrl: "/images/hero-basement.png",
      featured: true,
    },
    {
      title: "Contemporary Kitchen Overhaul",
      description: "Full kitchen renovation with custom navy cabinets, quartz waterfall island, and designer pendant lighting in Schaumburg.",
      service: "Kitchen Renovation",
      imageUrl: "/images/service-kitchen.png",
      featured: true,
    },
    {
      title: "Whole-Home Interior Painting",
      description: "Complete interior repaint with accent walls, trim refinishing, and cabinet painting for a 4-bedroom home in Evanston.",
      service: "Professional Painting",
      imageUrl: "/images/service-painting.png",
      featured: false,
    },
    {
      title: "Luxury Master Bathroom",
      description: "Spa-inspired master bathroom with freestanding tub, frameless glass shower, marble tile, and heated floors in Aurora.",
      service: "Plumbing Services",
      imageUrl: "/images/service-plumbing.png",
      featured: true,
    },
    {
      title: "Smart Lighting & Panel Upgrade",
      description: "200-amp panel upgrade with whole-home smart lighting integration, dimmer controls, and outdoor landscape lighting in Oak Park.",
      service: "Electrical Work",
      imageUrl: "/images/service-electrical.png",
      featured: false,
    },
    {
      title: "Home Theater Basement Conversion",
      description: "Unfinished basement converted to a dedicated home theater room with acoustic treatments, tiered seating, and 4K projection system.",
      service: "Basement Remodeling",
      imageUrl: "/images/gallery-1.png",
      featured: true,
    },
    {
      title: "Exterior Renovation & Curb Appeal",
      description: "Complete exterior makeover including new siding, window replacements, updated landscaping, and fresh paint for a suburban Chicago home.",
      service: "General Remodeling",
      imageUrl: "/images/gallery-2.png",
      featured: false,
    },
    {
      title: "Spa-Style Guest Bathroom",
      description: "Guest bathroom renovation featuring a freestanding tub, marble flooring, double vanity, and custom frameless mirror in Hinsdale.",
      service: "Bathroom Renovation",
      imageUrl: "/images/gallery-3.png",
      featured: true,
    },
  ]);

  console.log("Database seeded successfully");
}
