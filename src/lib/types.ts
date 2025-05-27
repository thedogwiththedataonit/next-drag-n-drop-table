export interface Email {
  id: string;
  group: string;
  name: string;
  subject: string; // this is the title, [group] title
  summary: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  audience: string;

  openRate: number;
  clickRate: number;
  sentDate: string;
  sentTime: string;
  sent: number;
  isRecommended?: boolean;
  scheduledFor?: string;
  visibility: 'public' | 'private' | 'draft';
  //type: string;
}

export type DataMap = Record<string, Email[]>;

export interface BoardProps {
  initial: DataMap;
  withScrollableColumns?: boolean;
  isCombineEnabled?: boolean;
  useClone?: boolean;
  containerHeight?: string;
  initialSortField?: string;
  initialSortOrder?: string;
}

export interface GroupProps {
  title: string;
  emails: Email[];
  index: number;
  isScrollable?: boolean;
  onEmailClick?: (email: Email) => void;
} 
