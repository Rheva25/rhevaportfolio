import { articlesAdminRepository } from "@/lib/repositories/articlesAdmin";
import { ArticleList } from "./_components/ArticleList";
import { Article } from "@/lib/validations/article";

// Force dynamic to always fetch the latest articles
export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  let articles: Article[] = [];
  let error = "";

  try {
    articles = await articlesAdminRepository.getArticles();
  } catch (e: unknown) {
    console.error("Failed to fetch articles:", e);
    error = (e as Error).message || "Failed to load articles from the database.";
  }

  return (
    <div className="max-w-7xl mx-auto">
      <ArticleList articles={articles} error={error} />
    </div>
  );
}
