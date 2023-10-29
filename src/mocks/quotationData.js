export const quotationList = {
  success: true,
  response: {
    status: "완료", // 미완료
    totalPrice: 4850000,
    confirmedPrice: 1950000,
    quotations: [
      {
        id: 1,
        title: "스튜디오",
        price: 1950000,
        company: "릴스튜디오",
        description: "원데이 촬영 | 원본 구매 및 보장",
        status: "완료",
        modifiedAt: "2023.09.14",
      },
      {
        id: 2,
        title: "드레스",
        price: 1900000,
        company: "르셀린",
        description: "촬영+본식 | 드레스 4벌",
        status: "미완료",
        modifiedAt: "2023.09.15",
      },
      {
        id: 3,
        title: "헤어/메이크업",
        price: 1000000,
        company: "에브뉴청담",
        description: "촬영+본식 | 헤어메이크업 원장",
        status: "미완료",
        modifiedAt: "2023.09.15",
      },
    ],
  },
  error: null,
};
