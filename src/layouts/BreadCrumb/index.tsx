import BreadCrumb from "@components/BreadCrumb";
import { ReactElement, FC } from "react";

const BreadCrumbLayouts: FC<{
  arr: { text: string; link: string; sep: string }[];
}> = ({ arr }): ReactElement => {
  return (
    <section className="flex gap-x-2">
      {arr.map((x, i) => (
        <BreadCrumb key={i} {...x} />
      ))}
    </section>
  );
};

export default BreadCrumbLayouts;
