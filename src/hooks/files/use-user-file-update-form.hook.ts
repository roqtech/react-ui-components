import { useCallback, useMemo } from 'react';
import { FileInterface } from 'src/interfaces';
import { useEnhancedFormik, UseEnhancedFormikInterface } from 'src/components/forms/hooks';
import { useUpdateFileMutation } from 'src/lib/graphql/hooks/generated';
import { getFileExtension } from 'src/utils';
import { useUserFileEditFormSchema } from 'src/hooks/files/use-user-file-edit-form-schema.hook';

export interface EditUserFormValuesInterface {
    name: string;
}

export const useUserFileUpdateForm = (file: FileInterface): UseEnhancedFormikInterface<EditUserFormValuesInterface> => {
    const [updateFile] = useUpdateFileMutation();
    const fileExtension = getFileExtension(file.name);
    const fileNameWithoutExtension = file.name.replace(`.${fileExtension}`, '');

    const initialValues = useMemo(
        () => ({
            name: fileNameWithoutExtension,
        }),
        [],
    );

    const onSubmit = useCallback(
        async (formValues, actions) => {
            // the file name being rendered in text field is without extension, so before we
            // submit back the updated file name, we need to append the file extension again
            const result = await updateFile({
                variables: {
                    id: file.id,
                    updateFileDto: { name: `${formValues?.name}.${fileExtension}` },
                }
            });
            actions.resetForm({
                values: {
                    name: formValues?.name,
                },
            });
            return result;
        },
        [file?.id, updateFile],
    );

    return useEnhancedFormik<EditUserFormValuesInterface>({
        initialValues,
        onSubmit,
        enableReinitialize: true,
        validationSchema: useUserFileEditFormSchema(),
    });
};
