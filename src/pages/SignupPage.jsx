import CircularProgress from "@mui/material/CircularProgress";
import { getDatabase, ref, set } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import { sendAuthCode, verifyAuthCode } from "../apis/email";
import { signup } from "../apis/user";
import BackButtonHeader from "../components/common/BackButtonHeader";
import CloseButtonPage from "../components/common/CloseButtonPage";
import PrivacyPolicyData from "../components/common/PrivacyPolicyData";
import TermsData from "../components/common/TermsData";
import AlertBox from "../components/common/accounts/AlertBox";
import InputGroup from "../components/common/accounts/InputGroup";
import SignupCompletionSheet from "../components/common/accounts/SignupCompletionSheet";
import Box from "../components/common/atoms/Box";
import Button from "../components/common/atoms/Button";
import Container from "../components/common/atoms/Container";
import Label from "../components/common/atoms/Label";
import Timer from "../components/common/atoms/Timer";
import "../firebase";
import useDefaultErrorHander from "../hooks/useDefaultErrorHandler";
import useInput from "../hooks/useInput";
import useOpenBottomSheet from "../hooks/useOpenBottomSheet";
import { validateEmail, validatePassword } from "../utils";
import { defaultAvatarUrl } from "../utils/constants";

const USER_TYPE = {
  COUPLE: 1,
  PLANNER: 2,
};

