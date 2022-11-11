import mime from 'mime';

export const getFileType = (file: File | string): string => {
  /**
   * Get the type form file object if not available then get type using extension
   */
  if (!file) {
    return file;
  }
  if (typeof file !== 'string' && file?.type) {
    return file.type
  }
  return mime.getType(getFileExtension(typeof file === 'string' ? file : file.name));
};

// @ts-ignore
export const getFileExtension = (fileName: string): string => fileName.split('.').pop();
