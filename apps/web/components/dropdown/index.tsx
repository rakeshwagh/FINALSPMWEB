import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filters } from "../../mock/filters";
import { filterAction } from "../../store/filters.slice";
const index = ({ filterOption, currentDropDown, setDropDown }) => {
  const filterState = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  // console.log(filterState);
  // console.log("Inside DropDown");
  return (
    <div>
      <div className="relative text-left justify-between w-52 my-1">
        <div
          onClick={() => {
            setDropDown((prev) => (prev == filterOption ? "" : filterOption));
          }}
        >
          <button
            type="button"
            className={`flex w-full justify-between gap-x-1.5
            border-b-2 border-gray-100 py-2 text-sm font-semibold  text-gray-900 shadow-sm hover:bg-gray-50`}
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {filterOption}
            <svg
              className="-mr-1 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div
          className={`w-full ${
            currentDropDown == filterOption ? "block" : "hidden"
          } z-10 origin-top-right rounded-md focus:outline-none`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1 w-full" role="none">
            {filters[filterOption].map((option, index) => {
              let key = Object.keys(option);
              return (
                <div className="flex w-full" key={`menu-item-${index}`}>
                  <input
                    type="checkbox"
                    className="flex-[0.1]"
                    checked={filterState?.filterOption?.includes(
                      option[key[0]]
                    )}
                    onChange={(event) => {
                      const action = event.target.checked
                        ? filterAction.addFilter({
                            type: filterOption,
                            data: option[key[0]],
                          })
                        : filterAction.removeFilter({
                            type: filterOption,
                            data: option[key[0]],
                          });
                      dispatch(action);
                    }}
                  />
                  <p
                    className={`flex-[0.8] ml-2 text-gray-700 ${
                      index == filters[filterOption].length - 1 && "border-b-2"
                    } block px-4 py-2 text-sm`}
                    role="menuitem"
                  >
                    {key[0]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(index);
