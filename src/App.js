import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import OnlyOutletLayout from "./layouts/OnlyOutletLayout";
import ChatListPage from "./pages/ChatListPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import PaymentCompletePage from "./pages/PaymentCompletePage";
import PaymentFailPage from "./pages/PaymentFailPage";
import PortfolioDetailPage from "./pages/PortfolioDetailPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import RequiredAuthLayout from "./layouts/RequiredAuthLayout";
import CreatePortfolioPage from "./pages/CreatePortfolioPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/portfolios/:id" element={<PortfolioDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route element={<RequiredAuthLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/payments/complete" element={<PaymentCompletePage />} />
          <Route path="/payments/fail" element={<PaymentFailPage />} />
          <Route path="/chat/list" element={<ChatListPage />} />
          <Route path="/chat/:chatId" element={<ChatRoomPage />} />
          <Route
            path="/profile/create/portfolio"
            element={<CreatePortfolioPage />}
          />
        </Route>
        <Route element={<OnlyOutletLayout />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
