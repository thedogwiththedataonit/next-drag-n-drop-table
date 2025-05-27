import React, { useState, useMemo } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { GroupProps } from "@/lib/types";
import EmailList from "./EmailList";
import { tableColumnWidths } from "@/lib/utils";

const Group: React.FC<GroupProps> = ({
  title,
  emails,
  index,
  isScrollable = false,
  onEmailClick,
  deleteGroup,
  renameGroup
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(title);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the toggle from triggering
    setIsEditing(true);
    setEditingTitle(title);
  };

  const handleTitleSave = () => {
    const trimmedTitle = editingTitle.trim();
    
    if (trimmedTitle === "") {
      setEditingTitle(title); // Revert to original if empty
      setIsEditing(false);
      return;
    }

    if (trimmedTitle !== title && renameGroup) {
      renameGroup(title, trimmedTitle);
      toast.success(`Group renamed from "${title}" to "${trimmedTitle}"`);
    }
    
    setIsEditing(false);
  };

  const handleTitleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTitleSave();
    } else if (e.key === "Escape") {
      setEditingTitle(title); // Revert to original
      setIsEditing(false);
    }
  };

  // Calculate metrics for the group
  const groupMetrics = useMemo(() => {
    if (emails.length === 0) {
      return {
        totalSent: 0,
        avgOpenRate: 0,
        avgClickRate: 0
      };
    }

    const totalSent = emails.reduce((sum, email) => sum + email.sent, 0);
    const avgOpenRate = emails.reduce((sum, email) => sum + email.openRate, 0) / emails.length;
    const avgClickRate = emails.reduce((sum, email) => sum + email.clickRate, 0) / emails.length;

    return {
      totalSent,
      avgOpenRate,
      avgClickRate
    };
  }, [emails]);

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
              flex items-center justify-start w-full
              rounded-sm
              transition-colors duration-200 ease-in-out
              cursor-grab active:cursor-grabbing
              ${snapshot.isDragging
                ? "bg-emerald-100 text-emerald-800"
                : "bg-slate-300 text-slate-700 hover:bg-emerald-100 hover:text-emerald-800"
              }
            `}
            aria-label={`${title} quote list`}
          >
            <div className="flex-1 p-4">
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onKeyDown={handleTitleInputKeyDown}
                    onBlur={handleTitleSave}
                    className="font-semibold text-md bg-transparent border-none focus:outline-none focus:ring-0 focus:border-none"
                    autoFocus
                  />
                ) : (
                  <h2 
                    className="font-semibold text-md select-none cursor-pointer hover:text-emerald-700 transition-colors"
                    onClick={handleTitleClick}
                  >
                    {title}
                  </h2>
                )}
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-200 ease-in-out ${isExpanded ? 'rotate-0' : 'rotate-180'
                    }`}
                />
              </div>
            </div>
            <div className="h-full p-4" style={{ width: tableColumnWidths().audience }}>test</div>
            <div className="h-full p-4" style={{ width: tableColumnWidths().updatedAt }}>test</div>
            <div className="h-full p-4" style={{ width: tableColumnWidths().sent }}>
              <span className="text-sm font-medium">
                {groupMetrics.totalSent.toLocaleString()}
              </span>
            </div>
            <div className="h-full p-4" style={{ width: tableColumnWidths().openRate }}>
              <span className="text-sm font-medium">
                {groupMetrics.avgOpenRate.toFixed(1)}%
              </span>
            </div>
            <div className="h-full p-4" style={{ width: tableColumnWidths().clickRate }}>
              <span className="text-sm font-medium">
                {groupMetrics.avgClickRate.toFixed(1)}%
              </span>
            </div>
            <div className="h-full p-4" style={{ width: tableColumnWidths().status }}>test</div>
          </div>

          {/* Table Container */}
          <div
            className={`
              w-full overflow-hidden rounded-b-lg
              ${snapshot.isDragging ? "bg-emerald-50" : "bg-white"}
              shadow-md 
              transition-all duration-300 ease-in-out
              ${isExpanded
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
                onEmailClick={onEmailClick}
                deleteGroup={deleteGroup}
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