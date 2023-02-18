import { FC, ReactElement, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

type PropsTypes = {
  title: string;
  withMenu: boolean;
};

const HeaderTitle: FC<PropsTypes> = ({ title, withMenu }): ReactElement => {
  const [isMenuShow, setShowMenu] = useState(false);
  return (
    <section
      data-testid="header-title"
      className="flex w-full flex-col gap-y-1 py-3"
    >
      <div className="flex justify-between w-full items-center">
        <h1 className="text-[24px] font-bold text-black-900">{title}</h1>
        {withMenu && (
          <BsThreeDots
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-[20px]"
          />
        )}
      </div>
      <hr className="border-1 rounded-full border-gray-300" />
    </section>
  );
};

export default HeaderTitle;
