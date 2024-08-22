import { File } from '@/types';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import React from 'react';

type FileCollectionImageProps = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  uploaderClassName: string;
  uploaderName: string;
};

export const UploaderImages = ({
  files,
  setFiles,
  uploaderClassName,
  uploaderName,
}: FileCollectionImageProps) => {
  const handleChangeEvent = (items: any) => {
    setFiles([...items.allEntries.filter((file: File) => file.status === 'success')]);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 text-sm opacity-70">
        <div className="flex flex-col gap-1">
          <span className="font-bold opacity-65">(Optional)</span>
          <p className="font-semibold">Upload a cover image for your {uploaderName}</p>
        </div>
        <FileUploaderRegular
          pubkey="0407729b2887e266d3b0"
          maxLocalFileSizeBytes={5000000}
          multiple={false}
          imgOnly={true}
          onChange={handleChangeEvent}
          sourceList="local, url, camera"
          classNameUploader={`my-config ${uploaderClassName}`}
        />
      </div>
      <div>
        {files.map((file) => (
          <div className="overflow-hidden rounded-lg" key={file.uuid}>
            <img src={file.cdnUrl} alt={file.fileInfo.originalFilename} />
          </div>
        ))}
      </div>
    </div>
  );
};
