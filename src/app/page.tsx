import Board from "@/components/Board";
import { defaultBoardData } from "@/lib/mockData";

interface PageProps {
  searchParams: Promise<{
    sortBy?: string
    order?: string
  }>
}
export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const sortField = params.sortBy || "name"
  const sortOrder = params.order || "asc"

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900">
                React Beautiful DnD Board
              </h1>
              <p className="mt-2 text-slate-600">
                Drag and drop quotes between columns and reorder columns
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Board */}
      <Board initial={defaultBoardData} withScrollableColumns />
    </div>
  );
}
