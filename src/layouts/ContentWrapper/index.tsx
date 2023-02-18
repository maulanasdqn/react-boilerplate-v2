import Header from "@modules/Sales/List/Header";
import { ReactElement, ReactNode, FC } from "react";

const ContentWrapper: FC<{ children: ReactNode; withHeader: boolean }> = ({
  children,
  withHeader,
}): ReactElement => {
  return (
    <section className="flex gap-y-4 flex-col justify-between w-full">
      {withHeader && <Header />}
      {children}
    </section>
  );
};

export default ContentWrapper;
