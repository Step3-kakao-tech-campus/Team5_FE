import CircularProgress from "@mui/material/CircularProgress";
import { getDatabase, ref, set } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import { signup } from "../apis/user";
import AlertBox from "../components/common/accounts/AlertBox";
import InputGroup from "../components/common/accounts/InputGroup";
import SignupCompletionSheet from "../components/common/accounts/SignupCompletionSheet";
import Box from "../components/common/atoms/Box";
import Button from "../components/common/atoms/Button";
import Container from "../components/common/atoms/Container";
import Label from "../components/common/atoms/Label";
import "../firebase";
import useInput from "../hooks/useInput";
import { validateEmail, validatePassword } from "../utils";

export default function SignupPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [activeButton, setActiveButton] = useState(1);
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompletionSheetOpen, setIsCompletionSheetOpen] = useState(false); // 회원가입 완료 시 나타나는 bottom sheet
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const password2InputRef = useRef(null);
  const agreePolicyRef = useRef(null);

  const { values, handleChange, setValues } = useInput({
    role: "",
    email: "",
    password: "",
    password2: "",
    username: "",
  });

  const setUserRole = (roleNumber) => {
    setActiveButton(roleNumber);
    if (roleNumber === 1) {
      setValues({ ...values, role: "couple" });
      return;
    }
    setValues({ ...values, role: "planner" });
  };

  const handleAgreement = () => {
    setAgreePolicy(!agreePolicy);
  };

  const validateInput = () => {
    if (!values.username) {
      setErrorMessage("이름을 입력해주세요.");
      nameInputRef.current.focus();
      setIsSubmitting(false);
      return false;
    }
    if (!values.email) {
      setErrorMessage("이메일을 입력해주세요.");
      emailInputRef.current.focus();
      setIsSubmitting(false);
      return false;
    }
    if (!validateEmail(values.email)) {
      setErrorMessage("이메일 형식으로 입력해주세요.");
      emailInputRef.current.focus();
      setIsSubmitting(false);
      return false;
    }
    if (!values.password) {
      setErrorMessage("비밀번호를 입력해주세요.");
      passwordInputRef.current.focus();
      setIsSubmitting(false);
      return false;
    }
    if (!validatePassword(values.password)) {
      setErrorMessage("비밀번호 형식에 맞게 입력해주세요.");
      passwordInputRef.current.focus();
      setIsSubmitting(false);
      return false;
    }
    if (!values.password2) {
      setErrorMessage("비밀번호 확인을 입력해주세요.");
      password2InputRef.current.focus();
      setIsSubmitting(false);
      return false;
    }
    if (!agreePolicy) {
      setErrorMessage("개인정보 제3자 제공 동의에 동의해주세요.");
      agreePolicyRef.current.focus();
      setIsSubmitting(false);
      return false;
    }
    if (values.password !== values.password2) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      passwordInputRef.current.focus();
      setIsSubmitting(false);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInput()) return;
    try {
      setIsSubmitting(true);
      const res = await signup({
        role: values.role,
        email: values.email,
        password: values.password,
        password2: values.password2,
        username: values.username,
      });
      if (res.success) {
        await set(ref(getDatabase(), `users/${res.response.userId}`), {
          name: values.username,
        });
        setIsCompletionSheetOpen(true);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  return (
    <Container className="max-w-none h-full">
      {isCompletionSheetOpen && (
        <SignupCompletionSheet
          onClose={() => {
            setIsCompletionSheetOpen(false);
          }}
        />
      )}
      <Box className="relative h-full mx-auto px-[29px] pt-[45px] text-xs justify-center">
        <h1 className="w-full text-center text-xl pb-10">회원가입</h1>
        <form>
          <div className="pb-[5px]">
            <Label className="text-xs">회원 구분</Label>
          </div>
          <div className="flex gap-[25px]">
            <div className="flex-1">
              <button
                type="button"
                onClick={() => setUserRole(1)}
                className={`${
                  activeButton === 1 ? "bg-lightskyblue-sunsu" : "bg-white"
                } w-full h-[50px] rounded-[10px] text-sm text-gray-900 border border-lightgray-sunsu`}
              >
                예비 신랑신부
              </button>
            </div>
            <div className="flex-1">
              <button
                type="button"
                onClick={() => setUserRole(2)}
                className={`${
                  activeButton === 2 ? "bg-lightskyblue-sunsu" : "bg-white"
                } w-full h-[50px] rounded-[10px] text-sm text-gray-900 border border-lightgray-sunsu`}
              >
                웨딩플래너
              </button>
            </div>
          </div>
          <InputGroup
            ref={nameInputRef}
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
            ref={emailInputRef}
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
            ref={passwordInputRef}
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
            ref={password2InputRef}
            id="password2"
            type="password"
            name="password2"
            label="비밀번호 확인"
            placeholder="비밀번호 확인"
            value={values.password2}
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
          {isSubmitting ? (
            <div className=" w-full h-[50px] mt-[30px] bg-zinc-200 rounded-[10px] flex items-center justify-center">
              <CircularProgress
                color="primary"
                style={{ width: "30px", height: "30px" }}
              />
            </div>
          ) : (
            <Button
              onClick={() => {
                handleSubmit();
              }}
              disabled={isSubmitting}
              className={`block w-full h-[50px] mt-[30px] rounded-[10px] font-normal text-sm ${
                isSubmitting ? "bg-zinc-300" : "bg-lightskyblue-sunsu"
              }`}
            >
              회원가입
            </Button>
          )}
        </form>
      </Box>
    </Container>
  );
}
