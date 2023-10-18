import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../apis/user";
import AlertBox from "../components/common/accounts/AlertBox";
import InputGroup from "../components/common/accounts/InputGroup";
import Box from "../components/common/atoms/Box";
import Button from "../components/common/atoms/Button";
import Container from "../components/common/atoms/Container";
import useInput from "../hooks/useInput";
import { fetchUserInfo, logIn } from "../store/slices/userSlice";
import { validateEmail, validatePassword } from "../utils";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // login api 호출 중인지 아닌지 확인
  const { values, handleChange } = useInput({
    email: "",
    password: "",
  });
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const dispatch = useDispatch();

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
    if (!validateEmail(values.email) || !validatePassword(values.password)) {
      // validation check fail시 api 호출하지 않음
      setErrorMessage("");
      setIsSubmitting(true);
      setTimeout(() => {
        setErrorMessage("이메일 또는 비밀번호를 잘못 입력했습니다. ");
        setIsSubmitting(false);
      }, 500);
      return;
    }
    try {
      setIsSubmitting(true);
      const response = await login({
        email: values.email,
        password: values.password,
      });
      if (response.success) {
        dispatch(logIn());
        dispatch(fetchUserInfo());
        navigate("/");
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setErrorMessage("이메일 또는 비밀번호를 잘못 입력했습니다. ");
      setIsSubmitting(false);
    }
  };

  // 첫 렌더링 시 email input에 focus
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  return (
    <Container className="max-w-none">
      <Box className="relative h-full mx-auto px-[29px] pt-[100px] text-xs justify-center">
        <h1 className="w-full text-center text-xl font-medium">로그인</h1>
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
          {isSubmitting ? (
            <div className=" w-full h-[50px] mt-[30px] bg-zinc-200 rounded-[10px] flex items-center justify-center">
              <CircularProgress color="primary" size={30} />
            </div>
          ) : (
            <Button
              onClick={handleLogin}
              disabled={isSubmitting}
              className={`block w-full h-[50px] mt-[30px] rounded-[10px] font-normal text-sm ${
                isSubmitting ? "bg-zinc-300" : "bg-[#A7CFFF]"
              }`}
            >
              로그인
            </Button>
          )}

          <div className="flex items-center justify-center pt-5 tracking-tight gap-2">
            <span>아직 계정이 없으신가요?</span>
            <Link className=" underline font-bold" to="/signup">
              회원가입
            </Link>
          </div>
        </form>
      </Box>
    </Container>
  );
}
