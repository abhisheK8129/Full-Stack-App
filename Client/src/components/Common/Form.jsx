import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export const Form = ({
  formControls,
  formData,
  setTheFormData,
  onSubmit,
  buttonText,
  isBtnDisabled
}) => {
  function getTheInputsByComponentType(getTheInputs) {
    let element = null;
    const value = formData[getTheInputs.name] || "";

    switch (getTheInputs.componentType) {
      // when the case is input
      case "input":
        element = (
          <Input
            name={getTheInputs.name}
            placeholder={getTheInputs.placeholder}
            id={getTheInputs.name}
            type={getTheInputs.type}
            value={value}
            onChange={(event) =>
              setTheFormData({
                ...formData,
                [getTheInputs.name]: event.target.value,
              })
            }
          />
        );
        break;

      // when the case is select
      case "select":
        element = (
          <Select
            name={getTheInputs.name}
            placeholder={getTheInputs.placeholder}
            id={getTheInputs.name}
            type={getTheInputs.type}
            value={value}
            onValueChange={(value) =>
              setTheFormData({
                ...formData,
                [getTheInputs.name]: value,
              })
            }
          >
            <SelectTrigger className="w-full  border-2 border-gray-500">
              <SelectValue placeholder={getTheInputs.label}></SelectValue>
            </SelectTrigger>
            <SelectContent>
              {getTheInputs.options && getTheInputs.options.length > 0
                ? getTheInputs.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      // when the case is textarea
      case "textarea":
        element = (
          <Textarea
            name={getTheInputs.name}
            placeholder={getTheInputs.placeholder}
            id={getTheInputs.id}
            value={value}
            onChange={(event) =>
              setTheFormData({
                ...formData,
                [getTheInputs.name]: event.target.value,
              })
            }
          ></Textarea>
        );
        break;

      // when the case is default
      default:
        element = (
          <Input
            name={getTheInputs.name}
            placeholder={getTheInputs.placeholder}
            id={getTheInputs.name}
            type={getTheInputs.type}
            value={value}
            onChange={(event) =>
              setTheFormData({
                ...formData,
                [getTheInputs]: event.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  }

  return (
    <form onSubmit={onSubmit} className="font-register">
      <div className="flex flex-col gap-3">
        {/* map through the form controls */}
        {formControls.map((formItems) => (
          <div key={formItems.name} className="grid w-full  gap-1">
            <Label className="mb-1">{formItems.label}</Label>
            {/* now create the function for componentType */}
            {getTheInputsByComponentType(formItems)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} className="mt-2 w-full" type="submit">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};
