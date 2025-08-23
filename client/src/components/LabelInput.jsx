import { useId } from "react";
import { forwardRef } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const LabelInput = ({ label = "", type = "text", placeholder = "", className = "", ...props }, ref) => {
  const id = useId();
  return (
    <div className="flex flex-col">
      {label && <Label htmlFor={id} className="m-1">{label}</Label>}
      <Input ref={ref} id={id} type={`${type}`} placeholder={`${placeholder}`} {...props} className={`p-2 placeholder:font-semibold font-semibold rounded-lg border border-gray-600 ${className}`} />
    </div>
  );
};

export default forwardRef(LabelInput);
