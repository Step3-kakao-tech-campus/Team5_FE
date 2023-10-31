import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function usePreventGoBack() {
  const navigate = useNavigate();
  const preventGoBack = () => {
    console.log("click", window.history);
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm("페이지를 나가시겠습니까?\n변경사항이 저장되지 않을 수 있습니다.")
    ) {
      navigate(-1);
    } else {
      window.history.pushState(null, null, window.location.href);
    }
  };

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", preventGoBack);

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);
}
