"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  //when user click on a category
  const handleClick = useCallback(() => {
    let currentquery = {};

    if (params) {
      currentquery = qs.parse(params.toString()); //parse current params into an object
    }

    const updatedQuery: any = {
      ...currentquery,
      category: label, //when user click on a category ==> label == param in URl
    };

    //check if user click on that category again ==> remove the param
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    //create a url with the newest query and path name("/")
    //stringifyUrl: object ==> URL
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center gap-2 p-3 border-b-2
       hover:text-neutral-800 transition cursor-pointer 
        ${selected ? "border-b-neutral-800" : "border-transparent"}
         ${selected ? "next-neutral-800" : "text-neutral-500"}
       `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
export const dynamic = "force-dynamic";
