import { useEffect, useRef } from "react";

type Options = {
    /** Allow Enter in textareas to insert newline (default: true) */
    allowTextareaNewline?: boolean;
    /** Reverse order with Shift+Enter (default: true) */
    shiftMovesBackward?: boolean;
    /** CSS selector to opt-out specific elements */
    skipSelector?: string;
};

/**
 * Make Enter behave like Tab within a container (e.g., a Form).
 */
export function useEnterAsTab<T extends HTMLElement>(options: Options = {}) {
    const {
        allowTextareaNewline = true,
        shiftMovesBackward = true,
        skipSelector = '[data-skip-enter], [aria-disabled="true"], [disabled]',
    } = options;

    const containerRef = useRef<T | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const isFocusable = (el: Element) => {
            if (!(el instanceof HTMLElement)) return false;
            if (el.matches(skipSelector)) return false;
            if (
                el.tabIndex < 0 &&
                !el.matches(
                    'input,select,textarea,button,[contenteditable="true"]'
                )
            )
                return false;
            if (
                el.hasAttribute("disabled") ||
                el.getAttribute("aria-disabled") === "true"
            )
                return false;
            // Skip hidden elements
            const style = window.getComputedStyle(el);
            if (style.visibility === "hidden" || style.display === "none")
                return false;
            if (!el.offsetParent && style.position !== "fixed") return false;
            return true;
        };

        // Includes common AntD focusable surfaces
        const FOCUSABLE_SELECTOR = [
            // Native
            'input:not([type="hidden"]):not([disabled])',
            "textarea:not([disabled])",
            "select:not([disabled])",
            "button:not([disabled])",
            '[contenteditable="true"]',
            '[tabindex]:not([tabindex="-1"])',
            // AntD wrappers / special cases
            ".ant-input-number input",
            ".ant-picker-input input",
            ".ant-select-selector", // surface of Select
            ".ant-switch", // switch
            ".ant-radio-input",
            ".ant-checkbox-input",
        ].join(",");

        const getFocusable = () =>
            Array.from(
                container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
            ).filter(isFocusable);

        const focusElement = (el: HTMLElement) => {
            // If it's an AntD "wrapper", try to drill to its internal input
            const inner = el.querySelector<HTMLElement>(
                'input,textarea,[contenteditable="true"]'
            );
            (inner ?? el).focus();
            // For Select, focusing the selector is enough; user can keep Enter/Space to open if desired
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== "Enter") return;

            // Ignore when an AntD Select dropdown is open, so Enter selects an option
            const openSelect = (e.target as HTMLElement)?.closest(
                ".ant-select-open"
            );
            if (openSelect) return;

            // Allow Enter to submit buttons/links normally
            if ((e.target as HTMLElement)?.matches('button,a,[role="button"]'))
                return;

            // Allow newline inside textareas unless user is holding Ctrl/Cmd
            if (
                allowTextareaNewline &&
                (e.target as HTMLElement)?.tagName === "TEXTAREA" &&
                !(e.ctrlKey || e.metaKey)
            ) {
                return;
            }

            // Prevent form submit / default Enter behavior
            e.preventDefault();
            e.stopPropagation();

            const focusables = getFocusable();
            if (!focusables.length) return;

            const active = document.activeElement as HTMLElement | null;
            const currentIndex = active
                ? focusables.indexOf(
                      // If the active is inside a wrapper (e.g. input inside .ant-select), map to the wrapper for index calc
                      focusables.find(
                          (f) => f === active || f.contains(active)
                      ) ?? active
                  )
                : -1;

            const backwards = shiftMovesBackward && e.shiftKey;
            const nextIndex = (() => {
                if (currentIndex < 0) return 0;
                if (backwards) return Math.max(0, currentIndex - 1);
                return Math.min(focusables.length - 1, currentIndex + 1);
            })();

            const next = focusables[nextIndex];
            if (next && next !== active) focusElement(next);
        };

        container.addEventListener("keydown", handleKeyDown, true); // capture phase to win over form submit
        return () =>
            container.removeEventListener("keydown", handleKeyDown, true);
    }, [allowTextareaNewline, shiftMovesBackward, skipSelector]);

    return { containerRef };
}
