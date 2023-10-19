import dayjs from "dayjs";

export const comma = (num) => {
  // Truthy, Falsy로만 판별하면 type을 검사하지 못함
  if (num === undefined || num === null) {
    return 0;
  }
  // eslint-disable-next-line no-restricted-globals
  if (typeof num === "number" && isNaN(num)) {
    return 0;
  }
  if (typeof num === "string") {
    // eslint-disable-next-line radix
    num = parseInt(num);
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// timestamp를 받아서 "2021년 10월 10일 일요일" 형식으로 포맷팅하는 함수
export const convertToDate = (timestamp) => {
  const daysOfWeek = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const date = dayjs(timestamp);
  const formattedDate =
    date.format("YYYY년 MM월 DD일 ") + daysOfWeek[date.day()];
  return formattedDate;
};

// 0 또는 양의 정수를 확인하는 함수
export const isNonNegativeInteger = (str) => {
  const pattern = /^(0|[1-9]\d*)$/; // 0 또는 양의 정수를 확인하는 정규 표현식
  return pattern.test(str);
};
