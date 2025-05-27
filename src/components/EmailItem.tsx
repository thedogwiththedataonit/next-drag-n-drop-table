import React from "react";
import { DraggableProvided } from "react-beautiful-dnd";
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
}

const getBackgroundColor = (isDragging: boolean, isGroupedOver: boolean) => {
  if (isGroupedOver) {
    return { backgroundColor: "#f1f5f9" }; // slate-100
  }
  return { backgroundColor: "#ffffff" };
};

const getBorderColor = (isDragging: boolean) =>
  isDragging ? { borderColor: "#059669" } : { borderColor: "transparent" };

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
}) => {
  const backgroundStyle = getBackgroundColor(isDragging, isGroupedOver);
  const borderStyle = getBorderColor(isDragging);

  return (
    <tr
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        ...getStyle(provided, style),
        ...backgroundStyle,
        ...borderStyle,
        
      }}
      className={`
        border-2
        flex flex-row justify-between items-center
        ${isDragging ? "shadow-lg shadow-slate-300" : "shadow-none"}
        ${isDragging ? "" : ""}
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
            {email.title}
          </div>
        </div>
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