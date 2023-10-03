import React from "react";
import Button from "../signup/atoms/Button";
import Modal from "../common/Modal";

export default function PaymentModal({ handler }) {
  return (
    <Modal handler={handler}>
      <div>
        <div className="flex flex-col tracking-tight font-bold text-lg">
          <span>한 번만 결제하면</span>
          <span>모든 웨딩플래너의 매칭 내역 열람 가능</span>
        </div>
        <div>
          <span className="text-xs text-zinc-500">
            단, 예비 신랑신부 회원은 결혼 과정이 끝나는 시점에 멤버십이 자동
            해지됩니다.
          </span>
        </div>
        <div className="py-5 text-xl">
          <span className="font-bold">6,900원</span>
          <span>에 순수 멤버십을 이용해보세요.</span>
        </div>
        <Button className="block w-full h-[50px] mt-[10px] rounded-[10px] font-normal text-sm bg-lightskyblue-sunsu">
          결제하기
        </Button>
      </div>
    </Modal>
  );
}
