import { useEffect } from "react";
import BackButtonHeader from "../components/common/BackButtonHeader";
import PrivacyPolicyData from "../components/common/PrivacyPolicyData";

const PrivacyPolicyPage = () => {
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
        <PrivacyPolicyData />
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
