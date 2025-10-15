import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const PaymentSuccessPage = () => {
  const navigate = useNavigate();


  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center font-bold text-green-500 text-2xl">
          Congratulations! Your payment is successful.
        </CardTitle>
        <div className="text-center mt-3">
          <Button
            onClick={() => navigate("/shopping/account")}
            className=" h-[40px] font-bold text-[15px]"
          >
            View Orders
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};