// 테스트 완료(찬호)
export default function SignupPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [activeButton, setActiveButton] = useState(USER_TYPE.COUPLE);
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompletionSheetOpen, setIsCompletionSheetOpen] = useState(false); // 회원가입 완료 시 나타나는 bottom sheet
  const [isTermsOpen, setIsTermsOpen] = useState(false); // 이용약관
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false); // 개인정보 처리방침

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
  const { defaultErrorHandler } = useDefaultErrorHander();
  const { openBottomSheetHandler } = useOpenBottomSheet();
  const { values, handleChange, setValues } = useInput({
    role: "couple",
    email: "",
    password: "",
    password2: "",
    username: "",
    code: "",
  });

  // eslint-disable-next-line no-shadow
  const setErrorMessageAndFocus = (message, ref) => {
    setErrorMessage(message);
    ref.current.focus();
  };

  const handleSendCode = async () => {
    if (!values.email) {
      setErrorMessageAndFocus("이메일을 입력해주세요.", emailInputRef);
      return;
    }
    if (!validateEmail(values.email)) {
      setErrorMessageAndFocus("이메일 형식으로 입력해주세요.", emailInputRef);
      return;
    }
    setIsSendingCode(true);
    try {
      await sendAuthCode({ email: values.email });
      if (isSentCode) {
        setTime(60 * 10);
      }
    } catch (error) {
      openBottomSheetHandler({
        bottomSheet: "messageBottomSheet",
        message: "인증코드 생성 과정에서 오류가 발생했습니다.",
      });
    } finally {
      setIsSendingCode(false);
      setIsSentCode(true);
    }
  };

  const handleValidateCode = async () => {
    if (!isSentCode) {
      setErrorMessageAndFocus("인증코드를 전송해주세요.", emailInputRef);
      return;
    }
    if (!values.code) {
      setErrorMessageAndFocus("인증코드를 입력해주세요.", codeRef);
      return;
    }
    if (values.code !== "999999") {
      setErrorMessageAndFocus("인증코드가 일치하지 않습니다.", codeRef);
      return;
    }
    setIsValidatingCode(true);
    try {
      await verifyAuthCode({ email: values.email, code: values.code });
      setIsPassAuthCode(true);
    } catch (error) {
      openBottomSheetHandler({
        bottomSheet: "serverErrorBottomSheet",
      });
    } finally {
      setIsValidatingCode(false);
    }
  };

  const setUserRole = (roleNumber) => {
    setActiveButton(roleNumber);
    if (roleNumber === USER_TYPE.COUPLE) {
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
      setErrorMessageAndFocus("이름을 입력해주세요.", nameInputRef);
      return false;
    }
    if (!values.email) {
      setErrorMessageAndFocus("이메일을 입력해주세요.", emailInputRef);
      return false;
    }
    if (!validateEmail(values.email)) {
      setErrorMessageAndFocus("이메일 형식으로 입력해주세요.", emailInputRef);
      return false;
    }
    if (!isPassAuthCode) {
      setErrorMessageAndFocus("이메일 인증을 완료해주세요.", codeRef);
      return false;
    }
    if (!values.password) {
      setErrorMessageAndFocus("비밀번호를 입력해주세요.", passwordInputRef);
      return false;
    }
    if (!validatePassword(values.password)) {
      setErrorMessageAndFocus(
        "비밀번호 형식에 맞게 입력해주세요.",
        passwordInputRef,
      );
      return false;
    }
    if (!values.password2) {
      setErrorMessageAndFocus(
        "비밀번호 확인을 입력해주세요.",
        password2InputRef,
      );
      return false;
    }
    if (!agreePolicy) {
      setErrorMessageAndFocus("이용약관에 동의해주세요.", agreePolicyRef);
      return false;
    }
    if (values.password !== values.password2) {
      setErrorMessageAndFocus(
        "비밀번호가 일치하지 않습니다.",
        password2InputRef,
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInput()) return;
    try {
      console.log({
        role: values.role,
        email: values.email,
        password: values.password,
        password2: values.password2,
        username: values.username,
      });
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
      const customError = error?.response?.data?.error;
      if (customError) {
        setErrorMessage(error?.response?.data?.error?.message);
        return;
      }
      defaultErrorHandler(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  if (isTermsOpen) {
    return (
      <CloseButtonPage
        onClose={() => {
          setIsTermsOpen(false);
        }}
        headerName="이용약관"
      >
        <TermsData />
      </CloseButtonPage>
    );
  }
  if (isPrivacyPolicyOpen) {
    return (
      <CloseButtonPage
        onClose={() => {
          setIsPrivacyPolicyOpen(false);
        }}
        headerName="개인정보 처리방침"
      >
        <PrivacyPolicyData />
      </CloseButtonPage>
    );
  }

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
                onClick={() => setUserRole(USER_TYPE.COUPLE)}
                className={`${
                  activeButton === USER_TYPE.COUPLE
                    ? "bg-lightskyblue-sunsu"
                    : "bg-white"
                } w-full h-[50px] rounded-[10px] text-sm text-gray-900 border border-lightgray-sunsu`}
              >
                예비 신랑신부
              </button>
            </div>
            <div className="flex-1">
              <button
                type="button"
                onClick={() => setUserRole(USER_TYPE.PLANNER)}
                className={`${
                  activeButton === USER_TYPE.PLANNER
                    ? "bg-lightskyblue-sunsu"
                    : "bg-white"
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
            label={
              activeButton === USER_TYPE.PLANNER ? (
                <>
                  이름 |{" "}
                  <span className="text-gray-sunsu">
                    작성한 이름이 포트폴리오에서 사용됩니다.
                  </span>
                </>
              ) : (
                "이름"
              )
            }
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
              className="absolute right-[6px] h-[38px] bottom-[6px] w-[100px] border rounded-[10px] bg-blue-sunsu text-white text-xs"
              onClick={handleSendCode}
              disabled={isSendingCode}
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
              placeholder="인증코드는 999999입니다."
              value={values.code}
              onChange={handleChange}
              disabled={isValidatingCode}
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
              <label htmlFor="policy" className="text-xs">
                <button
                  type="button"
                  className="font-bold underline"
                  onClick={() => {
                    setIsTermsOpen(true);
                  }}
                >
                  이용약관
                </button>
                ,{" "}
                <button
                  type="button"
                  className="font-bold underline"
                  onClick={() => {
                    setIsPrivacyPolicyOpen(true);
                  }}
                >
                  개인정보 처리방침
                </button>
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
            <div className=" w-full h-[50px] mt-[5px] bg-zinc-200 rounded-[10px] flex items-center justify-center mb-[50px]">
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
