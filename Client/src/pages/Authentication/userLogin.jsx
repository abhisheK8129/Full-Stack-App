import { loginDetails, registrationDetails } from "@/config/Config";
import { Form } from "@/components/Common/Form";
import { toLoginTheUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};


export const UserLogin = () => {
  const [formData, setTheFormData] = useState(initialState);
  const dispatch = useDispatch()

  // onSubmit function
  function onSubmit (event){

    // to prevent default functionalities
    event.preventDefault()

    // to dispatch the action 
    dispatch(toLoginTheUser(formData)).then((data)=>{

      // if this condition is true 
      if(data?.payload?.success){
        toast('Logged in successfully',{
          style: {
            color: 'green',
            backgroundColor: 'white'
          }
        })
      }
      else{
        toast('Invalid Credentials',{
          style:{
            color: 'white',
            backgroundColor: 'red'
          }
        })
      }
    })

  }

  return (
    <div className=" font-register mx-auto w-full max-w-md space-y-6 ">
      <div className="text-center">
        <h1 className=" font-bold text-2xl text-foreground tracking-tighter">
        Sign in to your account
        </h1>
        <p className=" font-bold text-[12px]">
          Do not have an account
          <Link to="/auth/register" className=" font-medium hover:underline ml-2">
          Create the account
          </Link>
        </p>
      </div>
      <Form
        formControls={loginDetails}
        formData={formData}
        setTheFormData={setTheFormData}
        buttonText={"Sign In"}
        onSubmit={onSubmit}
      />
    </div>
  );
};
