import { AccordionTogle } from "@stores/Common";
import {
  ChangeEventHandler,
  FC,
  Fragment,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

type PropsTypes = {
  id?: string | undefined;
  index?: number;
  withCheckbox: boolean;
  withButton: boolean;
  title: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  get?: boolean;
  slug?: string;
  children: ReactNode;
};

const Accordion: FC<PropsTypes> = (props): ReactElement => {
  useEffect(() => {
    console.log("re-render");
  }, []);
  const [isDropdownShow, setDropdown] = useRecoilState(AccordionTogle);
  const toggle = (i: number | null | undefined): void =>
    isDropdownShow === i ? setDropdown(null) : setDropdown(i);
  return (
    <section className="flex flex-col h-full gap-y-2 border-1 border-gray-200 w-full">
      <section className="flex text-[14px] w-full justify-between items-center p-3">
        <div
          onClick={() => toggle(props.index)}
          className={`${
            !props.withButton && "justify-between items-center"
          } flex gap-x-3 border-gray-200 w-full`}
        >
          {props.withButton && (
            <Fragment>
              {isDropdownShow === props.index ? (
                <MdExpandMore className="text-[20px] text-gray-600 font-bold" />
              ) : (
                <MdExpandLess className="text-[20px] text-gray-600 font-bold" />
              )}
            </Fragment>
          )}
          <div className="flex gap-x-2">
            {props.withCheckbox && (
              <input
                id={props.id}
                type={"checkbox"}
                name={props.title}
                onChange={props.onChange}
                checked={props.get}
                value={props.value}
              />
            )}
            <h1
              className={`${
                !props.withButton &&
                "text-black-700 text-left w-[220px] font-normal text-base"
              } text-black-900 font-bold text-overflow max-w-auto h`}
            >
              {props.title}
            </h1>
          </div>
          {!props.withButton && (
            <Fragment>
              {isDropdownShow === props.index ? (
                <MdExpandMore className="text-[30px] text-gray-600 font-bold" />
              ) : (
                <MdExpandLess className="text-[30px] text-gray-600 font-bold" />
              )}
            </Fragment>
          )}
        </div>
        {props.withButton && (
          <Link to={`/sales/${props.slug}`}>
            <button className="text-white bg-blue-500 rounded-md p-2 text-xs font-bold h-[30px]">
              Details
            </button>
          </Link>
        )}
      </section>
      {isDropdownShow === props.index && props.children}
    </section>
  );
};

export default Accordion;
