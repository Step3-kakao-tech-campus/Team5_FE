import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { getUserInfo } from "../../apis/user";

export default function ProfileTemplate() {
  const { data, isLoading } = useQuery("/user/info", getUserInfo);
  const userInfo = data?.response;
  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading)
    return (
      <div className="flex justify-center h-1/5 items-center">
        <CircularProgress
          color="primary"
          style={{ width: "30px", height: "30px" }}
        />
      </div>
    );

  return (
    <div>
      {/* 유저 정보 영역 */}
      <div className="flex flex-col">
        <span>안녕하세요</span>
        <span>{userInfo.username}님</span>
        <span>{userInfo.email}</span>
      </div>
      {/* 결제 영역 */}
      <div className="flex flex-col">
        <span>서비스</span>
        <button>순수 멤버십</button>
      </div>
      {/* 로그아웃 & 회원탈퇴 */}
      <div className="flex flex-col">
        <span>로그아웃</span>
        <span>회원탈퇴</span>
      </div>
    </div>
  );
}
