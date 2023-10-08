import React, { useRef, useState } from "react";
import useInput from "../hooks/useInput";
import Container from "../components/signup/atoms/Container";
import Box from "../components/signup/atoms/Box";
import InputGroup from "../components/signup/molecules/InputGroup";
import Button from "../components/signup/atoms/Button";
import AlertBox from "../components/signup/molecules/AlertBox";
import { instance } from "../apis";
import Label from "../components/signup/atoms/Label";

export default function SignupPage() {
  const [errorMessage, setErrorMessage] = useState();
  const [activeButton, setActiveButton] = useState(null);
  const [agreePolicy, setAgreePolicy] = useState(false);

  const agreePolicyRef = useRef(null);

  const { values, handleChange } = useInput({
    role: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleButtonClick = (buttonNumber) => {
    if (buttonNumber === 1) {
      values.role = "couple";
    } else if (buttonNumber === 2) {
      values.role = "planner";
    }

    if (activeButton === buttonNumber) {
      // 이미 활성화된 버튼을 클릭하면 해제
      setActiveButton(null);
    } else {
      // 활성화된 버튼 업데이트
      setActiveButton(buttonNumber);
    }
  };

  const handleAgreement = (e) => {
    const { name, checked } = e.target;

    if (name === "policy-agree") {
      setAgreePolicy(checked);
    }
  };

  const handleSubmit = async () => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

    if (!values.role) {
      setErrorMessage("회원 구분을 선택해주세요.");
      return;
    }
    if (!values.username) {
      setErrorMessage("이름을 입력해주세요.");
      return;
    }
    if (!values.email) {
      setErrorMessage("이메일을 입력해주세요.");
      return;
    }
    if (!emailRegex.test(values.email)) {
      setErrorMessage("이메일 형식으로 입력해주세요.");
      return;
    }
    if (!values.password) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }
    if (!passwordRegex.test(values.password)) {
      setErrorMessage("비밀번호 형식에 맞게 입력해주세요.");
      return;
    }
    if (!values.passwordConfirm) {
      setErrorMessage("비밀번호 확인을 입력해주세요.");
      return;
    }
    if (!agreePolicy) {
      setErrorMessage("개인정보 제3자 제공 동의에 동의해주세요.");
      return;
    }
    const data = await instance.post("/user/signup", JSON.stringify(values));
    if (data.data?.success) {
      alert("회원가입이 완료되었습니다.");
      window.location.replace(`/`);
    } else {
      // eslint-disable-next-line no-alert
      setErrorMessage(data?.error?.message);
    }
  };

  return (
    <Container className="max-w-none">
      <Box className="relative h-full mx-auto px-[29px] pt-[45px] text-xs justify-center">
        <div className="pb-[5px]">
          <Label className="text-xs">회원 구분</Label>
        </div>
        <div className="flex gap-[25px]">
          <div className="flex-1">
            <Button
              onClick={() => handleButtonClick(1)}
              className={`${
                activeButton === 1 ? "bg-lightskyblue-sunsu" : "bg-white"
              } w-full h-[50px] rounded-[10px] text-sm text-gray-900 border border-lightgray-sunsu`}
            >
              예비 신랑신부
            </Button>
          </div>
          <div className="flex-1">
            <Button
              onClick={() => handleButtonClick(2)}
              className={`${
                activeButton === 2 ? "bg-lightskyblue-sunsu" : "bg-white"
              } w-full h-[50px] rounded-[10px] text-sm text-gray-900 border border-lightgray-sunsu`}
            >
              웨딩플래너
            </Button>
          </div>
        </div>
        <InputGroup
          id="username"
          type="text"
          name="username"
          label="이름"
          placeholder="이름"
          value={values.username}
          onChange={handleChange}
          className="relative pt-[15px]"
        />
        <InputGroup
          id="email"
          type="email"
          name="email"
          label="이메일"
          placeholder="이메일"
          value={values.email}
          onChange={handleChange}
          className="relative pt-[15px]"
        />
        <InputGroup
          id="password"
          type="password"
          name="password"
          label="비밀번호"
          placeholder="비밀번호"
          value={values.password}
          onChange={handleChange}
          className="relative pt-[15px]"
        />
        <InputGroup
          id="passwordConfirm"
          type="password"
          name="passwordConfirm"
          label="비밀번호 확인"
          placeholder="비밀번호 확인"
          value={values.passwordConfirm}
          onChange={handleChange}
          className="relative pt-[15px]"
        />
        <div className="mt-[30px]">
          <span className="flex gap-[5px]">
            <input
              type="checkbox"
              id="policy"
              name="policy-agree"
              ref={agreePolicyRef}
              checked={agreePolicy}
              onChange={handleAgreement}
              className="w-[14px] h-[14px] mt-[3px] rounded-[4px] border-lightgray-sunsu cursor-pointer accent-blue-sunsu"
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="policy" className="text-xs">
              이용약관, 개인정보 처리방침에 동의합니다.
            </label>
          </span>
        </div>
        {errorMessage && (
          <AlertBox
            id="errorMessage"
            className="mt-[10px] pl-[20px] py-[15px] text-xs rounded-[10px] border"
            label={errorMessage}
          />
        )}
        <Button
          onClick={() => {
            handleSubmit();
          }}
          className="block w-full h-[50px] mt-[10px] rounded-[10px] font-normal text-sm bg-lightskyblue-sunsu"
        >
          회원가입
        </Button>
      </Box>
    </Container>
  );
}
