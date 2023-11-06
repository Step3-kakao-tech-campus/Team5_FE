// /user/signup
export const signupResponse = {
  success: true,
  response: {
    userId: 999,
  },
  error: null,
};

// /user/login
// SuccessResponse

// /user
// SuccessResponse

// /user/info
export const infoResponseHJ = {
  success: true,
  response: {
    userId: 1,
    username: "유희정",
    email: "hj1@naver.com",
    role: "planner",
    grade: "premium",
    payedAt: "2023년 09월 15일",
  },
  error: null,
};

export const infoResponseAR = {
  success: true,
  response: {
    userId: 2,
    username: "김아름",
    email: "ar2@naver.com",
    role: "planner",
    grade: "normal",
    payedAt: null,
  },
  error: null,
};

export const infoResponseHN = {
  success: true,
  response: {
    userId: 1001,
    username: "김하나",
    email: "hn1001@naver.com",
    role: "couple",
    grade: "premium",
    payedAt: "2023년 09월 15일",
  },
  error: null,
};

export const infoResponseDH = {
  success: true,
  response: {
    userId: 1002,
    username: "백도희",
    email: "dh1002@naver.com",
    role: "couple",
    grade: "normal",
    payedAt: null,
  },
  error: null,
};
