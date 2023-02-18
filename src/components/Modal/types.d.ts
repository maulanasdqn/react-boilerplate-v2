import { ReactNode } from "react";

export type PropsTypes = {
  lookup: boolean;
  title: string;
  children: ReactNode;
  onClose?: VoidFunction;
  onSubmit: VoidFunction;
  submitText: string;
  closeText?: string;
};
