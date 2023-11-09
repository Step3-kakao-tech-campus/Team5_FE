import { useEffect } from "react";
import BackButtonHeader from "../components/common/BackButtonHeader";
import TermsData from "../components/common/TermsData";

const TermsPage = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
    });
  }, []);

  return (
    <>
      <BackButtonHeader>
        <span className="text-sm pl-10">이용약관</span>
      </BackButtonHeader>
      <div className="p-[10px]">
        <TermsData />
      </div>
    </>
  );
};

export default TermsPage;
