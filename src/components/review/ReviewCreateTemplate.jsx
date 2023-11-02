/* eslint-disable no-unused-vars */
import { Rating } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import AutoHeightTextarea from "../common/atoms/AutoHeightTextarea";
import Button from "../common/atoms/Button";
import PortfolioImage from "../createportfolio/PortfolioImage";

export default function ReviewCreateTemplate() {
  const { chatId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const partnerName = searchParams.get("partnerName");
  const [imageItems, setImageItems] = useState([]);
  const [stars, setStars] = useState(2.5);
  const heightRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // url 접근 차단
    if (partnerName === null) {
      navigate("/404");
    }
  }, []);

  useEffect(() => {
    const height = heightRef?.current?.offsetHeight;
    if (height < window.innerHeight - 100) {
      heightRef.current.style.height = "calc(100vh - 100px)";
    } else {
      heightRef.current.style.height = "auto";
    }
  }, [imageItems]);

  return (
    <div className="w-full flex flex-col p-7 gap-[5px] " ref={heightRef}>
      <div className="w-full flex flex-col items-center justify-center h-[170px] ">
        <span className="text-2xl font-medium">{`${partnerName} 플래너님은 어땠나요?`}</span>
        <Rating
          value={stars}
          defaultValue={stars}
          precision={0.5}
          getLabelText={(value) => `${stars} Star${stars !== 1 ? "s" : ""}`}
          onChange={(event, newValue) => {
            setStars(newValue);
          }}
          size="large"
          sx={{
            fontSize: "50px",
          }}
        />
      </div>
      <AutoHeightTextarea
        label="내용을 작성해주세요."
        id="content"
        name="content"
        ref={contentRef}
        rows={7}
      />
      <PortfolioImage imageItems={imageItems} setImageItems={setImageItems} />
      <div className="grow flex flex-col justify-end pt-[10px]">
        <Button
          onClick={() => console.log(contentRef.current.value)}
          className="block w-full h-[50px] rounded-[10px] font-normal text-sm bg-lightskyblue-sunsu"
        >
          등록하기
        </Button>
      </div>
    </div>
  );
}
