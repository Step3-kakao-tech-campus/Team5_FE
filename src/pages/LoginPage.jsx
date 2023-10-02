import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "../components/signup/atoms/Box";
import Button from "../components/signup/atoms/Button";
import Container from "../components/signup/atoms/Container";
import AlertBox from "../components/signup/molecules/AlertBox";
import InputGroup from "../components/signup/molecules/InputGroup";
import useInput from "../hooks/useInput";

export default function LoginPage() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState("");
  const { values, handleChange } = useInput({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {};

  return (
    <Container className="max-w-none">
      <Box className="relative h-full mx-auto px-[29px] pt-[45px] text-xs justify-center">
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
          className="block w-full h-[50px] mt-[30px] rounded-[10px] font-normal text-sm bg-lightskyblue-sunsu"
        >
          로그인
        </Button>
        <div className="flex items-center justify-center pt-5 tracking-tight gap-2">
          <span>아직 계정이 없으신가요?</span>
          <button
            className=" underline font-bold"
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
          >
            회원가입
          </button>
        </div>
      </Box>
    </Container>
  );
}
