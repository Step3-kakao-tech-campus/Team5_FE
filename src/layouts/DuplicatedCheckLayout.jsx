import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function DuplicatedCheckLayout() {
  const { isLogged } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogged) {
      navigate(-1);
    }
  }, []);

  return <div>{!isLogged && <Outlet />}</div>;
}
