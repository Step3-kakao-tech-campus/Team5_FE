import { Link } from "react-router-dom";

const Card = ({ children, to, className = "" }) => {
  return (
    <Link className={`card-link ${className}`} to={to}>
      {children}
    </Link>
  );
};

export default Card;
