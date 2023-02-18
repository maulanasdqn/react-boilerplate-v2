import { ReactElement, FC } from "react";
import { Link } from "react-router-dom";
import { PropsTypes } from "./types";

const BreadCrumb: FC<PropsTypes> = ({ text, link, sep = "" }): ReactElement => {
  return (
    <span
      data-testid="breadcomb"
      className="text-sm font-regular py-1 text-blue-700"
    >
      <Link to={link}>{text}</Link> {sep}
    </span>
  );
};

export default BreadCrumb;
