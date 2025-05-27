import React from "react";
import { SortField, SortOrder, tableColumnWidths } from "@/lib/utils";

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
      <div className="w-full bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden text-sm">
        <div className="flex">
          <button
            onClick={() => onSort('createdAt')}
            className={`px-4 py-3 text-left font-medium border-r border-slate-200 hover:bg-slate-50 transition-colors ${tableColumnWidths().createdAt} ${
              sortField === 'createdAt' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
            }`}
          >
            <span className="flex items-center justify-between">
              Date Created
              <span className="ml-2">{getSortIcon('createdAt')}</span>
            </span>
          </button>
          <button
            onClick={() => onSort('name')}
            className={`px-4 py-3 text-left font-medium border-r border-slate-200 hover:bg-slate-50 transition-colors ${tableColumnWidths().name} ${
              sortField === 'name' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
            }`}
          > 
            <span className="flex items-center justify-between">
              Name
              <span className="ml-2">{getSortIcon('name')}</span>
            </span>
          </button>
          <button
            onClick={() => onSort('audience')}
            className={`px-4 py-3 text-left font-medium border-r border-slate-200 hover:bg-slate-50 transition-colors ${tableColumnWidths().audience} ${
              sortField === 'audience' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
            }`}
          >
            <span className="flex items-center justify-between">
              Audience
              <span className="ml-2">{getSortIcon('audience')}</span>
            </span>
          </button>
           
          <button
            onClick={() => onSort('updatedAt')}
            className={`px-4 py-3 text-left font-medium border-r border-slate-200 hover:bg-slate-50 transition-colors ${tableColumnWidths().updatedAt} ${
              sortField === 'updatedAt' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
            }`}
          >
            <span className="flex items-center justify-between">
              Updated At
              <span className="ml-2">{getSortIcon('updatedAt')}</span>
            </span>
          </button>

          <button
            onClick={() => onSort('sent')}
            className={`px-4 py-3 text-left font-medium border-r border-slate-200 hover:bg-slate-50 transition-colors ${tableColumnWidths().sent} ${
              sortField === 'sent' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
            }`}
          >
            <span className="flex items-center justify-between">
              Sent
              <span className="ml-2">{getSortIcon('sent')}</span>
            </span>
          </button>

          <button
            onClick={() => onSort('openRate')}
            className={`px-4 py-3 text-left font-medium border-r border-slate-200 hover:bg-slate-50 transition-colors ${tableColumnWidths().openRate} ${
              sortField === 'openRate' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
            }`}
          >
            <span className="flex items-center justify-between">
              Open Rate
              <span className="ml-2">{getSortIcon('openRate')}</span>
            </span>
          </button>

          <button
            onClick={() => onSort('clickRate')}
            className={`px-4 py-3 text-left font-medium border-r border-slate-200 hover:bg-slate-50 transition-colors ${tableColumnWidths().clickRate} ${
              sortField === 'clickRate' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
            }`}
          >
            <span className="flex items-center justify-between">
              Click Rate
              <span className="ml-2">{getSortIcon('clickRate')}</span>
            </span>
          </button>

          <button
            onClick={() => onSort('status')}
            className={`px-4 py-3 text-left font-medium border-r border-slate-200 hover:bg-slate-50 transition-colors ${tableColumnWidths().status} ${
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