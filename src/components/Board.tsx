"use client";

import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, DropResult, resetServerContext } from "react-beautiful-dnd";
import { useQueryState } from "nuqs";
import { BoardProps } from "@/lib/types";
import { reorder, reorderQuoteMap } from "@/lib/reorder";
import { sortDataMap, SortField, SortOrder } from "@/lib/utils";
import Group from "./Group";

resetServerContext();

const Board: React.FC<BoardProps> = ({
  initial,
  withScrollableColumns = false,
  containerHeight,
  initialSortField = "createdAt",
  initialSortOrder = "desc",
}) => {
  const [groups, setGroups] = useState(initial);
  const [ordered, setOrdered] = useState(Object.keys(initial));
  
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

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return "↕️"; // Neutral sort icon
    }
    return sortOrder === 'asc' ? "↑" : "↓";
  };

  return (
    <div className="min-h-screen w-full p-4">
      {/* Sortable Column Headers */}
      <div className="flex flex-col items-start mb-4">
        <div className="w-full bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex">
            <button
              onClick={() => handleSort('createdAt')}
              className={`flex-1 px-4 py-3 text-left font-medium border-r border-slate-200 hover:bg-slate-50 transition-colors ${
                sortField === 'createdAt' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
              }`}
            >
              <span className="flex items-center justify-between">
                Date Created
                <span className="ml-2">{getSortIcon('createdAt')}</span>
              </span>
            </button>
            <button
              onClick={() => handleSort('title')}
              className={`flex-1 px-4 py-3 text-left font-medium border-r border-slate-200 hover:bg-slate-50 transition-colors ${
                sortField === 'title' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
              }`}
            >
              <span className="flex items-center justify-between">
                Title
                <span className="ml-2">{getSortIcon('title')}</span>
              </span>
            </button>
            <button
              onClick={() => handleSort('status')}
              className={`flex-1 px-4 py-3 text-left font-medium hover:bg-slate-50 transition-colors ${
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
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board; 