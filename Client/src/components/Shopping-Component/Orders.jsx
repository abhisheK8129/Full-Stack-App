import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Button } from "../ui/button";
import { ShoppingOrderDetails } from "./Order-Details";
import { useDispatch, useSelector } from "react-redux";
import { setOrderDetails, toDeleteTheOrder, toGetAllTheOrders, toGetTheOrdersDetails } from "@/store/Shopping/Order-Slice";
import { Badge } from "../ui/badge";
import { Trash } from "lucide-react";

export const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authenticationSlice);
  const { orderList,orderDetails} = useSelector((state) => state.shopOrder);

  useEffect(() => {
    dispatch(toGetAllTheOrders(user?.id));
  }, [dispatch]);

  console.log(orderDetails,'orderDetails');
  
  function getTheOrderDetails(getOrderID){
      dispatch(toGetTheOrdersDetails(getOrderID))

  }


  useEffect(()=>{
    if(orderDetails !== null){
      setOpenDetailsDialog(true)
    }
  },[orderDetails])
  
  function handleDelete(getDeleteOrderId){
      dispatch(toDeleteTheOrder(getDeleteOrderId))
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
              <TableHead className='font-bold'>OrderID</TableHead>
              <TableHead className='font-bold'>Order Date</TableHead>
              <TableHead className='font-bold'>Order Status</TableHead>
              <TableHead className='font-bold'>Price</TableHead>
              <TableHead className='font-bold'>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              orderList && orderList.length > 0 ? 
              orderList.map((purchasedOrders)=>(
            <TableRow>
              <TableCell>{purchasedOrders?._id}</TableCell>
              <TableCell>{purchasedOrders.orderDate ? new Date(purchasedOrders.orderDate).toLocaleDateString('en-GB'): ""}</TableCell>
              <TableCell>
                <Badge className={`px-5 rounded-4xl py-1 ${purchasedOrders?.orderStatus   === 'confirmed' ? 'bg-green-600' : purchasedOrders?.orderStatus === 'rejected' ? 'bg-red-600' : purchasedOrders?.orderStatus === 'pending' ? 'bg-yellow-500' : purchasedOrders?.orderStatus === 'canceled' ? 'bg-red-500' : '' }`}>
                {purchasedOrders?.orderStatus}
                </Badge>
                </TableCell>
              <TableCell>{purchasedOrders?.totalAmount}</TableCell>
              <TableCell>
                  <Button className='rounded-lg hover:bg-red-500' onClick={()=>handleDelete(purchasedOrders?._id)}>
                    <Trash/>
                  </Button>
              </TableCell>
              <TableCell>
                <Dialog
                  open={openDetailsDialog}
                  onOpenChange={()=>{
                    setOpenDetailsDialog(false)
                    dispatch(setOrderDetails())
                  }}
                >
                  <Button onClick={() => getTheOrderDetails(purchasedOrders?._id) }>
                    View Details
                  </Button>
                  <ShoppingOrderDetails orderDetails={orderDetails}  />
                </Dialog>
              </TableCell>
            </TableRow>
              ))
              : 
              null
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
