"use client"

import React from "react"
import { Email } from "@/lib/types"
import { formatRelativeTime } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"

interface EmailSheetProps {
  email: Email | null
  isOpen: boolean
  onClose: () => void
}

export function EmailSheet({ email, isOpen, onClose }: EmailSheetProps) {
  if (!email) return null

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold text-slate-900">
            Email Details
          </SheetTitle>
          <SheetDescription className="text-slate-600">
            View and review email information
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col gap-6 p-4">
          {/* Title Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Title
            </h3>
            <p className="text-base text-slate-900 leading-relaxed">
              {email.title}
            </p>
          </div>

          {/* Summary Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Summary
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {email.summary}
            </p>
          </div>

          {/* Status Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Status
            </h3>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-800">
              {email.status}
            </div>
          </div>

          {/* Created Date Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Created
            </h3>
            <div className="space-y-1">
              <p className="text-sm text-slate-700">
                {formatRelativeTime(email.createdAt)}
              </p>
              <p className="text-xs text-slate-500">
                {new Date(email.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Group Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Group
            </h3>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {email.group}
            </div>
          </div>

          {/* ID Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              ID
            </h3>
            <p className="text-xs text-slate-500 font-mono bg-slate-50 p-2 rounded border">
              {email.id}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

