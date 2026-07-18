"use client";

import { useState } from "react";
import Link from "next/link";
import { renameList, deleteList } from "@/app/lib/actions";

export default function ListCard({ list }: { list: { id: string; name: string; _count: { items: number } } }) {
  const [isEditing, setIsEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  return (
    <div className="border-2 border-ink rounded-xl p-5 bg-surface flex items-center justify-between gap-4 hover:border-brand transition-colors">      
        {isEditing ? (
        <form action={async (formData) => {
                try {
                    await renameList(formData);
                    setIsEditing(false);
                } catch (error) {
                    console.error("Rename failed:", error);
                    // stays in edit mode so the user can see it didn't save
                }
            }}
            className="flex items-center gap-2 flex-1 justify-between">
          <input type="hidden" name="listId" value={list.id} />
          <input name="name" defaultValue={list.name} autoFocus className="border-2 border-ink rounded-full px-3 py-1 bg-background" />
          <div className="flex items-center gap-3">
            <button type="submit" className="bg-teal text-background rounded-full px-3 py-1 text-xs uppercase cursor-pointer">
                Save
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="text-muted text-xs uppercase cursor-pointer">
                Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
            <div className="flex flex-col">
                <Link href={`/lists/${list.id}`} className="font-display text-2xl text-ink hover:text-brand transition-colors">
                    {list.name}
                </Link>
                <span className="text-muted text-sm font-body">
                    {list._count.items} {list._count.items === 1 ? "film" : "films"}
                </span>
            </div>

          <div className="flex items-center gap-3 relative">
            <button onClick={() => setIsEditing(true)} className="text-xs uppercase text-muted hover:text-ink cursor-pointer">
              Edit
            </button>

            {confirmingDelete ? (
              <span className="flex items-center gap-2 text-xs">
                <span className="text-ink">Sure?</span>
                <form action={deleteList} className="inline">
                  <input type="hidden" name="listId" value={list.id} />
                  <button type="submit" className="text-brand font-bold uppercase cursor-pointer">Yes</button>
                </form>
                <button onClick={() => setConfirmingDelete(false)} className="text-muted uppercase cursor-pointer">No</button>
              </span>
            ) : (
              <button onClick={() => setConfirmingDelete(true)} className="text-xs uppercase text-muted hover:text-brand cursor-pointer">
                Delete
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}