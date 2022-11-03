import * as yup from 'yup';

export const useUserFileEditFormSchema = (): yup.AnyObjectSchema => {
  return yup.object({
    name: yup.string()
        .trim()
        .required('file.edit.validations.name.required')
        .max(255, 'file.edit.validations.name.max-length-exceeded')
        .matches(/^[^\\\/\:\*\?\"\<\>\|\.]+/, 'file.edit.validations.name.invalid-name')
  });
}
