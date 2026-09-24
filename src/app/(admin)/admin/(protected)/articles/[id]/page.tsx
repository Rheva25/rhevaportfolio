import { articlesAdminRepository } from "@/lib/repositories/articlesAdmin";
import { ArticleForm } from "../_components/ArticleForm";
import { notFound } from "next/navigation";
import { Article } from "@/lib/validations/article";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  let article: Article | null = null;
  let error = "";

  try {
    const { id } = await params;
    article = await articlesAdminRepository.getArticle(id);
    if (!article) {
      notFound();
    }
  } catch (e: unknown) {
    error = (e as Error).message || "Failed to load article.";
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-red-950/20 border border-red-900/50 rounded-lg max-w-5xl mx-auto">
        <h3 className="text-xl font-semibold text-red-400 mb-2">Error Loading Article</h3>
        <p className="text-red-400/80 max-w-md mx-auto mb-6">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <ArticleForm initialData={article || undefined} />
    </div>
  );
}
