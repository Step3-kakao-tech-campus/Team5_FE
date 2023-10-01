import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import ChatListPage from "./pages/ChatListPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import OnlyOutletLayout from "./layouts/OnlyOutletLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/chatlist" element={<ChatListPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route element={<OnlyOutletLayout />}>
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
