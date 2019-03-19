import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const handleRejectedFiles = files => {

}


const useImageDrop = (options = {}) => {
  const acceptedFileTypes = ['image/x-png', 'image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/svg']

  const [fileError, setFileError] = useState();

  const onDrop = useCallback((files, rejectedFiles) => {
    console.log("Accepted Files", files)
  }, []);

  const onRejected = useCallback((files) => {
    console.log("Not Accepted Files", files)
  }, []);

  const dropOptions = {
    onDrop,
    maxSize: 1000000,
    accept: 'image/*',
    onRejected
  };

  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({dropOptions, ...options},);
  useDropzone({o})

  return (
    
  );
};

export default fileTest;
