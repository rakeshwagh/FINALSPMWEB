import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { BsFilterLeft, BsArrowDown } from "react-icons/bs";
import { radioBtnValue } from "../../mock/sortRadioInput";
import DropDown from "../../components/dropdown";
import { filters } from "../../mock/filters";
import { useDispatch, useSelector } from "react-redux";
interface Props {}
const Sort: React.FC<Props> = ({}) => {
  const [currentDropDown, setDropDown] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef(null);
  useEffect(() => {
    const eventHandler = (event: MouseEvent) => {
      if (filterRef.current && !filterRef?.current?.contains(event.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("click", eventHandler);
    return () => {
      document.removeEventListener("click", eventHandler);
    };
  }, []);

  return (
    <div className="my-4 pb-2 flex flex-col flex-wrap border-b-2 border-slate-300">
      <div
        className="flex items-center justify-end mb-2 cursor-pointer relative"
        ref={filterRef}
      >
        <div
          className="flex justify-between items-center p-1 rounded-md bg-blue-400 text-white border-none"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <p className="px-2">Filter by </p>
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="white"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className={`${filterOpen ? "absolute" : "hidden"} top-9 z-40`}>
          <div className="px-4 py-3 bg-slate-100 shadow-lg border-2 border-gray-200">
            <div className={`flex justify-end flex-col items-center`}>
              {Object.keys(filters).map((filter, index) => {
                return (
                  <DropDown
                    filterOption={filter}
                    key={`id-${index}`}
                    currentDropDown={currentDropDown}
                    setDropDown={setDropDown}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sort;
