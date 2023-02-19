import {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactElement,
  FC,
} from "react";

export interface TextFieldInterface
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  color?: string;
  icon?: ReactElement;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  label?: string;
  value?: string | number;
  required?: boolean;
  ref?: React.LegacyRef<HTMLInputElement>;
}

const TextField: FC<TextFieldInterface> = (props): ReactElement => {
  return (
    <section className="flex flex-col gap-y-2 relative">
      {props.icon}
      <section className="flex flex-col gap-y-2 w-auto relative">
        <input
          ref={props.ref}
          type={props.type}
          placeholder={props.placeholder}
          name={props.name}
          disabled={props.disabled}
          className={`${props.className} ${
            props.required && "border-blue-500 border-1 focus:outline-blue-500"
          }`}
          value={props.value}
          onChange={props.onChange}
        />
        {props.label && (
          <label
            className={` ${
              props.required && "text-blue-500"
            } block absolute bottom-10 bg-white left-4 font-medium text-[14px]`}
            htmlFor={props.name}
          >
            {props.required ? "*" + props.label : props.label}
          </label>
        )}
      </section>
    </section>
  );
};

export default TextField;
