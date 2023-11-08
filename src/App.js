import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import RequiredAuthLayout from "./layouts/RequiredAuthLayout";
import RootLayout from "./layouts/RootLayout";
import ChatListPage from "./pages/ChatListPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import CreatePortfolioPage from "./pages/CreatePortfolioPage";
import FavoriteListPage from "./pages/FavoriteListPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import PaymentCompletePage from "./pages/PaymentCompletePage";
import PaymentFailPage from "./pages/PaymentFailPage";
import PortfolioDetailPage from "./pages/PortfolioDetailPage";
import PortfolioReviewPage from "./pages/PortfolioReviewPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ProfilePage from "./pages/ProfilePage";
import QuotationCollectPage from "./pages/QuotationCollectPage";
import QuotationCreatePage from "./pages/QuotationCreatePage";
import QuotationListPage from "./pages/QuotationListPage";
import QuotationUpdatePage from "./pages/QuotationUpdatePage";
import ReviewCreatePage from "./pages/ReviewCreatePage";
import ReviewListPage from "./pages/ReviewListPage";
import ReviewUpdatePage from "./pages/ReviewUpdatePage";
import SearchPage from "./pages/SearchPage";
import SignupPage from "./pages/SignupPage";
import TermsPage from "./pages/TermsPage";
import WritableReviewListPage from "./pages/WritableReviewListPage";
import DuplicatedCheckLayout from "./layouts/DuplicatedCheckLayout";
import ReviewDetailPage from "./pages/ReviewDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/portfolios/:id" element={<PortfolioDetailPage />} />
            <Route
              path="/portfolios/reviews/:plannerId"
              element={<PortfolioReviewPage />}
            />
            <Route path="/reviews/:reviewId" element={<ReviewDetailPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route element={<RequiredAuthLayout />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/payments/complete"
              element={<PaymentCompletePage />}
            />
            <Route path="/payments/fail" element={<PaymentFailPage />} />
            <Route path="/chat/list" element={<ChatListPage />} />
            <Route path="/chat/:chatId" element={<ChatRoomPage />} />
            <Route
              path="/profile/create/portfolio"
              element={<CreatePortfolioPage />}
            />
            <Route path="/quotations/:chatId" element={<QuotationListPage />} />
            <Route
              path="/quotations/create/:chatId"
              element={<QuotationCreatePage />}
            />
            <Route
              path="/quotations/update/:quotationId"
              element={<QuotationUpdatePage />}
            />
            <Route
              path="/quotations/collect"
              element={<QuotationCollectPage />}
            />
            <Route
              path="/profile/reviews/create/:chatId"
              element={<ReviewCreatePage />}
            />
            <Route
              path="/profile/reviews/update/:reviewId"
              element={<ReviewUpdatePage />}
            />
            <Route
              path="/profile/reviews/writable"
              element={<WritableReviewListPage />}
            />
            <Route
              path="/profile/reviews/collect"
              element={<ReviewListPage />}
            />
            <Route path="/favorites" element={<FavoriteListPage />} />
          </Route>
          <Route element={<DuplicatedCheckLayout />}>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/policy" element={<PrivacyPolicyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
