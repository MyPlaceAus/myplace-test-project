import type { Dispatch, RefCallback, SetStateAction } from 'react';

import { useRef, useState, useEffect, useCallback } from 'react';

// ----------------------------------------------------------------------

/**
 * Custom hook to manage the state of a popover that opens on hover.
 *
 * @param {RefObject<T | null>} [inputRef] - An optional ref object to use for the popover element.
 *
 * @returns {UsePopoverHoverReturn<T>} - An object containing:
 * - `open`: A boolean indicating whether the popover is open.
 * - `onOpen`: A function to open the popover.
 * - `anchorEl`: The current element that the popover is anchored to.
 * - `onClose`: A function to close the popover.
 * - `elementRef`: A ref object for the popover element.
 * - `setOpen`: A function to manually set the open state of the popover.
 *
 * @example
 * const { open, onOpen, onClose, elementRef } = usePopoverHover<HTMLButtonElement>();
 *
 * return (
 *   <>
 *      <button ref={elementRef} onMouseEnter={onOpen} onMouseLeave={onClose}>
 *        Hover me
 *      </button>
 *
 *      <Popover open={open} anchorEl={anchorEl}>
 *        Popover content
 *      </Popover>
 *   </>
 * );
 */

type UsePopoverHoverReturn<T extends HTMLElement = HTMLElement> = {
  open: boolean;
  anchorEl: T | null;
  onOpen: () => void;
  onClose: () => void;
  elementRef: RefCallback<T>;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function usePopoverHover<T extends HTMLElement = HTMLElement>(): UsePopoverHoverReturn<T> {
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [anchorEl, setAnchorEl] = useState<T | null>(null);

  const [open, setOpen] = useState<boolean>(false);

  const elementRef = useCallback<RefCallback<T>>((node) => {
    setAnchorEl(node);
  }, []);

  const onOpen = useCallback(() => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    // Add a small delay before closing to allow cursor to move to popover
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
      closeTimeoutRef.current = null;
    }, 150); // 150ms delay
  }, []);

  // Cleanup timeout on unmount
  useEffect(
    () => () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    },
    []
  );

  return {
    elementRef,
    anchorEl,
    open,
    onOpen,
    onClose,
    setOpen,
  };
}
