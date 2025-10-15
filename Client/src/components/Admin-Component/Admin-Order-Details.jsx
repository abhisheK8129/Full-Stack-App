import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Form } from "../Common/Form";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  toGetAllTheAdminOrders,
  toGetTheAdminOrdersDetails,
  updateTheOrderStatus,
} from "@/store/admin/Order-slice";
import { toast } from "sonner";

const initialFormData = {
  status: "",
};

export const AdminOrderDetails = ({ orderDetails }) => {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.authenticationSlice);
  const dispatch = useDispatch();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateTheOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success){
        dispatch(toGetAllTheAdminOrders())
        dispatch(toGetTheAdminOrdersDetails(orderDetails?._id))
        setFormData(initialFormData)
        toast('order status updated')
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[600px] max-h-full overflow-scroll">
      <div className="grid gap-5">
        <div className="flex items-center justify-between">
          <p className="font-medium">Order ID</p>
          <Label>{orderDetails?._id}</Label>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium">Order Date</p>
          <Label>
            {orderDetails?.orderDate
              ? new Date(orderDetails?.orderDate).toLocaleDateString("en-GB")
              : ""}
          </Label>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium">Order Status</p>
          <Badge
          className={`
            ${
              orderDetails?.orderStatus === "confirmed"
              ? 'bg-green-500 hover:bg-orange-500'
              : orderDetails?.orderStatus === "rejected"
              ? 'bg-red-500'
              : orderDetails?.orderStatus === "inShipping"
              ? "bg-blue-500"
              : orderDetails?.orderStatus === "pending"
              ? "bg-yellow-300 hover:bg-yellow-600"
              : "bg-cyan-500"
            }
            `}
          >
            {orderDetails?.orderStatus}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium">Price</p>
          <Label>{orderDetails?.totalAmount}</Label>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium">Payment Method </p>
          <Label>{orderDetails?.paymentMethod}</Label>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium">Payment Status</p>
          <Label>{orderDetails?.paymentStatus}</Label>
        </div>
        <Separator />
        {/* Product Details */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-bold text-center">Order Detials</div>
            <ul className="grid gap-3 border-2 border-black  rounded-lg px-0 py-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((yourOrders) => (
                    <li className="grid grid-cols-3 px-2">
                      <span className="font-bold">
                        Title: {yourOrders?.title}
                      </span>
                      <span className="font-bold">
                        Quantity : {yourOrders?.quantity}
                      </span>
                      <span className="font-bold">
                        Price : {yourOrders?.price}
                      </span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <Separator />
        {/* Shipping Information */}
        <div className="grid gap-5">
          <div className="grid gap-3">
            <div className="font-bold text-center">Shipping Info</div>
            <div className="grid  grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-3 border-2 border-black rounded-lg p-2">
              <div className="font-bold">
                Name :<span className="font-light"> {user?.username}</span>
              </div>
              <div className="font-bold">
                Address :
                <span className="font-light">
                  {" "}
                  {orderDetails?.addressInfo.address}
                </span>
              </div>
              <div className="font-bold">
                City:
                <span className="font-light">
                  {" "}
                  {orderDetails?.addressInfo?.city}
                </span>
              </div>
              <div className="font-bold">
                Country :
                <span className="font-light">
                  {" "}
                  {orderDetails?.addressInfo?.country}
                </span>
              </div>
              <div className="font-bold">
                Landmark :
                <span className="font-light">
                  {" "}
                  {orderDetails?.addressInfo?.landmark}
                </span>
              </div>
              <div className="font-bold">
                Phone No :
                <span className="font-light">
                  {" "}
                  {orderDetails?.addressInfo?.phoneNo}
                </span>
              </div>
              <div className="font-bold">
                Pincode :
                <span className="font-light">
                  {" "}
                  {orderDetails?.addressInfo?.pincode}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Form
          formControls={[
            {
              label: "Order Status",
              name: "status",
              componentType: "select",
              options: [
                { id: "pending", label: "Pending" },
                { id: "inProcess", label: "In Process" },
                { id: "confirmed", label: "confirmed" },
                { id: "rejected", label: "Rejected" },
                { id: "inShipping", label: "In Shipping" },
              ],
            },
          ]}
          formData={formData}
          setTheFormData={setFormData}
          buttonText={"Update Order Status"}
          onSubmit={handleUpdateStatus}
        />
      </div>
    </DialogContent>
  );
};
