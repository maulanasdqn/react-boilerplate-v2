import { ReactElement, ReactNode, FC } from "react";

const MainLayouts: FC<{ children: ReactNode }> = ({
  children,
}): ReactElement => {
  return (
    <section className="flex justify-start h-auto w-full px-[19px] py-[17px] bg-secondary rounded-lg">
      {children}
    </section>
  );
};

export default MainLayouts;
