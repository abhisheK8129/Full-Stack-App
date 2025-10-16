import React, { useState } from "react";
import img from "../../assets/Home Page Slides/slide-1.jpg";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingOrders } from "@/components/Shopping-Component/Orders";
import { Address } from "@/components/Shopping-Component/Address";
import { useSelector } from "react-redux";

export const CustomerAccountPage = () => {
  const today = new Date();
  const { user } = useSelector((state) => state.authenticationSlice);
  return (
    <div className="font-bold text-2xl  flex flex-col">
        <div className="relative w-full flex justify-center   h-[500px]  overflow-hidden">
          <img
            src={img}
            className=" object-cover h-full w-full object-center"
          />
          <div className="absolute  top-5  text-white">
            <div className="text-center font-extrabold">Welcome {user.username.toUpperCase()}</div>
            <div className="w-full justify-center flex  mt-2 mb-2 gap-2">
              <Badge
                variant="outline"
                className="border-2 rounded-2xl border-white font-extrabold text-white"
              >
                {format(today, "PP")}
              </Badge>
            </div>
          </div>
        </div>

      <div className="container mx-auto grid  grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg bg-background border p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
