import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Form } from "../Common/Form";
import { addressFormDetails } from "@/config/Config";
import { useDispatch, useSelector } from "react-redux";
import { toAddTheAddress, toDeleteTheAddress, toEditTheAddress, toFetchTheAddress } from "@/store/Shopping/Address-Slice";
import { toast } from "sonner";
import { AddressCard } from "./Address-Card";

export const Address = ({setCurrAddress,selectedId}) => {

  const initialAddressForm = {
    address: "",
    city: "",
    pincode: "",
    phoneNo: "",
    country: "",
    landmark: "",
  };
  const [formData, setFormData] = useState(initialAddressForm);
  const dispatch = useDispatch()
  const {user} = useSelector((state)=> state.authenticationSlice)
  const {addressList} = useSelector((state)=> state.shoppingAddressSlice)
  const [currAddressEditedId, setCurrAddressEditedId] = useState(null)


  // to render the address on the page load...
  useEffect(()=>{
    dispatch(toFetchTheAddress(user?.id))
  },[dispatch])

  console.log(addressList);
  

  // handle address
  function handleAddress(event) {
      event.preventDefault();
      
      if(addressList.length >= 3 && currAddressEditedId === null){
        setFormData(initialAddressForm)
        toast(`You can maximum add 3 addersses`,{
          style:{
            backgroundColor: 'black',
            color:'white'
          }
        })
        return
      }

      // if the currentEditedId is not null
      currAddressEditedId !== null ? 
      // to edit the address
      dispatch(toEditTheAddress({userId: user?.id, addressId: currAddressEditedId, formData})).then((data)=>{
        if(data.payload.success){
          dispatch(toFetchTheAddress(user?.id))
          setCurrAddressEditedId(null)
          setFormData(initialAddressForm)
          toast('Address updated',{
            style:{
              backgroundColor: 'green',
              color: 'white',
              borderRadius:'20px'
            }
          })

        }        
      })
      :
      // to add the address...
      dispatch(toAddTheAddress({
        ...formData,
        userId: user?.id
      })).then((data)=>{
        if(data.payload.success){
          // fetch the address
          dispatch(toFetchTheAddress(user?.id))
          // set the form data to initial
          setFormData(initialAddressForm)
          toast('New address added',{
            style:{
              backgroundColor: 'blue',
              color:'white'
            }
          })
        }
      })

    
  }

  function handleEditAddress(getCurrentAddressId){
      setCurrAddressEditedId(getCurrentAddressId?._id)
      setFormData({
        ...formData,
          address: getCurrentAddressId?.address,
          city: getCurrentAddressId?.city,
          pincode: getCurrentAddressId?.pincode,
          phoneNo: getCurrentAddressId?.phoneNo,
          country: getCurrentAddressId?.country,
          landmark: getCurrentAddressId?.landmark,
      })
  }

  function isFormValid(){
    return  Object.keys(formData).map(key => formData[key] !== "").every((item)=> item)
  }



  // to delete the addersses
  function handleDeleteAddress(getAddressId){
    dispatch(toDeleteTheAddress({userId: user?.id, addressId: getAddressId?._id})).then((data)=> {
      if(data.payload.success){
        dispatch(toFetchTheAddress(user?.id))
        toast('Address Deleted Successfully',{
          style:{
            backgroundColor: 'red',
            color: 'white'
          }
        })
      }      
    })    
  }

  return (
    <Card>
      <div className="grid grid-cols-1 sm:grid-cols-1  lg:grid-cols-2 gap-3 p-4">
        {
          addressList && addressList.length > 0 ?  addressList.map((addressItems)=>(

            <AddressCard
            addressInfo={addressItems}
            handleDeleteAddress={handleDeleteAddress}
            handleEditAddress={handleEditAddress}
            setCurrAddress={setCurrAddress}
            selectedId={selectedId}
            />
          )
          ): null
        }
      </div>
      <CardHeader >
        <CardTitle className="text-center">{currAddressEditedId !== null ? 'Edit the Address' : 'Add new address'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          formControls={addressFormDetails}
          formData={formData}
          setTheFormData={setFormData}
          buttonText={currAddressEditedId !== null ? 'Edit' : 'Add'}
          onSubmit={handleAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
      
    </Card>
  );
};
