import React, { Fragment } from "react";
import { FilterOptions } from "../../config/Config";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
export const FilterTheProduct = ({ filters, toHandleTheFilter }) => {
  return (
    <div className="mt-2  border-r-1 border-gray-300 rounded-lg shadow-sm">
      <div className="px-4 py-4.5 border-b">
        <h2 className="text-lg font-bold">Filters</h2>
      </div>
      <div className="p-4 space-y-5">
        {Object.keys(FilterOptions).map((keyItems) => (
          <Fragment>
            <div>
              <h3 className="font-bold text-base mb-2">{keyItems}</h3>
              <div className="grid gap-2 ">
                {FilterOptions[keyItems].map((filterOptions) => (
                  <Label className="flex items-center cursor-pointer font-medium">
                    <Checkbox
                    className='bg-gray-400'
                      // when checkbox is checked
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItems] &&
                        filters[keyItems].indexOf(filterOptions.id) > -1
                      }
                      // when checkbox gets changed
                      onCheckedChange={() =>
                        toHandleTheFilter(keyItems, filterOptions.id)
                      }
                    />
                    {filterOptions.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
};
