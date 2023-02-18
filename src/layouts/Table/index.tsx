import { ReactElement, ReactNode, FC } from "react";

const TableLayouts: FC<{ children: ReactNode }> = ({
  children,
}): ReactElement => {
  return (
    <section className="border-1 border-gray-200 w-full p-3 h-full">
      {children}
    </section>
  );
};

export default TableLayouts;
