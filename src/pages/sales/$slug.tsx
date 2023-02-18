import { ProtectedRoutes } from "@middleware/ProtectedRoutes";
import { FC, ReactElement } from "react";
import { useParams } from "react-router-dom";

const DetailSales: FC = (): ReactElement => {
  const { slug } = useParams();
  return (
    <ProtectedRoutes>
      <>{slug}</>
    </ProtectedRoutes>
  );
};

export default DetailSales;
