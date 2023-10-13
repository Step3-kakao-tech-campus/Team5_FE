import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { confirmPayment } from "../apis/payments";

export default function PaymentPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const secretKey = process.env.REACT_APP_TOSS_SECRET_KEY;
  const url = "https://api.tosspayments.com/v1/payments/confirm";
  const basicToken = btoa(`${secretKey}:`); // base64 인코딩
  const amount = searchParams.get("amount");
  const orderId = searchParams.get("orderId");
  const paymentKey = searchParams.get("paymentKey");

  useEffect(() => {
    (async () => {
      try {
        // 인증을 거친 결제 정보의 일치 여부 확인 -> 일치한다면 승인 요청을 보내고, 일치하지 않는다면 failUrl로 이동
        const confirmResponse = await confirmPayment({ orderId, amount });
        if (confirmResponse.response === "fail") {
          navigate(
            `/payments/fail?message=${"의심스러운 행위를 감지하였습니다."}`,
          );
          return;
        }
        const response = await fetch(url, {
          method: "post",
          headers: {
            Authorization: `Basic ${basicToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, orderId, paymentKey }),
        });
        const res = await response.json();

        if (!response.ok) {
          console.log("실패", res);
          navigate(`/payments/fail?message=${res.message}`);
        } else {
          navigate(`/payments/complete?orderId=${res.orderId}`);
        }
      } catch (error) {
        // 네트워크 오류 또는 파싱 오류 등을 처리
        console.error("비동기 작업 중 오류 발생:", error);
      }
    })();
  }, []);

  return (
    <div className=" w-full h-[50px] mt-[30px] flex items-center justify-center">
      <CircularProgress color="primary" size={30} />
    </div>
  );
}
