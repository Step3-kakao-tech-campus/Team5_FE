import { useNavigate } from "react-router-dom";
import { isNonNegativeInteger } from "../utils/convert";

export default function useChatRoom() {
  const navigate = useNavigate();

  const checkChatId = (chatId) => {
    if (!isNonNegativeInteger(chatId)) {
      navigate("404", { replace: true });
    }
  };

  return { checkChatId };
}
