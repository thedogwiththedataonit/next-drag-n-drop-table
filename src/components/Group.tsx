import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { GroupProps } from "@/lib/types";
import EmailList from "./EmailList";

const Group: React.FC<GroupProps> = ({
  title,
  emails,
  index,
  isScrollable = false,
  onEmailClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="flex flex-col w-full h-full mb-2"
        >
          {/* Column Header */}
          <div
            onClick={handleToggle}
            {...provided.dragHandleProps}
            className={`
              flex items-center justify-center
              rounded-sm px-6 py-4
              transition-colors duration-200 ease-in-out
              cursor-grab active:cursor-grabbing
              ${
                snapshot.isDragging
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-slate-300 text-slate-700 hover:bg-emerald-100 hover:text-emerald-800"
              }
            `}
            aria-label={`${title} quote list`}
          >
            <h2 className="font-semibold text-lg select-none">{title}</h2>
          </div>

          {/* Table Container */}
          <div 
            className={`
              w-full overflow-hidden rounded-b-lg
              ${snapshot.isDragging ? "bg-emerald-50" : "bg-white"}
              shadow-md 
              transition-all duration-300 ease-in-out
              ${
                isExpanded 
                  ? "opacity-100 max-h-[800px]" 
                  : "opacity-0 max-h-0 shadow-none"
              }
            `}
          >
            <div className={`transition-opacity duration-300 ease-in-out ${isExpanded ? "opacity-100" : "opacity-0"}`}>
              <EmailList
                listId={title}
                listType="EMAIL"
                emails={emails}
                internalScroll={isScrollable}
                isCombineEnabled={false}
                useClone={false}
                onEmailClick={onEmailClick}
                style={{
                  backgroundColor: snapshot.isDragging ? "#f0fdf4" : undefined, // green-50
                }}
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Group; 