import { registrationDetails } from "@/config/Config";
import { Form } from "@/components/Common/Form";
import { toRegisterTheUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// this is the initial state for the username, email, password
const initialState = {
  username: "",
  email: "",
  password: "",
};

export const UserRegistration = () => {
  // useState for formData
  const [formData, setTheFormData] = useState(initialState);

  // to dispatch the action
  const dispatch = useDispatch();

  // to navigate through the route
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(toRegisterTheUser(formData)).then((data) => {
      if (data.payload.success) {
        toast("Registered Successfully", {
          style: {
            borderRadius: "20px",
            color: "white",
            backgroundColor: "green",
          },
        });
        navigate("/auth/login");
      } else {
        toast.error("You have entered the same email. Please try again.", {
          style: {
            borderRadius: "20px",
            color: "white",
            backgroundColor: "red",
          },
        });
      }
    });
  }

  return (
    <div className=" font-register mx-auto w-full max-w-md space-y-6 ">
      <div className="text-center">
        <h1 className=" font-bold text-2xl text-foreground tracking-tighter">
          Create the New Account
        </h1>
        <p className=" font-bold text-[12px]">
          Already Have an Account
          <Link to="/auth/login" className=" font-medium hover:underline ml-2">
            Login{" "}
          </Link>
        </p>
      </div>
      <Form
        formControls={registrationDetails}
        formData={formData}
        setTheFormData={setTheFormData}
        buttonText={"Sign Up"}
        onSubmit={onSubmit}
      />
    </div>
  );
};
