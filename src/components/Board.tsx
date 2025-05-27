"use client";

import React, { useState } from "react";
import { DragDropContext, Droppable, DropResult, resetServerContext } from "react-beautiful-dnd";
import { BoardProps } from "@/lib/types";
import { reorder, reorderQuoteMap } from "@/lib/reorder";
import Group from "./Group";

resetServerContext();

const Board: React.FC<BoardProps> = ({
  initial,
  withScrollableColumns = false,
  containerHeight,
}) => {
  const [groups, setGroups] = useState(initial);
  const [ordered, setOrdered] = useState(Object.keys(initial));

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
      <div className="flex flex-col items-start">
        Columns headers here
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