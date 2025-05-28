import React, { useState, useMemo } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { GroupProps } from "@/lib/types";
import EmailList from "./EmailList";
import { tableColumnWidths } from "@/lib/utils";

const Group: React.FC<GroupProps & { disableDragging?: boolean, selectedEmails: string[] }> = ({
  title,
  emails,
  index,
  isScrollable = false,
  onEmailClick,
  deleteGroup,
  renameGroup,
  disableDragging = false,
  selectedEmails
}) => {
  console.log(selectedEmails)
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
    <Draggable draggableId={title} index={index} isDragDisabled={disableDragging}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`flex flex-col w-full h-full ${snapshot.isDragging ? "shadow-md rounded-lg" : ""}`}
        >
          {/* Column Header */}
          <div
            onClick={handleToggle}
            {...(disableDragging ? {} : provided.dragHandleProps)}
            className={`
              flex items-center justify-start w-full
              transition-colors duration-200 ease-in-out
              ${disableDragging ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"} text-foreground
              ${isExpanded ? "rounded-t-sm" : "rounded-sm"}
              ${snapshot.isDragging
                ? "bg-muted"
                : "bg-background hover:bg-muted/50"
              }
            `}
            aria-label={`${title} quote list`}
          >
            <div className="flex-1 px-4 py-2">
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onKeyDown={handleTitleInputKeyDown}
                    onBlur={handleTitleSave}
                    className="font-semibold text-sm bg-transparent border-none focus:outline-none focus:ring-0 focus:border-none"
                    autoFocus
                    size={Math.max(editingTitle.length + 2, 8)}
                    style={{ width: `${Math.max(editingTitle.length + 2, 8)}ch` }}
                  />
                ) : (
                  <h2 
                    className="font-semibold text-sm select-none cursor-pointer hover:text-primary transition-colors"
                    onClick={handleTitleClick}
                  >
                    {title}
                  </h2>
                )}
                <ChevronDown
                  className={`h-4 w-4  text-foreground/40 transition-transform duration-200 ease-in-out ${isExpanded ? 'rotate-0' : '-rotate-90'
                    }`}
                />
              </div>
            </div>
            <div className="h-full px-4 py-2" style={{ width: tableColumnWidths().audience }}></div>
            <div className="h-full px-4 py-2" style={{ width: tableColumnWidths().updatedAt }}></div>
            <div className="h-full px-4 py-2" style={{ width: tableColumnWidths().sent }}>
              <span className="text-sm font-medium">
                {groupMetrics.totalSent.toLocaleString()}
              </span>
            </div>
            <div className="h-full px-4 py-2" style={{ width: tableColumnWidths().openRate }}>
              <span className="text-sm font-medium">
                {groupMetrics.avgOpenRate.toFixed(1)}%
              </span>
            </div>
            <div className="h-full px-4 py-2" style={{ width: tableColumnWidths().clickRate }}>
              <span className="text-sm font-medium">
                {groupMetrics.avgClickRate.toFixed(1)}%
              </span>
            </div>
            <div className="h-full px-4 py-2" style={{ width: tableColumnWidths().status }}></div>
          </div>

          {/* Table Container */}
          <div
            className={`
              w-full overflow-hidden
              ${snapshot.isDragging ? "bg-muted rounded-none border-t-0 border rounded-b-sm " : "bg-background"}
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
                disableDragging={disableDragging}
                selectedEmails={selectedEmails}
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