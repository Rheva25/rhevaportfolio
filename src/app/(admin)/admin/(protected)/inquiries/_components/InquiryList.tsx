"use client";

import { Inquiry } from "@/lib/validations/inquiry";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { 
  Search, 
  MoreHorizontal, 
  Trash2, 
  Eye, 
  MessageSquare
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useTransition } from "react";
import { deleteInquiryAction, updateInquiryStatusAction } from "@/app/actions/inquiries";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function InquiryList({ inquiries, error }: { inquiries: Inquiry[]; error?: string }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [processingId, setProcessingId] = useState<string | null>(null);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-red-950/20 border border-red-900/50 rounded-lg">
        <div className="bg-red-900/20 p-4 rounded-full mb-4">
          <MessageSquare className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-xl font-semibold text-red-400 mb-2">Database Connection Failed</h3>
        <p className="text-red-400/80 max-w-md mx-auto mb-6">
          {error}
        </p>
      </div>
    );
  }

  const filtered = inquiries.filter(i => {
    const matchesSearch = 
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.email.toLowerCase().includes(search.toLowerCase()) ||
      i.organization.toLowerCase().includes(search.toLowerCase()) ||
      i.projectName.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus = statusFilter === "All" || i.status === statusFilter;
    const matchesType = typeFilter === "All" || i.inquiryType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry? This action cannot be undone.")) return;
    
    setProcessingId(id);
    try {
      await deleteInquiryAction(id);
      router.refresh();
    } catch (e: unknown) {
      alert((e as Error).message || "Failed to delete inquiry");
    } finally {
      setProcessingId(null);
    }
  };

  const handleStatusChange = async (inquiry: Inquiry, newStatus: Inquiry["status"]) => {
    setProcessingId(inquiry.id);
    startTransition(async () => {
      try {
        await updateInquiryStatusAction(inquiry.id, newStatus);
        router.refresh();
      } catch (e: unknown) {
        alert((e as Error).message || `Failed to change status to ${newStatus}`);
      } finally {
        setProcessingId(null);
      }
    });
  };

  const formatDate = (timestamp: unknown) => {
    if (!timestamp) return "Never";
    
    let date: Date;
    const ts = timestamp as { toDate?: () => Date; _seconds?: number };
    
    if (ts.toDate && typeof ts.toDate === 'function') {
      date = ts.toDate();
    } else if (ts._seconds) {
      date = new Date(ts._seconds * 1000);
    } else {
      date = new Date(timestamp as string | number | Date);
    }
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const statusColors: Record<Inquiry["status"], string> = {
    "New": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "Reviewing": "bg-amber-500/10 text-amber-500 border-amber-500/20",
    "Contacted": "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    "In Discussion": "bg-purple-500/10 text-purple-500 border-purple-500/20",
    "Converted": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    "Closed": "bg-zinc-500/10 text-zinc-500 border-zinc-500/20"
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inquiries</h1>
          <p className="text-muted-foreground mt-1">
            Manage incoming contact requests and business leads.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search inquiries..."
            className="pl-8 bg-zinc-900/50 border-zinc-800 focus-visible:ring-zinc-700 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex w-full sm:w-auto gap-2">
          <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "All")}>
            <SelectTrigger className="w-[140px] bg-zinc-900/50 border-zinc-800">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Reviewing">Reviewing</SelectItem>
              <SelectItem value="Contacted">Contacted</SelectItem>
              <SelectItem value="In Discussion">In Discussion</SelectItem>
              <SelectItem value="Converted">Converted</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={(val) => setTypeFilter(val || "All")}>
            <SelectTrigger className="w-[180px] bg-zinc-900/50 border-zinc-800">
              <SelectValue placeholder="Inquiry Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="General Inquiry">General Inquiry</SelectItem>
              <SelectItem value="Custom Software">Custom Software</SelectItem>
              <SelectItem value="Web Application">Web Application</SelectItem>
              <SelectItem value="System Modernization">System Modernization</SelectItem>
              <SelectItem value="UI/UX & Product Design">UI/UX & Product Design</SelectItem>
              <SelectItem value="Software Deployment">Software Deployment</SelectItem>
              <SelectItem value="Product Access">Product Access</SelectItem>
              <SelectItem value="Consultation">Consultation</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table / Empty State */}
      {inquiries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-900/30 border border-dashed border-zinc-800 rounded-lg">
          <MessageSquare className="h-10 w-10 text-zinc-600 mb-4" />
          <h3 className="text-lg font-medium text-zinc-300 mb-1">No inquiries yet.</h3>
          <p className="text-zinc-500 mb-6 max-w-sm">
            Contact form submissions will appear here once configured.
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-900/30 border border-dashed border-zinc-800 rounded-lg">
          <Search className="h-10 w-10 text-zinc-600 mb-4" />
          <h3 className="text-lg font-medium text-zinc-300 mb-1">No matches found</h3>
          <p className="text-zinc-500 mb-6 max-w-sm">
            No inquiries match your current filters.
          </p>
        </div>
      ) : (
        <div className="rounded-md border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground bg-muted/50 border-b">
                <tr>
                  <th className="h-12 px-4 font-medium">Contact</th>
                  <th className="h-12 px-4 font-medium hidden md:table-cell">Type & Subject</th>
                  <th className="h-12 px-4 font-medium">Status</th>
                  <th className="h-12 px-4 font-medium hidden sm:table-cell">Submitted</th>
                  <th className="h-12 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-muted/50 transition-colors">
                    <td className="p-4 align-middle">
                      <div className="font-medium text-foreground">
                        {inquiry.name}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5 truncate max-w-[200px] sm:max-w-[300px]">
                        {inquiry.email}
                      </div>
                      {inquiry.organization && (
                        <div className="text-xs text-muted-foreground mt-0.5 truncate max-w-[200px] sm:max-w-[300px]">
                          {inquiry.organization}
                        </div>
                      )}
                    </td>
                    <td className="p-4 align-middle hidden md:table-cell">
                      <div className="font-medium text-muted-foreground">
                        {inquiry.inquiryType}
                      </div>
                      {inquiry.projectName && (
                        <div className="text-xs text-muted-foreground mt-0.5 truncate max-w-[250px]">
                          {inquiry.projectName}
                        </div>
                      )}
                    </td>
                    <td className="p-4 align-middle">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusColors[(inquiry.status as keyof typeof statusColors) || "New"]}`}>
                        {inquiry.status}
                      </div>
                    </td>
                    <td className="p-4 align-middle hidden sm:table-cell text-muted-foreground">
                      {formatDate(inquiry.createdAt)}
                    </td>
                    <td className="p-4 align-middle text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "h-8 w-8 p-0" })} disabled={processingId === inquiry.id || isPending}>
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => router.push(`/admin/inquiries/${inquiry.id}`)} className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            View / Edit
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel className="text-xs">Mark as</DropdownMenuLabel>
                          
                          {inquiry.status !== 'New' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(inquiry, 'New')}>
                              New
                            </DropdownMenuItem>
                          )}
                          {inquiry.status !== 'Reviewing' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(inquiry, 'Reviewing')}>
                              Reviewing
                            </DropdownMenuItem>
                          )}
                          {inquiry.status !== 'Contacted' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(inquiry, 'Contacted')}>
                              Contacted
                            </DropdownMenuItem>
                          )}
                          {inquiry.status !== 'In Discussion' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(inquiry, 'In Discussion')}>
                              In Discussion
                            </DropdownMenuItem>
                          )}
                          {inquiry.status !== 'Converted' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(inquiry, 'Converted')}>
                              Converted
                            </DropdownMenuItem>
                          )}
                          {inquiry.status !== 'Closed' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(inquiry, 'Closed')}>
                              Closed
                            </DropdownMenuItem>
                          )}
                          
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(inquiry.id)}
                            className="text-red-600 focus:text-red-600 focus:bg-red-100 dark:focus:bg-red-950"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
