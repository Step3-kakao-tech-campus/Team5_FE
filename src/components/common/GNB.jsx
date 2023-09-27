import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SmsIcon from "@mui/icons-material/Sms";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useLocation } from "react-router-dom";
import { BiSolidSearch, BiSearch } from "react-icons/bi";

export default function GNB() {
  const location = useLocation();

  return (
    <div className="w-full max-w-[768px] h-16 border-solid border-0 border-t-2 border-zinc-200 absolute bottom-0 flex justify-around items-center z-10 bg-white">
      <Link
        to="/"
        className="text-black w-full flex items-center justify-center"
      >
        {location.pathname === "/" ? (
          <HomeIcon sx={{ fontSize: 40 }} />
        ) : (
          <HomeOutlinedIcon sx={{ fontSize: 40 }} />
        )}
      </Link>
      <Link
        to="/search"
        className="text-black w-full flex items-center justify-center"
      >
        {location.pathname === "/search" ? (
          <BiSolidSearch className=" text-[40px]" />
        ) : (
          <BiSearch className="text-[40px]" />
        )}
      </Link>
      <Link
        to="/chatlist"
        className="text-black w-full flex items-center justify-center"
      >
        {location.pathname === "/chatlist" ? (
          <SmsIcon sx={{ fontSize: 40 }} />
        ) : (
          <SmsOutlinedIcon sx={{ fontSize: 40 }} />
        )}
      </Link>
      <Link
        to="/profile"
        className="text-black w-full flex items-center justify-center"
      >
        {location.pathname === "/profile" ? (
          <AccountCircleIcon sx={{ fontSize: 40 }} />
        ) : (
          <AccountCircleOutlinedIcon sx={{ fontSize: 40 }} />
        )}
      </Link>
    </div>
  );
}
