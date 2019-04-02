import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const FileData = ({ file }) => (
  <div style={{ padding: '2rem' }}>
    <h1>file Data</h1>
    <div>
      <div>Name: {file.name}</div>
      <div>Width: {}</div>
      <div>Height: {}</div>
      <div>Type: {file.type}</div>
      <div>FileSize: {file.size / 1000000}Mb</div>
    </div>
  </div>
);

const UploadedImageDisplay = ({ file }) => {
  if (file) {
    return (
      <div>
        <div>
          <img src={imageSrc} alt="upload preview" />
        </div>
        <div>
          <FileData file={file} />
        </div>
      </div>
    );
  }
};

const fileTest = () => {
  const [fileError, setFileError] = useState();
  const [imgSrc, setImgSrc] = useState();
  const maxImageSize = 1000000;
  const acceptedFileTypes =    'image/x-png, image/png, image/jpg, image/jpeg, image/gif, image/svg';
  const acceptedFileTypesArray = acceptedFileTypes
    .split(',')
    .map(item => item.trim());

  const handleRejectedFiles = files => {
    if (files && files.length) {
      const currentFile = files[0];
      const currentfileType = currentFile.type;
      const currentFileSize = currentFile.size;
      if (currentFileSize > maxImageSize) {
        setFileError(
          `Sorry, the file is larger than the max size of ${maxImageSize
            / 100000}Mb`,
        );
      }
      if (!acceptedFileTypesArray.includes(currentfileType)) {
        setFileError('Sorry, this type of file is not supported');
      }
    }
  };

  const onDrop = useCallback((files, rejectedFiles) => {
    console.log(files, rejectedFiles);
    // handle rejected files
    if (rejectedFiles && rejectedFiles.length) {
      return handleRejectedFiles(rejectedFiles);
    }

    // handle accepted files
    if (files && files.length) {
      const currentFile = files[0];
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          setImgSrc(reader.result);
        },
        false,
      );
      reader.readAsDataURL(currentFile);
    }
    console.log('File accepted', files);
  }, []);

  const dropOptions = {
    onDrop,
    maxSize: maxImageSize,
    accept: acceptedFileTypes,
    multiple: false,
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone(
    dropOptions,
  );

  return (
    <CenterContainer>
      {imgSrc && (
        <div style={{ maxWidth: '800px', maxheight: '800px' }}>
          <img
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
            }}
            src={imgSrc}
            alt="upload preview"
          />
        </div>
      )}
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
        {fileError && <p style={{ color: 'red' }}>{fileError}</p>}
      </div>
    </CenterContainer>
  );
};

export default fileTest;
