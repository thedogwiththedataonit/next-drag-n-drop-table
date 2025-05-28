import React from "react";
import { SortField, tableColumnWidths } from "@/lib/utils";

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
      return null; // Neutral sort icon
    }
    return sortOrder === 'asc' ? "↑" : "↓";
  };

  return (
    <div className="flex flex-col items-start mb-0 border-b border-foreground/20 sticky top-0 left-0 w-full ">
      <div className="w-full bg-background shadow-sm  overflow-hidden text-sm">
        <div className="flex">

          <button
            onClick={() => onSort('name')}
            className={`px-4 py-2 text-left font-medium hover:bg-muted/40 transition-colors flex-1 min-w-[385px] ${
              sortField === 'name' ? 'bg-muted/40' : 'text-foreground'
            }`}
          > 
            <span className="flex items-center justify-between">
              Name
              <span className="ml-2">{getSortIcon('name')}</span>
            </span>
          </button>
          <button
            onClick={() => onSort('audience')}
            style={{ width: tableColumnWidths().audience }}
            className={`px-4 py-2 text-left font-medium hover:bg-muted/40 transition-colors ${
              sortField === 'audience' ? 'bg-muted/40' : 'text-foreground'
            }`}
          >
            <span className="flex items-center justify-between">
              Audience
              <span className="ml-2">{getSortIcon('audience')}</span>
            </span>
          </button>
           
          <button
            onClick={() => onSort('updatedAt')}
            style={{ width: tableColumnWidths().updatedAt }}
            className={`px-4 py-2 text-left font-medium hover:bg-muted/40 transition-colors ${
              sortField === 'updatedAt' ? 'bg-muted/40' : 'text-foreground'
            }`}
          >
            <span className="flex items-center justify-between">
              Updated
              <span className="ml-2">{getSortIcon('updatedAt')}</span>
            </span>
          </button>

          <button
            onClick={() => onSort('sent')}
            style={{ width: tableColumnWidths().sent }}
            className={`px-4 py-2 text-left font-medium hover:bg-muted/40 transition-colors ${
              sortField === 'sent' ? 'bg-muted/40' : 'text-foreground'
            }`}
          >
            <span className="flex items-center justify-between">
              Sent
              <span className="ml-2">{getSortIcon('sent')}</span>
            </span>
          </button>

          <button
            onClick={() => onSort('openRate')}
            style={{ width: tableColumnWidths().openRate }}
            className={`px-4 py-2 text-left font-medium hover:bg-muted/40 transition-colors ${
              sortField === 'openRate' ? 'bg-muted/40' : 'text-foreground'
            }`}
          >
            <span className="flex items-center justify-between">
              Opened
              <span className="ml-2">{getSortIcon('openRate')}</span>
            </span>
          </button>

          <button
            onClick={() => onSort('clickRate')}
            style={{ width: tableColumnWidths().clickRate }}
            className={`px-4 py-2 text-left font-medium hover:bg-muted/40 transition-colors ${
              sortField === 'clickRate' ? 'bg-muted/40' : 'text-foreground'
            }`}
          >
            <span className="flex items-center justify-between">
              Clicked
              <span className="ml-2">{getSortIcon('clickRate')}</span>
            </span>
          </button>

          <button
            onClick={() => onSort('status')}
            style={{ width: tableColumnWidths().status }}
            className={`px-4 py-2 text-left font-medium hover:bg-muted/40 transition-colors ${
              sortField === 'status' ? 'bg-muted/40' : 'text-foreground'
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