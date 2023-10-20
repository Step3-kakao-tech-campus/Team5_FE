import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as ChatOutlinedIcon } from "../../assets/chat-01.svg";
import { ReactComponent as ChatIcon } from "../../assets/chat-02.svg";
import { ReactComponent as HomeOutlinedIcon } from "../../assets/home-01.svg";
import { ReactComponent as HomeIcon } from "../../assets/home-02.svg";
import { ReactComponent as ProfileOutlinedIcon } from "../../assets/profile-01.svg";
import { ReactComponent as ProfileIcon } from "../../assets/profile-02.svg";
import { ReactComponent as SearchOutlinedIcon } from "../../assets/search-01.svg";
import { ReactComponent as SearchIcon } from "../../assets/search-02.svg";
import { closeBottomSheet } from "../../store/slices/bottomSheetSlice";
import { openLoginBottomSheet } from "../../utils/handleBottomSheet";

export default function GNB() {
  const location = useLocation();
  const { isLogged } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const checkLoginStatus = (e) => {
    if (!isLogged) {
      e.preventDefault();
      openLoginBottomSheet(dispatch);
    }
  };

  useEffect(() => {
    dispatch(closeBottomSheet());
  }, [dispatch, location.pathname]);

  return (
    <div className="w-full max-w-[576px] h-[50px] border-solid border-0 border-t border-zinc-200 fixed bottom-0 flex justify-around items-center z-30 bg-white">
      <Link
        to="/"
        className="text-black w-full flex items-center justify-center"
      >
        {location.pathname === "/" ? (
          <HomeIcon className="w-6 h-6" />
        ) : (
          <HomeOutlinedIcon className="w-6 h-6" />
        )}
      </Link>
      <Link
        to="/search"
        className="text-black w-full flex items-center justify-center"
      >
        {location.pathname === "/search" ||
        location.pathname.startsWith("/portfolios/") ? (
          <SearchIcon className="w-6 h-6" />
        ) : (
          <SearchOutlinedIcon className="w-6 h-6" />
        )}
      </Link>
      <Link
        to="/chat/list"
        onClick={checkLoginStatus}
        className="text-black w-full flex items-center justify-center"
      >
        {location.pathname.startsWith("/chat") ? (
          <ChatIcon className="w-6 h-6" />
        ) : (
          <ChatOutlinedIcon className="w-6 h-6" />
        )}
      </Link>
      <Link
        to="/profile"
        onClick={checkLoginStatus}
        className="text-black w-full flex items-center justify-center"
      >
        {location.pathname.startsWith("/profile") ? (
          <ProfileIcon className="w-6 h-6" />
        ) : (
          <ProfileOutlinedIcon className="w-6 h-6" />
        )}
      </Link>
    </div>
  );
}
