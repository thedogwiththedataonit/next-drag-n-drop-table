import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Email, DataMap } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInSeconds < 60) {
    return diffInSeconds <= 1 ? "just now" : `${diffInSeconds} seconds ago`;
  } else if (diffInMinutes < 60) {
    return diffInMinutes === 1 ? "1 minute ago" : `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
  } else if (diffInDays < 7) {
    return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
  } else if (diffInWeeks < 4) {
    return diffInWeeks === 1 ? "1 week ago" : `${diffInWeeks} weeks ago`;
  } else if (diffInMonths < 12) {
    return diffInMonths === 1 ? "1 month ago" : `${diffInMonths} months ago`;
  } else {
    return diffInYears === 1 ? "1 year ago" : `${diffInYears} years ago`;
  }
}

export type SortField = 'name' | 'status' | 'createdAt' | 'audience' | 'updatedAt' | 'openRate' | 'clickRate' | 'sent'
export type SortOrder = 'asc' | 'desc'

export function sortEmails(emails: Email[], field: SortField, order: SortOrder): Email[] {
  return [...emails].sort((a, b) => {
    let aValue: string | Date | number = a[field]
    let bValue: string | Date | number = b[field]
    
    // Handle date sorting
    if (field === 'createdAt') {
      aValue = new Date(a[field])
      bValue = new Date(b[field])
    }

    // Handle number sorting
    if (field === 'openRate' || field === 'clickRate' || field === 'sent') {
      aValue = parseFloat(a[field].toString())
      bValue = parseFloat(b[field].toString())
    }
    
    let comparison = 0
    if (aValue < bValue) {
      comparison = -1
    } else if (aValue > bValue) {
      comparison = 1
    }
    
    return order === 'desc' ? -comparison : comparison
  })
}

export function tableColumnWidths(): Record<SortField, string> {
  return {
    name: 'w-[140px]',
    status: "w-[140px]",
    createdAt: "w-[140px]",
    audience: "w-[140px]",
    updatedAt: "w-[140px]",
    openRate: "w-[140px]",
    clickRate: "w-[140px]",
    sent: "w-[140px]",
  }
}

export function sortDataMap(dataMap: DataMap, field: SortField, order: SortOrder): DataMap {
  const sortedDataMap: DataMap = {}
  
  for (const [groupKey, emails] of Object.entries(dataMap)) {
    sortedDataMap[groupKey] = sortEmails(emails, field, order)
  }
  
  return sortedDataMap
}
