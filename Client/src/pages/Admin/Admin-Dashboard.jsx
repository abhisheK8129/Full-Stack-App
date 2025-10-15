import { ImageUpload } from "@/components/Admin-Component/ImageUpload.jsx";
import { Button } from "@/components/ui/button";
import { toAddTheFeatures, toGetTheFeatures } from "@/store/Common-Feature-Slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const AdminDashboard = () => {
  const [uploadedImageFile, setuploadedImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imgLoadingState, setImgLoadingState] = useState(false);
  const dispatch = useDispatch()
  const {featureImages}  = useSelector((state)=> state.features) 

  function handleUploadFeatureImage(){
    dispatch(toAddTheFeatures(imageUrl)).then((data)=>{
      if(data?.payload?.success){
        dispatch(toGetTheFeatures()).then((data)=>{
          if(data.payload.success){
            toast('image added successsfully')
            setuploadedImageFile(null)
            setImageUrl('')
          }
        })
        
      }
      
    })
  }

  useEffect(()=>{
    dispatch(toGetTheFeatures())
  },[dispatch])

  console.log(featureImages,'featureImages');
  
  return (
    <div className="">
      <ImageUpload
      uploadedImageFile={uploadedImageFile}
      setuploadedImageFile={setuploadedImageFile}
      imageUrl={imageUrl}
      setImageUrl={setImageUrl}
      imgLoadingState={imgLoadingState}
      setImgLoadingState={setImgLoadingState}
      isCustomStyling = {true}
      />
      <div className="text-center mb-10">
      <Button className='w-[250px] cursor-pointer' onClick={handleUploadFeatureImage}>Upload</Button>
      </div>

      <div>
        {
          featureImages && featureImages.length > 0  ? 
          featureImages.map((img)=>(
            <div className="flex relative justify-center mb-3">
              <img className="w-[1200px]" src={img.image} alt='image'/>
            </div>
          ))
          : null


        }
      </div>
      


    </div>
  );
};
