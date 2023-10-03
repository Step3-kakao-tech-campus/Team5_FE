import { useEffect } from "react";

export default function useOnClickOutside(modalRef, modalWrapperRef, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking modalRef's element or descendent elements
      if (
        !modalWrapperRef.current.contains(event.target) ||
        !modalRef.current ||
        modalRef.current.contains(event.target)
      )
        return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // Remove event listeners on cleanup
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [modalRef, handler]);
}
