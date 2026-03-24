import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
import { SiGmail } from "react-icons/si";

const RECIPIENT = "monarch32002@gmail.com";

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

interface EmailLinks {
  subject: string;
  body: string;
}

function buildEmailLinks(data: InsertInquiry): EmailLinks {
  const subject = `Quote Request – ${data.service}`;
  const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "Not provided"}\nService: ${data.service}\n\nMessage:\n${data.message}`;
  return { subject, body };
}

export function ContactSection() {
  const { toast } = useToast();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [emailLinks, setEmailLinks] = useState<EmailLinks | null>(null);

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
      return data;
    },
    onSuccess: (data) => {
      setEmailLinks(buildEmailLinks(data));
      setPickerOpen(true);
      form.reset({ name: "", email: "", phone: "", service: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  function openGmail() {
    if (!emailLinks) return;
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(RECIPIENT)}&su=${encodeURIComponent(emailLinks.subject)}&body=${encodeURIComponent(emailLinks.body)}`;
    window.open(url, "_blank");
    setPickerOpen(false);
  }

  function openOutlook() {
    if (!emailLinks) return;
    const url = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(RECIPIENT)}&subject=${encodeURIComponent(emailLinks.subject)}&body=${encodeURIComponent(emailLinks.body)}`;
    window.open(url, "_blank");
    setPickerOpen(false);
  }

  function openDefaultMail() {
    if (!emailLinks) return;
    window.location.href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(emailLinks.subject)}&body=${encodeURIComponent(emailLinks.body)}`;
    setPickerOpen(false);
  }

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
                          <Input placeholder="John Smith" {...field} data-testid="input-name" />
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
                          <Input type="email" placeholder="john@example.com" {...field} data-testid="input-email" />
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

      <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
        <DialogContent className="sm:max-w-md" data-testid="dialog-email-picker">
          <DialogHeader>
            <DialogTitle>Choose how to send your request</DialogTitle>
            <DialogDescription>
              Your quote request is ready. Select your email app to send it to BTI.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12"
              onClick={openGmail}
              data-testid="button-open-gmail"
            >
              <SiGmail className="w-5 h-5 text-red-500" />
              Open in Gmail
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12"
              onClick={openOutlook}
              data-testid="button-open-outlook"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="4" fill="#0078D4"/>
                <path d="M13 6h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-7V6z" fill="#fff" fillOpacity=".3"/>
                <path d="M20.5 8.5 13 12.5V18h7a.5.5 0 0 0 .5-.5v-9z" fill="#fff" fillOpacity=".2"/>
                <path d="M13 12.5 20.5 8.5M13 6v12" stroke="#fff" strokeWidth="1" strokeOpacity=".6"/>
                <rect x="3" y="7" width="11" height="10" rx="1.5" fill="#fff"/>
                <ellipse cx="8.5" cy="12" rx="2.5" ry="3" fill="#0078D4"/>
              </svg>
              Open in Outlook
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12"
              onClick={openDefaultMail}
              data-testid="button-open-default-mail"
            >
              <Mail className="w-5 h-5 text-muted-foreground" />
              Use my default mail app
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
