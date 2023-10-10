import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import OnlyOutletLayout from "./layouts/OnlyOutletLayout";
import ChatListPage from "./pages/ChatListPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import PaymentCompletePage from "./pages/PaymentCompletePage";
import PaymentFailPage from "./pages/PaymentFailPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import SignupPage from "./pages/SignupPage";
import PaymentPage from "./pages/PaymentPage";
import PortfolioDetailPage from "./pages/PortfolioDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/chatlist" element={<ChatListPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/payments/complete" element={<PaymentCompletePage />} />
          <Route path="/payments/fail" element={<PaymentFailPage />} />
          <Route path="/portfolios/:id" element={<PortfolioDetailPage />} />
        </Route>
        <Route element={<OnlyOutletLayout />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/payments" element={<PaymentPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
