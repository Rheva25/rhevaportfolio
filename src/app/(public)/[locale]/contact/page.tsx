"use client";

import Link from "next/link";
import { Mail, MapPin, Send, Lock, Info, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { submitPublicInquiryAction } from "@/app/actions/inquiries";
import { InquiryFormData } from "@/lib/validations/inquiry";

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

export default function ContactPage() {
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
      await submitPublicInquiryAction({
        ...data,
        source: "Website Contact Form",
      });
      setIsSuccess(true);
    } catch (e: unknown) {
      console.error(e);
      setError((e as Error).message || "An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* 1. Header */}
      <section className="w-full bg-background pt-12 pb-16 md:pt-16 md:pb-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-4 max-w-3xl">
            <span className="font-mono text-xs text-primary uppercase tracking-wider block font-semibold mb-2">
              SECURE_INQUIRY_CHANNEL
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-foreground font-semibold tracking-tight leading-tight mb-2">
              Start a Project Conversation.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Available for bespoke web application development, internal institutional software, and legacy systems modernization.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Layout Area */}
      <section className="w-full py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* LEFT COLUMN: Contact Details */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              <div className="bg-background rounded-xl p-6 border border-border shadow-sm flex flex-col gap-6">
                <div className="font-mono text-xs text-foreground uppercase font-semibold border-b border-border pb-3">Direct Contact</div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-primary shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Email Address</span>
                    <a href="mailto:contact@rheva.dev" className="text-foreground font-medium hover:text-primary transition-colors">contact@rheva.dev</a>
                    <span className="font-mono text-[10px] text-muted-foreground mt-1">PGP key available upon request.</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-primary shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Base of Operations</span>
                    <span className="text-foreground font-medium">Jakarta / Bandung, Indonesia (GMT+7)</span>
                    <span className="font-mono text-[10px] text-muted-foreground mt-1">Available for remote engagements globally.</span>
                  </div>
                </div>
                
              </div>

              <div className="bg-background rounded-xl p-6 border border-border shadow-sm flex flex-col gap-4">
                <div className="font-mono text-xs text-foreground uppercase font-semibold">Specialized Capabilities</div>
                <div className="flex flex-wrap gap-2 font-mono text-[10px]">
                  <Link href="/services" className="px-2.5 py-1 rounded bg-muted text-foreground hover:bg-border transition-colors">Custom Web Apps</Link>
                  <Link href="/services" className="px-2.5 py-1 rounded bg-muted text-foreground hover:bg-border transition-colors">SIMPEG &amp; Personnel Systems</Link>
                  <Link href="/services" className="px-2.5 py-1 rounded bg-muted text-foreground hover:bg-border transition-colors">Legacy Refactoring</Link>
                  <Link href="/services" className="px-2.5 py-1 rounded bg-muted text-foreground hover:bg-border transition-colors">Design Systems &amp; Tokens</Link>
                  <Link href="/apps" className="px-2.5 py-1 rounded bg-muted text-foreground hover:bg-border transition-colors">Packaged Deployments</Link>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: The Form */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              <div className="bg-background rounded-xl p-6 md:p-8 shadow-sm border border-border flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-border">
                  <div className="font-mono text-[10px] text-muted-foreground uppercase">
                    SECURE_INQUIRY_FORM
                  </div>
                </div>

                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-2">
                      <CheckCircle2 className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground">Inquiry Received</h3>
                    <p className="text-muted-foreground max-w-md">
                      Thank you for reaching out. I've received your inquiry and will review the details. You can expect a response within 24-48 hours.
                    </p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="mt-6 px-6 py-2 rounded-lg bg-muted text-foreground font-mono text-sm hover:bg-border transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    
                    {error && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm">
                        {error}
                      </div>
                    )}

                    {/* Row 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[11px] font-semibold text-foreground flex justify-between">
                          <span>Full Name <span className="text-red-500">*</span></span>
                          <span className="text-muted-foreground">IDENTITY</span>
                        </label>
                        <input 
                          {...register("name")}
                          type="text" 
                          className="h-10 px-3 rounded-lg bg-muted border-none text-sm text-foreground focus:ring-2 focus:ring-primary outline-none transition-shadow" 
                          placeholder="e.g. Sarah Jenkins" 
                          disabled={isSubmitting}
                        />
                        {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[11px] font-semibold text-foreground flex justify-between">
                          <span>Email Address <span className="text-red-500">*</span></span>
                          <span className="text-muted-foreground">COMM_CHANNEL</span>
                        </label>
                        <input 
                          {...register("email")}
                          type="email" 
                          className="h-10 px-3 rounded-lg bg-muted border-none text-sm text-foreground focus:ring-2 focus:ring-primary outline-none transition-shadow" 
                          placeholder="name@domain.com" 
                          disabled={isSubmitting}
                        />
                        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[11px] font-semibold text-foreground flex justify-between">
                          <span>Organization</span>
                          <span className="text-muted-foreground">OPTIONAL</span>
                        </label>
                        <input 
                          {...register("organization")}
                          type="text" 
                          className="h-10 px-3 rounded-lg bg-muted border-none text-sm text-foreground focus:ring-2 focus:ring-primary outline-none transition-shadow" 
                          placeholder="e.g. Acme Corp" 
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[11px] font-semibold text-foreground flex justify-between">
                          <span>Inquiry Type <span className="text-red-500">*</span></span>
                          <span className="text-muted-foreground">CATEGORY</span>
                        </label>
                        <select 
                          {...register("inquiryType")}
                          className="h-10 px-3 rounded-lg bg-muted border-none text-sm text-foreground focus:ring-2 focus:ring-primary outline-none transition-shadow cursor-pointer appearance-none" 
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
                        {errors.inquiryType && <span className="text-red-500 text-xs">{errors.inquiryType.message}</span>}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[11px] font-semibold text-foreground flex justify-between">
                        <span>Project Description <span className="text-red-500">*</span></span>
                        <span className="text-muted-foreground">PAYLOAD</span>
                      </label>
                      <textarea 
                        {...register("description")}
                        rows={5} 
                        className="p-3 rounded-lg bg-muted border-none text-sm text-foreground focus:ring-2 focus:ring-primary outline-none transition-shadow resize-y" 
                        placeholder="Describe the current problem, friction in existing workflows, key requirements, and what success looks like..." 
                        disabled={isSubmitting}
                      ></textarea>
                      {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
                      <div className="font-mono text-[10px] text-muted-foreground flex items-center gap-1.5 order-2 sm:order-1">
                        <Lock className="h-3 w-3" />
                        <span>Secure End-to-End Encrypted Transmission</span>
                      </div>
                      
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full sm:w-auto h-11 px-6 rounded-lg bg-foreground text-background font-mono text-sm font-semibold flex items-center justify-center gap-2 order-1 sm:order-2 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-foreground/90 transition-colors"
                      >
                        <span>{isSubmitting ? "Transmitting..." : "Send Message"}</span>
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Privacy Notice */}
              <div className="bg-card rounded-xl p-4 border border-border flex items-start gap-3">
                <Lock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <p className="font-mono text-[10px] text-muted-foreground leading-relaxed">
                  Privacy Notice: Information submitted is treated with strict professional discretion. Data is never shared with third-party tracking services or data brokers.
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
