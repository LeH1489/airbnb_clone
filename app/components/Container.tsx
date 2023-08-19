"use client";

import React from "react";

interface ContainerProps {
  children: React.ReactNode; //a union type that includes several possible data tupes, such as: jsx elements, string, number...==> render different types of content
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[2520px] mx-atuo xl:px-20 md:px-10 sm:px-2 px-4">
      {children}
    </div>
  );
};

export default Container;
