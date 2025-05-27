export interface Email {
  id: string;
  group: string;
  title: string;
  summary: string;
  status: string;
  createdAt: string;
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
