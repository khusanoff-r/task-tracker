import type { PropsWithChildren } from "react";

import { LABEL_CLASS } from "@/constants";

type FormFieldProps = PropsWithChildren<{
  label: string;
  htmlFor: string;
}>;

export const FormField = ({ label, htmlFor, children }: FormFieldProps) => (
  <div>
    <label htmlFor={htmlFor} className={LABEL_CLASS}>
      {label}
    </label>

    {children}
  </div>
);
