import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Email } from "@/lib/types";
import EmailItem from "./EmailItem";

interface EmailListProps {
  listId: string;
  listType: string;
  emails: Email[];
  title?: string;
  internalScroll?: boolean;
  isCombineEnabled?: boolean;
  useClone?: boolean;
  isDropDisabled?: boolean;
  style?: React.CSSProperties;
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

const InnerQuoteList = React.memo<{ emails: Email[] }>(function InnerQuoteList({ emails }) {
  return (
    <>
      {emails.map((email, index) => (
        <Draggable key={email.id} draggableId={email.id} index={index}>
          {(dragProvided, dragSnapshot) => (
            <EmailItem
              key={email.id}
              email={email}
              isDragging={dragSnapshot.isDragging}
              isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
              provided={dragProvided}
            />
          )}
        </Draggable>
      ))}
    </>
  );
});

interface InnerListProps {
  emails: Email[];
  title?: string;
  dropProvided: any;
}

function InnerList({ emails, title, dropProvided }: InnerListProps) {
  return (
    <table className="w-full border-collapse table-fixed">
      {title && (
        <thead>
          <tr>
            <th 
              colSpan={3} 
              className="text-center p-0 font-normal text-slate-700 bg-slate-200"
            >
              {title}
            </th>
          </tr>
        </thead>
      )}
      <tbody 
        ref={dropProvided.innerRef} 
        className="min-h-full"
        style={{ paddingBottom: '8px' }}
      >
        <InnerQuoteList emails={emails} />
        {dropProvided.placeholder}
      </tbody>
    </table>
  );
}

const EmailList: React.FC<EmailListProps> = ({
  listId,
  listType,
  emails,
  title,
  internalScroll = false,
  isCombineEnabled = false,
  useClone = false,
  isDropDisabled = false,
  style,
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
              <InnerList emails={emails} title={title} dropProvided={dropProvided} />
            </div>
          ) : (
            <InnerList emails={emails} title={title} dropProvided={dropProvided} />
          )}
        </div>
      )}
    </Droppable>
  );
};

export default EmailList; 