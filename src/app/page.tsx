import Board from "@/components/Board";
import { sortDataMap, SortField, SortOrder } from "@/lib/utils";
import { defaultBoardData } from "@/lib/mockData";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{
    sortBy?: string
    order?: string
  }>
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const sortField = (params.sortBy as SortField) || "createdAt"
  const sortOrder = (params.order as SortOrder) || "desc"

  // Sort the data server-side on initial load
  const sortedData = sortDataMap(defaultBoardData, sortField, sortOrder)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900">
                Next.js DnD Board
              </h1>
              <Link href="/all">
                <p className="mt-2 text-slate-600">
                  View all emails
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Board */}
      <Board 
        initial={sortedData} 
        withScrollableColumns 
        initialSortField={sortField}
        initialSortOrder={sortOrder}
      />
    </div>
  );
}
