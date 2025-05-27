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
    <div className="min-h-screen bg-background p-6">
      

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
