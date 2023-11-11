import BackButtonHeader from "../components/common/BackButtonHeader";
import PrivacyPolicyData from "../components/common/PrivacyPolicyData";
import useScrollToTop from "../hooks/useScrollToTop";

const PrivacyPolicyPage = () => {
  useScrollToTop();

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
