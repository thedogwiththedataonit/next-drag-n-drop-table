import React from "react";
import { DraggableProvided } from "@hello-pangea/dnd";
import { Email } from "@/lib/types";
import { cn, formatRelativeTime, tableColumnWidths } from "@/lib/utils";
import { CirclePause } from "lucide-react";
import { FilePen } from "lucide-react";

interface EmailItemProps {
  email: Email;
  isDragging: boolean;
  isGroupedOver?: boolean;
  provided: DraggableProvided;
  style?: React.CSSProperties;
  isClone?: boolean;
  index?: number;
  onEmailClick?: (email: Email) => void;
  disableDragging?: boolean;
  selectedEmails: string[]; //ids of selected emails
}

function getStyle(provided: DraggableProvided, style?: React.CSSProperties) {
  if (!style) {
    return provided.draggableProps.style;
  }

  return {
    ...provided.draggableProps.style,
    ...style,
  };
}


const EmailItem: React.FC<EmailItemProps> = ({
  email,
  isDragging,
  isGroupedOver = false,
  provided,
  style,
  index,
  onEmailClick,
  disableDragging = false,
  selectedEmails,
}) => {
  console.log(selectedEmails)
  console.log(email.id)
  const handleClick = (e: React.MouseEvent) => {
    // Don't trigger click while dragging
    if (isDragging) return;
    
    // Prevent drag handle from triggering click
    if (e.defaultPrevented) return;
    
    onEmailClick?.(email);
  };

  return (
    <tr
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...(disableDragging ? {} : provided.dragHandleProps)}
      onClick={handleClick}
      style={{
        ...getStyle(provided, style),
        cursor: isDragging ? 'grabbing' :  'pointer',
      }}
      className={`
        text-sm 
        bg-background hover:bg-muted/40 transition-colors cursor-pointer
        ${isGroupedOver ? 'bg-muted/40' : ''}
        flex flex-row justify-start items-center
        border-l-2 hover:border-muted-foreground border-r-0 hover:border-b-border/50 
        ${isDragging ? "rounded-sm shadow-lg border" : "rounded-none shadow-none border-b border-border/50"}
        ${selectedEmails.includes(email.id) ? 'bg-muted/40 border-l-primary' : 'border-l-transparent'}
      `}
      data-is-dragging={isDragging}
      data-testid={email.id}
      data-index={index}
    >
      
      {/* Name Cell */}
      <td 
        className={`px-4 py-2 flex-1`}
      >
        <div className="flex flex-col">
          <div className="leading-relaxed overflow-hidden text-ellipsis whitespace-nowrap max-w-[350px] min-w-[350px]">
            {email.name}
          </div>
        </div>
      </td>

      {/* Audience Cell */}
      <td 
        className={`px-4 py-2 overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground`}
        style={{ width: tableColumnWidths().audience }}
      >
        {
          email.audience
        }
      </td>

      {/* Updated At Cell */}
      <td 
        className={`px-4 py-2 overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground`}
        style={{ width: tableColumnWidths().updatedAt }}
      >
        {
          formatRelativeTime(email.updatedAt)
        }
      </td>

      {/* Sent Cell */}
      <td 
        className={`px-4 py-2 overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground`}
        style={{ width: tableColumnWidths().sent }}
      >
        {
          email.sent
        }
      </td>

      {/* Open Rate Cell */}
      <td 
        className={`px-4 py-2 overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground`}
        style={{ width: tableColumnWidths().openRate }}
      >
        {
          email.openRate
        }
      </td>

      {/* Click Rate Cell */}
      <td 
        className={`px-4 py-2 overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground`}
        style={{ width: tableColumnWidths().clickRate }}
      >
        {
          email.clickRate
        }
      </td>

      {/* Author Cell */}
      <td 
        className={`px-4 py-2 overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground`}
        style={{ width: tableColumnWidths().status }}
      >
        <span className={cn(
            "w-fit px-0 py-0 rounded-full text-sm font-medium flex items-center gap-1",
            email.status === "Active" || email.status === "Scheduled" || email.status === "Published" ? "bg-transparent text-green-700 dark:text-green-600" :
              email.status === "Draft" ? "bg-transparent text-gray-600" :
                  email.status === "Paused" ? "bg-transparent text-red-700" :
                    "bg-transparent text-gray-800"
          )}>
            {email.status === "Active" || email.status === "Scheduled" || email.status === "Published" ? (
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.6)] animate-pulse"></div>
            ) : 
             email.status === "Draft" ? (
              <FilePen className="h-3 w-3" />
            ) : email.status === "Paused" ? (
              <CirclePause className="h-3 w-3" />
            ) : null}
            {email.status === "Sent" ? (
              <span className="text-sm text-green-700 dark:text-green-600">{formatRelativeTime(email.sentTime)}</span>
            ) :
            email.status === "Brew Recommendation" ? (
              <span className="text-sm text-gray-600 flex items-center gap-1"><FilePen className="h-3 w-3" />Draft</span>
            ) :
            email.status}
          </span>
      </td>
    </tr>
  );
};


export default React.memo(EmailItem); 