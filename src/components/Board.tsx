"use client";

import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { DropResult } from "react-beautiful-dnd";
import { useQueryState } from "nuqs";
import { BoardProps } from "@/lib/types";
import { reorder, reorderQuoteMap } from "@/lib/reorder";
import { sortDataMap, SortField, SortOrder } from "@/lib/utils";
import { Email } from "@/lib/types";
import { EmailSheet } from "@/components/email-sheet";
import SortableTableHeader from "./SortableTableHeader";
import Group from "./Group";

const DragDropContext = dynamic(
  () => import('react-beautiful-dnd').then(mod => {
    return mod.DragDropContext;
  }),
  {ssr: false},
);

const Droppable = dynamic(
  () => import('react-beautiful-dnd').then(mod => {
    return mod.Droppable;
  }),
  {ssr: false},
);

const Draggable = dynamic(
  () => import('react-beautiful-dnd').then(mod => {
    return mod.Draggable;
  }),
  {ssr: false},
);

const Board: React.FC<BoardProps> = ({
  initial,
  withScrollableColumns = false,
  containerHeight,
  initialSortField = "createdAt",
  initialSortOrder = "desc",
}) => {
  const [groups, setGroups] = useState(initial);
  const [ordered, setOrdered] = useState(Object.keys(initial));
  
  // Email sheet state
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  // Use nuqs for URL state management
  const [sortField, setSortField] = useQueryState('sortBy', { 
    defaultValue: initialSortField,
    shallow: false 
  });
  const [sortOrder, setSortOrder] = useQueryState('order', { 
    defaultValue: initialSortOrder,
    shallow: false 
  });

  // Apply sorting when sort parameters change
  useEffect(() => {
    const sortedData = sortDataMap(initial, sortField as SortField, sortOrder as SortOrder);
    setGroups(sortedData);
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

  const onDragEnd = (result: DropResult) => {
    // Handle combine operations
    if (result.combine) {
      if (result.type === "GROUP") {
        const shallow = [...ordered];
        shallow.splice(result.source.index, 1);
        setOrdered(shallow);
        return;
      }

      const group = groups[result.source.droppableId];
      const withQuoteRemoved = [...group];
      withQuoteRemoved.splice(result.source.index, 1);

      const orderedGroups = {
        ...groups,
        [result.source.droppableId]: withQuoteRemoved,
      };
      setGroups(orderedGroups);
      return;
    }

    // Dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // Did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Reordering columns
    if (result.type === "GROUP") {
      const reorderedOrder = reorder(ordered, source.index, destination.index);
      setOrdered(reorderedOrder);
      return;
    }

    // Reordering quotes within/between columns
    const data = reorderQuoteMap({
      quoteMap: groups,
      source,
      destination,
    });

    setGroups(data.quoteMap);
  };

  return (
    <div className="min-h-screen w-full p-4">
      {/* Sortable Column Headers */}
      <SortableTableHeader
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="board"
          type="GROUP"
          direction="vertical"
          isDropDisabled={false}
          ignoreContainerClipping={Boolean(containerHeight)}
          isCombineEnabled={false}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="min-h-screen min-w-full flex flex-col items-start"
              style={{ height: containerHeight }}
            >
              {ordered.map((key, index) => (
                <Group
                  key={key}
                  index={index}
                  title={key}
                  emails={groups[key]}
                  isScrollable={withScrollableColumns}
                  onEmailClick={handleEmailClick}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Email Sheet */}
      <EmailSheet
        email={selectedEmail}
        isOpen={isSheetOpen}
        onClose={handleSheetClose}
      />
    </div>
  );
};

export default Board; 