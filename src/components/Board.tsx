"use client";

import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { DropResult } from "@hello-pangea/dnd";
import { useQueryState } from "nuqs";
import { toast } from "sonner";
import { BoardProps } from "@/lib/types";
import { reorder, reorderQuoteMap } from "@/lib/reorder";
import { sortDataMap, SortField, SortOrder } from "@/lib/utils";
import { Email } from "@/lib/types";
import { EmailSheet } from "@/components/email-sheet";
import SortableTableHeader from "./SortableTableHeader";
import Group from "./Group";
import { Button } from "./ui/button";
import Link from "next/link";

const DragDropContext = dynamic(
  () => import('@hello-pangea/dnd').then(mod => {
    return mod.DragDropContext;
  }),
  { ssr: false },
);

const Droppable = dynamic(
  () => import('@hello-pangea/dnd').then(mod => {
    return mod.Droppable;
  }),
  { ssr: false },
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
        const removedGroup = ordered[result.source.index];
        shallow.splice(result.source.index, 1);
        setOrdered(shallow);
        toast.success(`Group "${removedGroup}" combined and removed`);
        return;
      }

      const group = groups[result.source.droppableId];
      const removedEmail = group[result.source.index];
      const withQuoteRemoved = [...group];
      withQuoteRemoved.splice(result.source.index, 1);

      const orderedGroups = {
        ...groups,
        [result.source.droppableId]: withQuoteRemoved,
      };
      setGroups(orderedGroups);
      toast.success(`Email "${removedEmail.name}" combined and removed from "${result.source.droppableId}"`);
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
      const groupName = ordered[source.index];
      const reorderedOrder = reorder(ordered, source.index, destination.index);
      setOrdered(reorderedOrder);

      // Determine direction and show appropriate toast
      const direction = destination.index > source.index ? "down" : "up";
      const positions = destination.index > source.index
        ? `position ${source.index + 1} to ${destination.index + 1}`
        : `position ${source.index + 1} to ${destination.index + 1}`;

      toast.success(`Group "${groupName}" moved ${direction} from ${positions}`);
      return;
    }

    // Reordering quotes within/between columns
    const movedEmail = groups[source.droppableId][source.index];
    const data = reorderQuoteMap({
      quoteMap: groups,
      source,
      destination,
    });

    setGroups(data.quoteMap);

    // Show appropriate toast message based on move type
    if (source.droppableId === destination.droppableId) {
      // Moving within the same list
      const direction = destination.index > source.index ? "down" : "up";
      const positions = destination.index > source.index
        ? `position ${source.index + 1} to ${destination.index + 1}`
        : `position ${source.index + 1} to ${destination.index + 1}`;

      toast.success(`Email "${movedEmail.name}" moved ${direction} within "${source.droppableId}" from ${positions}`);
    } else {
      // Moving between different lists
      toast.success(`Email "${movedEmail.name}" moved from "${source.droppableId}" to "${destination.droppableId}"`);
    }
  };

  const AddGroup = () => {
    //add to the top of the list
    const newGroup = `Group ${ordered.length + 1}`;
    setOrdered([newGroup, ...ordered]);
    setGroups({ ...groups, [newGroup]: [] });
  };

  const deleteGroup = (groupTitle: string) => {
    // Check if group exists
    if (!groups[groupTitle]) {
      toast.error(`Group "${groupTitle}" not found`);
      return;
    }

    // Check if group has emails - warn user
    const emailCount = groups[groupTitle].length;
    if (emailCount > 0) {
      // Show warning that emails will be lost
      if (!window.confirm(`Delete "${groupTitle}"? This will permanently remove ${emailCount} email${emailCount === 1 ? '' : 's'}.`)) {
        return;
      }
    }

    // Remove from ordered array
    const newOrdered = ordered.filter(key => key !== groupTitle);
    setOrdered(newOrdered);

    // Remove from groups object
    const newGroups = { ...groups };
    delete newGroups[groupTitle];
    setGroups(newGroups);

    // Show success toast
    if (emailCount > 0) {
      toast.success(`Group "${groupTitle}" and ${emailCount} email${emailCount === 1 ? '' : 's'} deleted`);
    } else {
      toast.success(`Group "${groupTitle}" deleted successfully`);
    }
  };

  const renameGroup = (oldTitle: string, newTitle: string) => {
    // Check if new title already exists
    if (groups[newTitle]) {
      toast.error(`Group "${newTitle}" already exists`);
      return;
    }

    // Update the ordered array
    const newOrdered = ordered.map(title => title === oldTitle ? newTitle : title);
    setOrdered(newOrdered);

    // Update the groups object
    const newGroups = { ...groups };
    newGroups[newTitle] = newGroups[oldTitle];
    delete newGroups[oldTitle];

    // Update all emails in the group to reflect the new group name
    newGroups[newTitle] = newGroups[newTitle].map(email => ({
      ...email,
      group: newTitle
    }));

    setGroups(newGroups);
  };

  return (
    <>
      <div className="flex justify-end mb-2 gap-2">
        <Link href="/all">
          <Button variant="outline" size="sm">
            All Emails
          </Button>
        </Link>
        <Button variant="outline" size="sm" onClick={() => AddGroup()}>
          Add Group
        </Button>
      </div>
      <div className="min-h-screen w-full border">
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
                    deleteGroup={() => deleteGroup(key)}
                    renameGroup={renameGroup}
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
    </>
  );
};

export default Board; 