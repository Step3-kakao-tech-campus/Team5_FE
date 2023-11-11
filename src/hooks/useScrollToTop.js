import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTop } from "../utils/convert";

const UseScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(scrollToTop, [pathname]);

  return null;
};

export default UseScrollToTop;
