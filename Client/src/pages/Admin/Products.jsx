import { AdminProductTile } from "@/components/Admin-Component/Product-tile";
import { ImageUpload } from "@/components/Admin-Component/ImageUpload.jsx";
import { addProductElements } from "@/config/Config";
import { Form } from "@/components/Common/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProduct, deleteProducts, editProduct, getProducts } from "@/store/admin/Product-Slice";
import { Edit } from "lucide-react";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

export const AdminProducts = () => {
  const requiredFields = [
    "title",
    "description",
    "category",
    "brand",
    "price",
    "totalStock",
  ];



  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [uploadedImageFile, setuploadedImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imgLoadingState,setImgLoadingState] = useState(false)
  const dispatch = useDispatch()
  const {adminProductList} = useSelector((state) => state.adminSlice)
  const [currentEditedId,setCurrentEditedId]= useState(null)

  useEffect(()=>{
    dispatch(getProducts())
  },[dispatch])

  console.log(adminProductList,'product list');



  // onSubmit function 
  function onSubmit(event) {
    event.preventDefault()
 
    currentEditedId !== null ? 

    dispatch(editProduct({id:currentEditedId,formData})).then((data)=> {
      if(data.payload.success){
        dispatch(getProducts())
        setFormData(initialFormData)
        setOpenDialog(false)
        setCurrentEditedId(null)
      }
    })
    

    :
    // to add the product details
    dispatch(addProduct({...formData, image: imageUrl})).then((data)=>{
      if(data?.payload?.success){
        // uploaded image file should get null
        setuploadedImageFile(null)
        // set the form data to initial form data
        setFormData(initialFormData)
        // set open dialog to false
        setOpenDialog(false)
        // get all the products
        dispatch(getProducts())
        toast('Product Added Successfully',{
          style:{
            backgroundColor: 'green',
            color: "white"

          }
        })
      }
      
    })
    
  }

  function toDeleteProducts(getCurrId){
    dispatch(deleteProducts(getCurrId)).then((data)=>{
      if(data.payload.success){
        dispatch(getProducts())
        toast('Product deleted Successfully',{
          style:{
            backgroundColor: 'red',
            color: 'white'
          }
        })
      }
    })
    
  }



  function isTheFormValid() {
    return requiredFields.map((key)=>formData[key] !== "").every((item) => item)
    
    
  }
  console.log(formData,'formData');
  

  

  return (
    <Fragment>
      <div className="flex mb-5 justify-center mt-2">
        <Button onClick={() =>{ 
          setOpenDialog(true)
          setCurrentEditedId(null)
          setFormData(initialFormData)
          }}>
          Add New Product
          </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* map the adminProductList */}
        {
          adminProductList && adminProductList.length > 0 ? adminProductList.map((items)=>(
            <AdminProductTile toDeleteProducts={toDeleteProducts} product={items} setCurrentEditedId={setCurrentEditedId} setOpenDialog={setOpenDialog} setFormData={setFormData} />
          )): 
          null
        }
      </div>
      <Sheet open={openDialog} onOpenChange={() => setOpenDialog(false)}>
        <SheetContent side="right" className="overflow-auto px-3 py-5">
          <SheetHeader>
            <SheetTitle className="text-center">
              {
                currentEditedId !== null ? 
                <Button>Edit the Product</Button>
                : 
                <Button>Add the Product</Button>
              }
            </SheetTitle>
          </SheetHeader>
          <ImageUpload
            uploadedImageFile={uploadedImageFile}
            setuploadedImageFile={setuploadedImageFile}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            imgLoadingState={imgLoadingState}
            setImgLoadingState= {setImgLoadingState}
            inEditMode={currentEditedId !== null}
          />
          <div className=" py-5">
            <Form
              formControls={addProductElements}
              formData={formData}
              setTheFormData={setFormData}
              buttonText= {currentEditedId !== null ? 'Edit' : 'Add'}
              onSubmit={onSubmit}
              isBtnDisabled = {!isTheFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};
