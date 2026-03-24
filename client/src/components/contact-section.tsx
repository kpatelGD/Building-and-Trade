import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const serviceOptions = [
  "Basement Remodeling",
  "Kitchen Renovation",
  "Professional Painting",
  "Plumbing Services",
  "Electrical Work",
  "Bathroom Renovation",
  "General Remodeling",
  "Other",
];

export function ContactSection() {
  const { toast } = useToast();
  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertInquiry) => {
      await apiRequest("POST", "/api/inquiries", data);

      const subject = encodeURIComponent(`Quote Request – ${data.service}`);
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "Not provided"}\nService: ${data.service}\n\nMessage:\n${data.message}`
      );
      window.location.href = `mailto:info@btichicago.com?subject=${subject}&body=${body}`;
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Sent!",
        description: "Your email client has opened — just hit send to reach BTI directly.",
      });
      form.reset({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  return (
    <section id="contact" className="py-20 sm:py-28 bg-background" data-testid="section-contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
            Request a Free Quote
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Tell us about your project and we'll provide a detailed estimate within 24 hours.
            No obligation, no pressure - just honest, transparent pricing.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
                className="space-y-5"
                data-testid="form-contact"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Smith"
                            {...field}
                            data-testid="input-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            {...field}
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="(312) 555-0100"
                            {...field}
                            value={field.value || ""}
                            data-testid="input-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Needed</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || undefined}>
                          <FormControl>
                            <SelectTrigger data-testid="select-service">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {serviceOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your project - the scope of work, timeline preferences, and any specific requirements you have..."
                          className="min-h-[120px] resize-none"
                          {...field}
                          data-testid="input-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={mutation.isPending}
                  data-testid="button-submit-quote"
                >
                  {mutation.isPending ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Quote Request
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-md bg-card border border-border p-6 space-y-5">
              <h3 className="text-lg font-bold text-foreground">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Location</p>
                    <p className="text-sm text-muted-foreground">Serving Illinois & Chicagoland Suburbs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Phone</p>
                    <p className="text-sm text-muted-foreground">(312) 555-0199</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">info@btichicago.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Business Hours</p>
                    <p className="text-sm text-muted-foreground">Mon - Fri: 7:00 AM - 6:00 PM</p>
                    <p className="text-sm text-muted-foreground">Sat: 8:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md bg-primary p-6">
              <h3 className="text-lg font-bold text-primary-foreground mb-2">
                Emergency Service Available
              </h3>
              <p className="text-sm text-primary-foreground/80 mb-3">
                Have an urgent plumbing or electrical issue? We offer emergency
                response for critical situations.
              </p>
              <p className="text-xl font-bold text-primary-foreground">(312) 555-0199</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
