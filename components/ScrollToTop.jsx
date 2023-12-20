"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTop = () => {
  const path = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  return null;
};

export default ScrollToTop;
