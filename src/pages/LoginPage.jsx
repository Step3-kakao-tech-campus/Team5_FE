import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../apis/user";
import Box from "../components/signup/atoms/Box";
import Button from "../components/signup/atoms/Button";
import Container from "../components/signup/atoms/Container";
import AlertBox from "../components/signup/molecules/AlertBox";
import InputGroup from "../components/signup/molecules/InputGroup";
import useInput from "../hooks/useInput";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { values, handleChange } = useInput({
    email: "",
    password: "",
  });
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const isValidValue = () => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

    return emailRegex.test(values.email) && passwordRegex.test(values.password);
  };

  const handleLogin = async () => {
    if (!values.email) {
      console.log(values.email);
      setErrorMessage("이메일을 입력해주세요.");
      emailInputRef.current.focus();
      return;
    }
    if (!values.password) {
      setErrorMessage("비밀번호를 입력해주세요.");
      passwordInputRef.current.focus();
      return;
    }
    if (!isValidValue()) {
      // validation check fail시 api 호출하지 않음
      setErrorMessage("이메일 또는 비밀번호를 잘못 입력했습니다. ");
      return;
    }
    try {
      await login({
        email: values.email,
        password: values.password,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      setErrorMessage("이메일 또는 비밀번호를 잘못 입력했습니다. ");
    }
  };

  // 첫 렌더링 시 email input에 focus
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  return (
    <Container className="max-w-none">
      <Box className="relative h-full mx-auto px-[29px] pt-[45px] text-xs justify-center">
        <form>
          <InputGroup
            id="email"
            type="email"
            name="email"
            label="이메일"
            placeholder="이메일"
            value={values.email}
            onChange={handleChange}
            className="relative pt-[15px]"
            ref={emailInputRef}
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
            ref={passwordInputRef}
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
              handleLogin();
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
        </form>
      </Box>
    </Container>
  );
}
