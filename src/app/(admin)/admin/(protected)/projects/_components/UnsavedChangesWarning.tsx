"use client";

import { useEffect } from "react";

/**
 * Attaches a beforeunload listener to warn the user about unsaved changes
 * when attempting to close the tab or reload the page.
 */
export function UnsavedChangesWarning({ isDirty }: { isDirty: boolean }) {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  return null;
}
