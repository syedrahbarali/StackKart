import React from "react";

const Container = ({ className = "", children, ...props }) => {
  return (
    <div className={` md:max-w-[90%] md:w-[90%] mx-auto ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Container;
