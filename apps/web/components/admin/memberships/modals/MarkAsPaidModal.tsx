"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
} from "@uwdsc/ui";
import type { MemberProfile } from "@/types/api";

interface MarkAsPaidModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: MemberProfile;
}

function getMemberDisplayName(member: MemberProfile): string {
  const name = [member.first_name, member.last_name].filter(Boolean).join(" ");
  return name || member.email;
}

export function MarkAsPaidModal({
  open,
  onOpenChange,
  member,
}: Readonly<MarkAsPaidModalProps>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mark as paid</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          {getMemberDisplayName(member)}
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
