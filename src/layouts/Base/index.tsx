import { ReactElement, FC, ReactNode } from "react";

const BaseLayouts: FC<{ children: ReactNode }> = ({
  children,
}): ReactElement => {
  return (
    <section className="flex justify-center h-screen w-full bg-gray-100">
      <section className="max-w-md w-full h-full">{children}</section>
    </section>
  );
};

export default BaseLayouts;
