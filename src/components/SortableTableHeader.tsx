import React from "react";
import { SortField, SortOrder } from "@/lib/utils";

interface SortableTableHeaderProps {
  sortField: string;
  sortOrder: string;
  onSort: (field: SortField) => void;
}

const SortableTableHeader: React.FC<SortableTableHeaderProps> = ({
  sortField,
  sortOrder,
  onSort,
}) => {
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return "↕️"; // Neutral sort icon
    }
    return sortOrder === 'asc' ? "↑" : "↓";
  };

  return (
    <div className="flex flex-col items-start mb-4">
      <div className="w-full bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex">
          <button
            onClick={() => onSort('createdAt')}
            className={`px-4 py-3 text-left font-medium border-r border-slate-200 hover:bg-slate-50 transition-colors w-[140px] ${
              sortField === 'createdAt' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
            }`}
          >
            <span className="flex items-center justify-between">
              Date Created
              <span className="ml-2">{getSortIcon('createdAt')}</span>
            </span>
          </button>
          <button
            onClick={() => onSort('title')}
            className={`px-4 py-3 text-left font-medium border-r border-slate-200 hover:bg-slate-50 transition-colors ${
              sortField === 'title' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
            }`}
            style={{ width: 'calc(100% - 240px)' }}
          >
            <span className="flex items-center justify-between">
              Title
              <span className="ml-2">{getSortIcon('title')}</span>
            </span>
          </button>
          <button
            onClick={() => onSort('status')}
            className={`w-40 px-4 py-3 text-left font-medium hover:bg-slate-50 transition-colors ${
              sortField === 'status' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
            }`}
          >
            <span className="flex items-center justify-between">
              Status
              <span className="ml-2">{getSortIcon('status')}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortableTableHeader; 