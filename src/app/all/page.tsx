import AllEmailsTable from "@/components/AllEmailsTable";
import { SortField, SortOrder } from "@/lib/utils";
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

  return (
    <div className="min-h-screen bg-background p-6">

      {/* All Emails Table */}
      <AllEmailsTable 
        initial={defaultBoardData} 
        initialSortField={sortField}
        initialSortOrder={sortOrder}
      />
    </div>
  );
}
