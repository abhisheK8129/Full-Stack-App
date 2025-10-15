import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { AdminOrderDetails } from "./Admin-Order-Details";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrderDetails,
  toDeleteTheOrder,
  toGetAllTheAdminOrders,
  toGetTheAdminOrdersDetails,
} from "@/store/admin/Order-slice";
import { Badge } from "../ui/badge";
import { Trash } from "lucide-react";

export const AdminOrdersComponent = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toGetAllTheAdminOrders());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  console.log(orderList, "orderList");

  function getTheOrderDetails(getTheId) {
    dispatch(toGetTheAdminOrdersDetails(getTheId));
        
  }

  function handleDelete(getDeleteOrderId) {
    dispatch(toDeleteTheOrder(getDeleteOrderId));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">Your Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>List of Shopping Orders</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>OrderID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="font-bold">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((adminOrders) => (
                  <TableRow>
                    <TableCell>{adminOrders?._id}</TableCell>
                    <TableCell>
                      {adminOrders.orderDate
                        ? new Date(adminOrders.orderDate).toLocaleDateString(
                            "en-GB"
                          )
                        : ""}
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={`px-4 py-1 ${
                          adminOrders?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : adminOrders?.orderStatus === "rejected"
                            ? "bg-red-500"
                            : adminOrders?.orderStatus === "pending"
                            ? "bg-yellow-500"
                            : "bg-black"
                        }`}
                      >
                        {adminOrders?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{adminOrders?.totalAmount}</TableCell>
                    <TableCell>
                      <Button
                        className="rounded-lg hover:bg-red-500"
                        onClick={() => handleDelete(adminOrders?._id)}
                      >
                        <Trash />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(setOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() => getTheOrderDetails(adminOrders?._id)}
                        >
                          View Details
                        </Button>
                        <AdminOrderDetails orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
