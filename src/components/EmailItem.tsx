import React from "react";
import { DraggableProvided } from "@hello-pangea/dnd";
import { Email } from "@/lib/types";
import { formatRelativeTime } from "@/lib/utils";

interface EmailItemProps {
  email: Email;
  isDragging: boolean;
  isGroupedOver?: boolean;
  provided: DraggableProvided;
  style?: React.CSSProperties;
  isClone?: boolean;
  index?: number;
  onEmailClick?: (email: Email) => void;
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

const getBorderColor = (isDragging: boolean) =>
  isDragging ? { borderColor: "#059669" } : { borderColor: "transparent" };

const EmailItem: React.FC<EmailItemProps> = ({
  email,
  isDragging,
  isGroupedOver = false,
  provided,
  style,
  index,
  onEmailClick,
}) => {
  const borderStyle = getBorderColor(isDragging);

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
      {...provided.dragHandleProps}
      onClick={handleClick}
      style={{
        ...getStyle(provided, style),
        ...borderStyle,
        cursor: isDragging ? 'grabbing' : 'pointer',
      }}
      className={`
        bg-white hover:bg-slate-100 transition-colors cursor-pointer
        ${isGroupedOver ? 'bg-slate-100' : ''}
        border-2
        flex flex-row justify-between items-center
        ${isDragging ? "shadow-lg shadow-slate-300" : "shadow-none"}
      `}
      data-is-dragging={isDragging}
      data-testid={email.id}
      data-index={index}
    >
      {/* Avatar Cell */}
      <td 
        className=" p-4 align-top whitespace-nowrap w-[140px]"
      >
        {
          formatRelativeTime(email.createdAt)
        }
      </td>
      
      {/* Content Cell */}
      <td 
        className="p-4  text-slate-900"
        style={{ width: 'calc(100% - 240px)' }}
      >
        <div className="flex flex-col">
          <div className="text-sm leading-relaxed">
            {email.name}
          </div>
        </div>
      </td>

      {/* Audience Cell */}
      <td 
        className="w-40 p-4"
      >
        {
          email.audience
        }
      </td>

      {/* Updated At Cell */}
      <td 
        className="w-40 p-4"
      >
        {
          email.updatedAt
        }
      </td>

      {/* Author Cell */}
      <td 
        className="w-40 p-4"
      >
        {
          email.status
        }
      </td>
    </tr>
  );
};

export default React.memo(EmailItem); 