import CircularProgress from "@mui/material/CircularProgress";
import { getDatabase, ref, set } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
import { defaultAvatarUrl } from "../utils/constants";
import Timer from "../components/common/atoms/Timer";
import { sendAuthCode, verifyAuthCode } from "../apis/email";
import BackButtonHeader from "../components/common/BackButtonHeader";

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
  const codeRef = useRef(null);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  const [isSentCode, setIsSentCode] = useState(false);
  const [isPassAuthCode, setIsPassAuthCode] = useState(false);
  const [time, setTime] = useState(60 * 10);

  const { values, handleChange, setValues } = useInput({
    role: "",
    email: "",
    password: "",
    password2: "",
    username: "",
    code: "",
  });

  const handleSendCode = async () => {
    if (!values.email) {
      setErrorMessage("이메일을 입력해주세요.");
      emailInputRef.current.focus();
      return;
    }
    if (!validateEmail(values.email)) {
      setErrorMessage("이메일 형식으로 입력해주세요.");
      emailInputRef.current.focus();
      return;
    }
    setIsSendingCode(true);
    try {
      await sendAuthCode({ email: values.email });
      if (isSentCode) {
        setTime(60 * 10);
      }
    } catch (error) {
      if (error.response.data.error.status === 2002) {
        setErrorMessage("이미 가입된 이메일입니다.");
        emailInputRef.current.focus();
        return;
      }
      setErrorMessage("인증코드 전송에 실패했습니다.");
      return;
    }
    setIsSendingCode(false);
    setIsSentCode(true);
  };

  const handleValidateCode = async () => {
    if (!values.code) {
      setErrorMessage("인증코드를 입력해주세요.");
      codeRef.current.focus();
      return;
    }
    if (!isSentCode) {
      setErrorMessage("인증코드를 전송해주세요.");
      return;
    }
    setIsValidatingCode(true);
    try {
      await verifyAuthCode({ email: values.email, code: values.code });
      setIsPassAuthCode(true);
    } catch (error) {
      console.log(error);
      setErrorMessage("인증코드가 일치하지 않습니다.");
    }
    setIsValidatingCode(false);
  };

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
      return false;
    }
    if (!values.email) {
      setErrorMessage("이메일을 입력해주세요.");
      emailInputRef.current.focus();
      return false;
    }
    if (!validateEmail(values.email)) {
      setErrorMessage("이메일 형식으로 입력해주세요.");
      emailInputRef.current.focus();
      return false;
    }
    if (!isPassAuthCode) {
      setErrorMessage("이메일 인증을 완료해주세요.");
      codeRef.current.focus();
      return false;
    }
    if (!values.password) {
      setErrorMessage("비밀번호를 입력해주세요.");
      passwordInputRef.current.focus();
      return false;
    }
    if (!validatePassword(values.password)) {
      setErrorMessage("비밀번호 형식에 맞게 입력해주세요.");
      passwordInputRef.current.focus();
      return false;
    }
    if (!values.password2) {
      setErrorMessage("비밀번호 확인을 입력해주세요.");
      password2InputRef.current.focus();
      return false;
    }
    if (!agreePolicy) {
      setErrorMessage("개인정보 제3자 제공 동의에 동의해주세요.");
      agreePolicyRef.current.focus();
      return false;
    }
    if (values.password !== values.password2) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      passwordInputRef.current.focus();
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
          avatar: defaultAvatarUrl,
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
    <Container className="h-full max-w-none">
      {isCompletionSheetOpen && (
        <SignupCompletionSheet
          onClose={() => {
            setIsCompletionSheetOpen(false);
          }}
        />
      )}
      <BackButtonHeader>
        <span className="text-sm w-full text-center font-medium">회원가입</span>
      </BackButtonHeader>
      <Box className="relative h-full mx-auto px-[29px] pt-[30px] text-xs justify-center">
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
          <div className="relative">
            <InputGroup
              ref={emailInputRef}
              id="email"
              type="email"
              name="email"
              label="이메일"
              placeholder="이메일"
              value={values.email}
              onChange={handleChange}
              className="relative pt-[15px] w-full"
            />
            <button
              type="button"
              disabled={isSendingCode}
              className="absolute right-[6px] h-[38px] bottom-[6px] w-[100px] border rounded-[10px] bg-blue-sunsu text-white text-xs"
              onClick={handleSendCode}
            >
              {isSentCode ? "재전송" : "인증코드 전송"}
            </button>
          </div>
          <div className="relative">
            <InputGroup
              ref={codeRef}
              id="code"
              type="code"
              name="code"
              label="인증코드"
              placeholder="인증코드"
              value={values.code}
              onChange={handleChange}
              className="relative pt-[15px] w-full"
            />
            <div className="absolute right-[6px] bottom-[6px] flex gap-[6px] items-center">
              {isSentCode &&
                (isPassAuthCode ? (
                  <span className=" text-green-700 font-bold">인증완료</span>
                ) : (
                  <Timer time={time} setTime={setTime} />
                ))}
              <button
                type="button"
                disabled={isValidatingCode}
                onClick={handleValidateCode}
                className=" h-[38px] w-[50px] border rounded-[10px] bg-blue-sunsu text-white text-xs"
              >
                확인
              </button>
            </div>
          </div>
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
                className="w-[14px] h-[14px] mt-[1px] rounded-[4px] border-lightgray-sunsu cursor-pointer accent-blue-sunsu"
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="policy" className="text-xs">
                <Link className="font-bold underline " to="/terms">
                  이용약관
                </Link>
                ,{" "}
                <Link className="font-bold underline " to="/policy">
                  개인정보 처리방침
                </Link>
                에 동의합니다.
              </label>
            </span>
          </div>
          {errorMessage && (
            <AlertBox
              id="errorMessage"
              className="mt-[10px] pl-[20px] py-[15px] text-xs rounded-[10px] border font-bold"
              label={errorMessage}
            />
          )}
          {isSubmitting ? (
            <div className=" w-full h-[50px] mt-[30px] bg-zinc-200 rounded-[10px] flex items-center justify-center mb-[50px]">
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
              className={`block w-full h-[50px] mt-[5px] rounded-[10px] font-normal text-sm ${
                isSubmitting ? "bg-zinc-300" : "bg-lightskyblue-sunsu"
              } mb-[50px]`}
            >
              회원가입
            </Button>
          )}
        </form>
      </Box>
    </Container>
  );
}
