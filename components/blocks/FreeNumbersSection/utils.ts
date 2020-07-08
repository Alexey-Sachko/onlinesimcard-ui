import axios from "axios";

const HOST = "https://onlinesim.ru/api";

type GetPhoneList = {
  selectedCountry: number;
};

export const getPhoneList = async ({ selectedCountry }: GetPhoneList) => {
  const numbersData = await axios.get(`${HOST}/getFreePhoneList`, {
    params: {
      country: selectedCountry,
      lang: "ru",
    },
  });
  return numbersData;
};

type GetMessagesList = {
  selectedNumber: number | string;
  page: number;
};

export const getMessagesList = async ({
  selectedNumber,
  page,
}: GetMessagesList) => {
  const messagesData = await axios.get(`${HOST}/getFreeMessageList`, {
    params: {
      page: page,
      phone: selectedNumber,
      lang: "ru",
    },
  });

  return messagesData?.data;
};
