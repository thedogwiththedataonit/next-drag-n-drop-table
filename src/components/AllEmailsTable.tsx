"use client";

import React, { useState, useEffect } from "react";
import { useQueryState } from "nuqs";
import { DataMap, Email } from "@/lib/types";
import { sortDataMap, SortField, SortOrder } from "@/lib/utils";
import { EmailSheet } from "@/components/email-sheet";
import EmailItem from "./EmailItem";
import SortableTableHeader from "./SortableTableHeader";
import { DraggableProvided } from "@hello-pangea/dnd";
import { Button } from "./ui/button";
import Link from "next/link";
import { Sparkles, X } from "lucide-react";
import { ChatboxWrapper } from "./chatbox-wrapper";
interface AllEmailsTableProps {
  initial: DataMap;
  initialSortField?: SortField;
  initialSortOrder?: SortOrder;
}

// Mock DraggableProvided for EmailItem component
const createMockDraggableProvided = (): DraggableProvided => ({
  innerRef: () => { },
  draggableProps: {
    'data-rfd-draggable-context-id': '',
    'data-rfd-draggable-id': '',
    style: undefined,
  },
  dragHandleProps: null,
});

const AllEmailsTable: React.FC<AllEmailsTableProps> = ({
  initial,
  initialSortField = "createdAt",
  initialSortOrder = "desc",
}) => {
  // Email sheet state
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // Use nuqs for URL state management
  const [sortField, setSortField] = useQueryState('sortBy', {
    defaultValue: initialSortField,
    shallow: false
  });
  const [sortOrder, setSortOrder] = useQueryState('order', {
    defaultValue: initialSortOrder,
    shallow: false
  });

  // Flatten grouped data and apply sorting
  const [allEmails, setAllEmails] = useState<Email[]>([]);

  useEffect(() => {
    // Sort the grouped data first
    const sortedData = sortDataMap(initial, sortField as SortField, sortOrder as SortOrder);

    // Flatten all emails from all groups
    const flattened: Email[] = [];
    Object.values(sortedData).forEach(groupEmails => {
      flattened.push(...groupEmails);
    });

    setAllEmails(flattened);
  }, [sortField, sortOrder, initial]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle order if same field
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field with default desc order
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    setIsSheetOpen(true);
  };

  const handleSheetClose = () => {
    setIsSheetOpen(false);
    setSelectedEmail(null);
  };

  const mockDraggableProvided = createMockDraggableProvided();

  return (
    <>
      <div className="flex justify-end mb-2 gap-2">
        <Link href="/">
          <Button variant="outline" size="sm">
            Grouped Table
          </Button>
        </Link>
      </div>

      <ChatboxWrapper>
        <SortableTableHeader
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
        />

        {/* All Emails Table */}
        <div className="w-full bg-background shadow-md overflow-hidden">
          <table className="w-full border-collapse table-fixed">
            <tbody className="min-h-full">
              {allEmails.map((email, index) => (
                <EmailItem
                  key={email.id}
                  email={email}
                  isDragging={false}
                  isGroupedOver={false}
                  provided={mockDraggableProvided}
                  index={index}
                  onEmailClick={handleEmailClick}
                />
              ))}
            </tbody>
          </table>
        </div>
      </ChatboxWrapper>


      {/* Email Sheet */}
      <EmailSheet
        email={selectedEmail}
        isOpen={isSheetOpen}
        onClose={handleSheetClose}
      />
    </>
  );
};

export default AllEmailsTable; 