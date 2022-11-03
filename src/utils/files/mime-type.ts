import mime from 'mime';

export const getFileType = (file: File): string => {
  /**
   * Get the type form file object if not available then get type using extension
   */
  if (file?.type) {
    return file.type
  }

  const type = file.name.split('.').pop();
  return mime.getType(type);
};

// @ts-ignore
export const getFileExtension = (fileName: string): string => fileName.split('.').pop();
