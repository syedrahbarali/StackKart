import  { useId } from "react";
import { forwardRef } from "react";

const LabelInput = ({ label = "", type = "text", placeholder = "", className="", ...props }, ref) => {
  const id = useId();
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={id} className="m-1 font-semibold">{label}</label>}
      <input ref={ref} id={id} type={`${type}`} placeholder={`${placeholder}`} {...props} className={`p-2 rounded-lg border border-gray-600 ${className}`} />
    </div>
  );
};

export default forwardRef(LabelInput);
