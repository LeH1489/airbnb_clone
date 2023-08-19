"use client";

import React from "react";

interface HeadingProps {
  title: string;
  subtile?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtile, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold">{title}</div>
      <div className="font-light text-neutral-500 mt-2">{subtile}</div>
    </div>
  );
};

export default Heading;
