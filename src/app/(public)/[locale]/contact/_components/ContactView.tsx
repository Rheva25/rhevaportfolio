"use client";

import Link from "next/link";
import { Mail, MapPin, Send, Lock, Info, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitPublicInquiryAction } from "@/app/actions/inquiries";
import { InquiryFormData } from "@/lib/validations/inquiry";
import * as z from "zod";
import { FadeUp, MaskReveal, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const PublicInquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  organization: z.string().optional(),
  inquiryType: z.enum([
    "General Inquiry",
    "Custom Software",
    "Web Application",
    "System Modernization",
    "UI/UX & Product Design",
    "Software Deployment",
    "Product Access",
    "Consultation",
    "Other"
  ]),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type PublicInquiryForm = z.infer<typeof PublicInquirySchema>;

export function ContactView({ primaryEmail, location }: { primaryEmail: string, location: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<PublicInquiryForm>({
    resolver: zodResolver(PublicInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      inquiryType: "General Inquiry",
      description: "",
    }
  });

  const onSubmit = async (data: PublicInquiryForm) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const result = await submitPublicInquiryAction({
        ...data,
        source: "Website Contact Form",
      });
      if (result && !result.success) {
        setError(result.error || "Failed to submit inquiry.");
      } else {
        setIsSuccess(true);
      }
    } catch (e: unknown) {
      console.error(e);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* 1. Header */}
      <section className="w-full bg-background pt-32 pb-16 md:pt-48 md:pb-24 border-b border-border/40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col gap-4 max-w-3xl">
            <FadeUp delay={0.1}>
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block font-semibold mb-2">
                SECURE_INQUIRY_CHANNEL
              </span>
            </FadeUp>
            <MaskReveal delay={0.2}>
              <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[7rem] text-foreground font-serif italic tracking-tighter leading-[1.05] text-balance">
                Start a Project <br className="hidden md:block"/>
                Conversation.
              </h1>
            </MaskReveal>
            <FadeUp delay={0.3}>
              <p className="text-xl md:text-2xl text-muted-foreground font-light leading-snug mt-6 text-balance">
                Available for bespoke web application development, internal institutional software, and legacy systems modernization.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 2. Main Layout Area */}
      <section className="w-full py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* LEFT COLUMN: Contact Details */}
            <StaggerContainer delay={0.2} className="lg:col-span-5 flex flex-col gap-8">
              
              <StaggerItem className="bg-background rounded-2xl p-8 border border-border shadow-sm flex flex-col gap-8 relative overflow-hidden group hover:border-foreground/20 transition-colors duration-500">
                <div className="absolute right-0 top-0 w-48 h-48 bg-foreground/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3 group-hover:bg-foreground/10 transition-colors duration-500"></div>
                <div className="font-mono text-[10px] text-muted-foreground uppercase font-semibold border-b border-border/50 pb-4 tracking-widest relative z-10">Direct Contact</div>
                
                <div className="flex items-start gap-5 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-foreground shrink-0 border border-border/50">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col gap-1 mt-0.5">
                    <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">Email Address</span>
                    <a href={`mailto:${primaryEmail}`} className="text-lg font-serif italic text-foreground hover:text-primary transition-colors">{primaryEmail}</a>
                    <span className="font-mono text-[9px] text-muted-foreground mt-2 uppercase tracking-widest">PGP key available upon request.</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-5 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-foreground shrink-0 border border-border/50">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col gap-1 mt-0.5">
                    <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">Base of Operations</span>
                    <span className="text-lg font-serif italic text-foreground">{location}</span>
                    <span className="font-mono text-[9px] text-muted-foreground mt-2 uppercase tracking-widest">Available for remote engagements globally.</span>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem className="bg-background rounded-2xl p-8 border border-border shadow-sm flex flex-col gap-6 hover:border-foreground/20 transition-colors duration-500">
                <div className="font-mono text-[10px] text-muted-foreground uppercase font-semibold tracking-widest">Specialized Capabilities</div>
                <div className="flex flex-wrap gap-2 font-mono text-[9px]">
                  <Link href="/services" className="px-3 py-1.5 rounded-sm bg-muted/50 text-foreground border border-border/50 hover:bg-border transition-colors uppercase tracking-widest">Custom Web Apps</Link>
                  <Link href="/services" className="px-3 py-1.5 rounded-sm bg-muted/50 text-foreground border border-border/50 hover:bg-border transition-colors uppercase tracking-widest">SIMPEG &amp; Personnel Systems</Link>
                  <Link href="/services" className="px-3 py-1.5 rounded-sm bg-muted/50 text-foreground border border-border/50 hover:bg-border transition-colors uppercase tracking-widest">Legacy Refactoring</Link>
                  <Link href="/services" className="px-3 py-1.5 rounded-sm bg-muted/50 text-foreground border border-border/50 hover:bg-border transition-colors uppercase tracking-widest">Design Systems &amp; Tokens</Link>
                  <Link href="/apps" className="px-3 py-1.5 rounded-sm bg-muted/50 text-foreground border border-border/50 hover:bg-border transition-colors uppercase tracking-widest">Packaged Deployments</Link>
                </div>
              </StaggerItem>
            </StaggerContainer>

            {/* RIGHT COLUMN: The Form */}
            <FadeUp delay={0.4} className="lg:col-span-7 flex flex-col gap-6">
              
              <div className="bg-background rounded-2xl p-8 md:p-12 shadow-sm border border-border flex flex-col gap-10 hover:border-foreground/20 transition-colors duration-500">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-6 border-b border-border/50">
                  <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                    SECURE_INQUIRY_FORM
                  </div>
                </div>

                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                      <CheckCircle2 className="h-10 w-10 text-green-500" />
                    </div>
                    <h3 className="text-4xl font-serif italic text-foreground tracking-tight">Inquiry Received</h3>
                    <p className="text-lg font-light text-muted-foreground max-w-md leading-relaxed">
                      Thank you for reaching out. I've received your inquiry and will review the details. You can expect a response within 24-48 hours.
                    </p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="mt-8 px-8 py-3 rounded-lg bg-muted text-foreground font-mono text-[10px] tracking-widest uppercase hover:opacity-80 transition-opacity"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
                    
                    {error && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm">
                        {error}
                      </div>
                    )}

                    {/* Row 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="flex flex-col gap-3">
                        <label className="font-mono text-[10px] font-semibold text-foreground flex justify-between tracking-widest uppercase">
                          <span>Full Name <span className="text-red-500">*</span></span>
                          <span className="text-muted-foreground">IDENTITY</span>
                        </label>
                        <input 
                          {...register("name")}
                          type="text" 
                          className="h-12 px-4 rounded-lg bg-muted/50 border border-border/50 text-sm text-foreground focus:ring-1 focus:ring-foreground focus:border-foreground outline-none transition-all placeholder:text-muted-foreground/50" 
                          placeholder="e.g. Sarah Jenkins" 
                          disabled={isSubmitting}
                        />
                        {errors.name && <span className="text-red-500 font-mono text-[10px]">{errors.name.message}</span>}
                      </div>
                      <div className="flex flex-col gap-3">
                        <label className="font-mono text-[10px] font-semibold text-foreground flex justify-between tracking-widest uppercase">
                          <span>Email Address <span className="text-red-500">*</span></span>
                          <span className="text-muted-foreground">COMM_CHANNEL</span>
                        </label>
                        <input 
                          {...register("email")}
                          type="email" 
                          className="h-12 px-4 rounded-lg bg-muted/50 border border-border/50 text-sm text-foreground focus:ring-1 focus:ring-foreground focus:border-foreground outline-none transition-all placeholder:text-muted-foreground/50" 
                          placeholder="name@domain.com" 
                          disabled={isSubmitting}
                        />
                        {errors.email && <span className="text-red-500 font-mono text-[10px]">{errors.email.message}</span>}
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="flex flex-col gap-3">
                        <label className="font-mono text-[10px] font-semibold text-foreground flex justify-between tracking-widest uppercase">
                          <span>Organization</span>
                          <span className="text-muted-foreground">OPTIONAL</span>
                        </label>
                        <input 
                          {...register("organization")}
                          type="text" 
                          className="h-12 px-4 rounded-lg bg-muted/50 border border-border/50 text-sm text-foreground focus:ring-1 focus:ring-foreground focus:border-foreground outline-none transition-all placeholder:text-muted-foreground/50" 
                          placeholder="e.g. Acme Corp" 
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <label className="font-mono text-[10px] font-semibold text-foreground flex justify-between tracking-widest uppercase">
                          <span>Inquiry Type <span className="text-red-500">*</span></span>
                          <span className="text-muted-foreground">CATEGORY</span>
                        </label>
                        <select 
                          {...register("inquiryType")}
                          className="h-12 px-4 rounded-lg bg-muted/50 border border-border/50 text-sm text-foreground focus:ring-1 focus:ring-foreground focus:border-foreground outline-none transition-all cursor-pointer appearance-none" 
                          disabled={isSubmitting}
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Custom Software">Custom Software Development</option>
                          <option value="Web Application">Web Application</option>
                          <option value="System Modernization">System Modernization</option>
                          <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                          <option value="Software Deployment">Software Deployment</option>
                          <option value="Consultation">Consultation</option>
                          <option value="Other">Other Inquiry</option>
                        </select>
                        {errors.inquiryType && <span className="text-red-500 font-mono text-[10px]">{errors.inquiryType.message}</span>}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-3">
                      <label className="font-mono text-[10px] font-semibold text-foreground flex justify-between tracking-widest uppercase">
                        <span>Project Description <span className="text-red-500">*</span></span>
                        <span className="text-muted-foreground">PAYLOAD</span>
                      </label>
                      <textarea 
                        {...register("description")}
                        rows={6} 
                        className="p-4 rounded-lg bg-muted/50 border border-border/50 text-sm text-foreground focus:ring-1 focus:ring-foreground focus:border-foreground outline-none transition-all resize-y placeholder:text-muted-foreground/50" 
                        placeholder="Describe the current problem, friction in existing workflows, key requirements, and what success looks like..." 
                        disabled={isSubmitting}
                      ></textarea>
                      {errors.description && <span className="text-red-500 font-mono text-[10px]">{errors.description.message}</span>}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-border/50">
                      <div className="font-mono text-[9px] text-muted-foreground flex items-center gap-2 order-2 sm:order-1 tracking-widest uppercase">
                        <Lock className="h-3 w-3" />
                        <span>Secure End-to-End Encrypted Transmission</span>
                      </div>
                      
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full sm:w-auto h-12 px-8 rounded-lg bg-foreground text-background font-mono text-[10px] uppercase tracking-widest font-semibold flex items-center justify-center gap-3 order-1 sm:order-2 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                      >
                        <span>{isSubmitting ? "Transmitting..." : "Send Message"}</span>
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Privacy Notice */}
              <div className="bg-background rounded-xl p-5 border border-border/50 flex items-start gap-3 shadow-sm hover:border-foreground/20 transition-colors">
                <Lock className="h-4 w-4 text-foreground shrink-0 mt-0.5 opacity-50" />
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground leading-relaxed">
                  Privacy Notice: Information submitted is treated with strict professional discretion. Data is never shared with third-party tracking services or data brokers.
                </p>
              </div>
              
            </FadeUp>
          </div>
        </div>
      </section>
    </div>
  );
}
