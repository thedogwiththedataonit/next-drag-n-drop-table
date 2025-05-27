import React from "react";
import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";
import { Email } from "@/lib/types";
import EmailItem from "./EmailItem";

interface EmailListProps {
  listId: string;
  listType: string;
  emails: Email[];
  internalScroll?: boolean;
  isCombineEnabled?: boolean;
  useClone?: boolean;
  isDropDisabled?: boolean;
  style?: React.CSSProperties;
  onEmailClick?: (email: Email) => void;
}

const getBackgroundColor = (isDraggingOver: boolean, isDraggingFrom: boolean): string => {
  if (isDraggingOver) {
    return '#FFEBE6'; // Light orange when dragging over
  }
  if (isDraggingFrom) {
    return '#E6FCFF'; // Light cyan when dragging from
  }
  return '#EBECF0'; // Default background (equivalent to bg-slate-100)
};

const InnerEmailList = React.memo<{ emails: Email[]; onEmailClick?: (email: Email) => void }>(function InnerEmailList({ emails, onEmailClick }) {
  return (
    <>
      {emails.map((email, index) => (
        <Draggable key={email.id} draggableId={email.id} index={index }>
          {(dragProvided, dragSnapshot) => (
            <EmailItem
              key={email.id}
              email={email}
              isDragging={dragSnapshot.isDragging}
              isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
              provided={dragProvided}
              onEmailClick={onEmailClick}
            />
          )}
        </Draggable>
      ))}
    </>
  );
});

interface InnerListProps {
  emails: Email[];
  dropProvided: DroppableProvided;
  onEmailClick?: (email: Email) => void;
}

function InnerList({ emails, dropProvided, onEmailClick }: InnerListProps) {
  console.log(emails)
  return (
    <table className="w-full border-collapse table-fixed">
      <tbody 
        ref={dropProvided.innerRef} 
        className="min-h-full"
        style={{ paddingBottom: '8px' }}
      >
        <InnerEmailList emails={emails} onEmailClick={onEmailClick} />
        {dropProvided.placeholder}
      </tbody>
    </table>
  );
}

const EmailList: React.FC<EmailListProps> = ({
  listId,
  listType,
  emails,
  internalScroll = false,
  isCombineEnabled = false,
  useClone = false,
  isDropDisabled = false,
  style,
  onEmailClick,
}) => {
  return (
    <Droppable
      droppableId={listId}
      type={listType}
      direction="vertical"
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
      ignoreContainerClipping={true}
      renderClone={
        useClone
          ? (provided, snapshot, descriptor) => (
              <EmailItem
                email={emails[descriptor.source.index]}
                provided={provided}
                isDragging={snapshot.isDragging}
                isClone
              />
            )
          : undefined
      }
    >
      {(dropProvided, dropSnapshot) => (
        <div
          style={{
            ...style,
            backgroundColor: getBackgroundColor(
              dropSnapshot.isDraggingOver, 
              Boolean(dropSnapshot.draggingFromThisWith)
            ),
            opacity: isDropDisabled ? 0.5 : 1,
            transition: 'background-color 0.2s ease, opacity 0.1s ease',
            padding: '0px',
            userSelect: 'none',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
          {...dropProvided.droppableProps}
        >
          {internalScroll ? (
            <div 
              className="overflow-x-hidden overflow-y-auto max-h-full"
            >
              <InnerList emails={emails} dropProvided={dropProvided} onEmailClick={onEmailClick} />
            </div>
          ) : (
            <InnerList emails={emails} dropProvided={dropProvided} onEmailClick={onEmailClick} />
          )}
        </div>
      )}
    </Droppable>
  );
};

export default EmailList; 