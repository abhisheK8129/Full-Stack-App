import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, Upload, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

export const ImageUpload = ({
  uploadedImageFile,
  setuploadedImageFile,
  imageUrl,
  setImageUrl,
  imgLoadingState,
  setImgLoadingState,
  inEditMode,
  isCustomStyling = false
}) => {


  const inputRef = useRef(null);


    useEffect(()=>{
      if(uploadedImageFile !== null){
        uploadImageToCloudinary()
      }
  
    },[uploadedImageFile])
 


  // to upload the image to the cloudinary
  async function uploadImageToCloudinary() {

    // when the image is getting loaded
    setImgLoadingState(true)

    const data = new FormData(); // FormData object to collect the form data and send it to the server
    data.append("my_file",uploadedImageFile)
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,data)
    console.log(response,'response')
    if(response.data.success){
      setImageUrl(response.data.result.url)
      setImgLoadingState(false) 
    }
  }

  
  // to handle the image file upload
  function handleChangeInImageFile(event) {
      const selectedFile = event.target.files?.[0]; // select file
    if (selectedFile) {
      setuploadedImageFile(selectedFile); // use setuploadedImageFile
    }
  }

  // to drag the image
  function handleDragOver(event) {
    event.preventDefault();
  }

  // to drop the image
  function handleImageDrop(event) {
    event.preventDefault();
    const removedFile = event.dataTransfer.files?.[0]; // dataTransfer object holds and manage the data during drag & drop operations.
    if (removedFile) {
      setuploadedImageFile(removedFile);
    }
  }

  // to remove the image
  function handleRemoveImage() {
    setuploadedImageFile(null); // set the uploaded image file to null
    if (inputRef.current) {
      inputRef.current = ""; // set the inputRef.current to empty
    }
  }

  return (
    <div className={`w-full max-w-md mx-auto ${isCustomStyling ? '' : 'max-w-md mx-auto'}`}>
      <Label className={`${inEditMode ? "hidden": "text-xl font-bold  mb-2 flex justify-center"}`}>
           Product Image
      </Label>
      <div
        className="p-2"
        onDragOver={handleDragOver}
        onDrop={handleImageDrop}
        
      >
        <Input
          id="image-upload"
          disabled={inEditMode}
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleChangeInImageFile}
        />
        {/* when the uploading file is not null  */}
        {!uploadedImageFile ? (

            <Label
            htmlFor="image-upload"
            className={`${inEditMode ? 'hidden': "flex flex-col items-center justify-center h-28  my-5 cursor-pointer"}`}
            >
            <UploadCloudIcon />
            <span>Drag & Drop the Image</span>
            </Label>
          )
         : 
        //  when the image loading state is true
        imgLoadingState ? (
          <div className="flex bg-gray-300 rounded-full items-center space-x-4 m-2 p-4">
            <div className="space-y-2 ">
              <Skeleton className='h-4 w-[250px]'/>
              <Skeleton className='h-4 w-[200px]'/>
            </div>
          </div>
        ) 
        // when the imae loading state is false
        :
        (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-blue-500 mr-2 h-8" />
            </div>
            <p className="text-sm">{uploadedImageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
