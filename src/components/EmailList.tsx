import React from "react";
import { Droppable, Draggable, DroppableProvided } from "@hello-pangea/dnd";
import { Email } from "@/lib/types";
import EmailItem from "./EmailItem";
import { Move, Trash } from "lucide-react";
import { Button } from "./ui/button";
interface EmailListProps {
  listId: string;
  listType: string;
  emails: Email[];
  internalScroll?: boolean;
  isDropDisabled?: boolean;
  style?: React.CSSProperties;
  onEmailClick?: (email: Email) => void;
  deleteGroup: () => void;
  disableDragging?: boolean;
}

const getBackgroundColor = (isDraggingOver: boolean, isDraggingFrom: boolean): string => {
  if (isDraggingOver) {
    return 'bg-muted'; // Light orange when dragging over
  }
  if (isDraggingFrom) {
    return 'bg-muted'; // Light cyan when dragging from
  }
  return 'bg-muted'; // Default background 
};

const InnerEmailList = React.memo<{ emails: Email[]; onEmailClick?: (email: Email) => void; disableDragging?: boolean }>(function InnerEmailList({ emails, onEmailClick, disableDragging = false }) {
  return (
    <>
      {emails.map((email, index) => (
        <Draggable key={email.id} draggableId={email.id} index={index} isDragDisabled={disableDragging}>
          {(dragProvided, dragSnapshot) => (
            <EmailItem
              key={email.id}
              email={email}
              isDragging={dragSnapshot.isDragging}
              isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
              provided={dragProvided}
              onEmailClick={onEmailClick}
              disableDragging={disableDragging}
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
  deleteGroup: () => void;
  disableDragging?: boolean;
}

function InnerList({ emails, dropProvided, onEmailClick, deleteGroup, disableDragging = false }: InnerListProps) {
  console.log(emails)
  if (emails.length === 0) {
    return (
      <div ref={dropProvided.innerRef} className="flex flex-col gap-4 items-center justify-center p-8 text-muted-foreground bg-muted/30">
        <div className="flex items-center justify-center gap-1">
          <Move className="w-4 h-4 mr-2" />
          <p className="text-sm italic">
            Drag emails into this group
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => deleteGroup()}> 
          <Trash className="w-4 h-4 mr-1" />
          Delete Group
        </Button>
      </div>
    );
  }
  return (
    <table className="w-full border-collapse table-fixed">
      <tbody 
        ref={dropProvided.innerRef} 
        className="min-h-full"
        style={{ paddingBottom: '8px' }}
      >
        <InnerEmailList emails={emails} onEmailClick={onEmailClick} disableDragging={disableDragging} />
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
  isDropDisabled = false,
  style,
  onEmailClick,
  deleteGroup,
  disableDragging = false,
}) => {
  return (
    <Droppable
      droppableId={listId}
      type={listType}
      direction="vertical"
      isDropDisabled={isDropDisabled || disableDragging}
      ignoreContainerClipping={true}
      isCombineEnabled={false}
    >
      {(dropProvided, dropSnapshot) => (
        <div
          style={{
            ...style,
            backgroundColor: getBackgroundColor(
              dropSnapshot.isDraggingOver, 
              Boolean(dropSnapshot.draggingFromThisWith)
            ),
            //opacity: isDropDisabled || disableDragging ? 0.5 : 1,
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
              <InnerList emails={emails} dropProvided={dropProvided} onEmailClick={onEmailClick} deleteGroup={deleteGroup} disableDragging={disableDragging} />
            </div>
          ) : (
            <InnerList emails={emails} dropProvided={dropProvided} onEmailClick={onEmailClick} deleteGroup={deleteGroup} disableDragging={disableDragging} />
          )}
        </div>
      )}
    </Droppable>
  );
};

export default EmailList; 