import * as z from "zod";

export const InquirySchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  organization: z.string().max(100, "Organization name is too long").default(""),
  
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
  
  projectName: z.string().max(100, "Project name is too long").default(""),
  budgetContext: z.string().max(100, "Budget context is too long").default(""),
  timeline: z.string().max(100, "Timeline is too long").default(""),
  
  description: z.string().min(10, "Please provide more details").max(5000, "Description is too long"),
  
  attachment: z.object({
    url: z.string().url(),
    name: z.string(),
    type: z.string(),
    size: z.number()
  }).nullable().default(null),
  
  source: z.string().default("Website"),
  
  status: z.enum([
    "New",
    "Reviewing",
    "Contacted",
    "In Discussion",
    "Converted",
    "Closed"
  ]).default("New"),
  
  internalNotes: z.string().max(5000, "Notes are too long").default(""),
});

export type InquiryFormData = z.infer<typeof InquirySchema>;

export interface Inquiry extends InquiryFormData {
  id: string;
  createdAt: unknown;
  updatedAt: unknown;
}
