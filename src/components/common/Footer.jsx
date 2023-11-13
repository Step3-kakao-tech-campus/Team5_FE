import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="px-5 pt-5 pb-[100px] bg-[#f4f4f5] border-t border-lightgray-sunsu text-sm text-darkgray-sunsu">
      <div className="font-semibold">순수웨딩</div>
      <div className="mb-5">
        투명한 가격으로 웨딩플래너와 예비 부부를 매칭하다.
      </div>
      <div>©Sunsu Wedding Corp.</div>
      <div>
        <Link className="font-bold mr-3" to="/terms">
          이용약관
        </Link>
        <Link className="font-bold" to="/policy">
          개인정보 처리방침
        </Link>
      </div>
    </div>
  );
};

export default Footer;
