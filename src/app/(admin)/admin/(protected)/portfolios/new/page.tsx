import { PortfolioForm } from "../_components/PortfolioForm";

export default function NewPortfolioPage() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add External Portfolio</h1>
        <p className="text-muted-foreground mt-2">
          Enter the details and URL of your external portfolio. The thumbnail will be automatically scraped.
        </p>
      </div>
      
      <PortfolioForm />
    </div>
  );
}
