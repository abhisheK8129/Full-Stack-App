import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrAddress,
  selectedId,
}) => {
  return (
    <Card
      onClick={setCurrAddress ? () => setCurrAddress(addressInfo) : null}
      className={`bg-addressCard cursor-pointer ${
        selectedId?._id === addressInfo?._id
          ? "border-5 border-teal-500"
          : "border-2 border-black"
      } `}
    >
      <CardContent className="grid gap-4">
        <Label className="font-medium">
          <span className="font-bold text-[16px]">Address:</span>
          {addressInfo?.address}
        </Label>
        <Label className="font-medium">
          <span className="font-bold text-[16px]">City:</span>
          {addressInfo?.city}
        </Label>
        <Label className="font-medium">
          <span className="font-bold text-[16px]">Pincode:</span>
          {addressInfo?.pincode}
        </Label>
        <Label className="font-medium">
          <span className="font-bold text-[16px]">Phone No:</span>
          {addressInfo?.phoneNo}
        </Label>
        <Label className="font-medium">
          <span className="font-bold text-[16px]">Country:</span>
          {addressInfo?.country}
        </Label>
        <Label className="font-medium">
          <span className="font-bold text-[16px]">Landmark:</span>
          {addressInfo?.landmark}
        </Label>
      </CardContent>
      <CardFooter className="flex justify-between p-3">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button className="" onClick={() => handleDeleteAddress(addressInfo)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
