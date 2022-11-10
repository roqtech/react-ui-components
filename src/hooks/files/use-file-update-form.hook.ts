import { useCallback, useMemo } from 'react';
import { FileInterface } from 'src/interfaces';
import { useEnhancedFormik, UseEnhancedFormikInterface } from 'src/components/forms/hooks';
import { getFileExtension } from 'src/utils';
import { useFileEditFormSchema } from 'src/hooks/files/use-file-edit-form-schema.hook';
import { useUpdateFileMutation } from 'src/lib/graphql/hooks/generated';

export interface EditFileFormValuesInterface {
    name: string;
}

export interface UseFileUpdateFormOptions {
    file: Pick<FileInterface, 'name' | 'id'>
    onSuccess?: (file) => void;
    onError?: (err: Error) => void;
}

export const useFileUpdateForm = (props: UseFileUpdateFormOptions): UseEnhancedFormikInterface<EditFileFormValuesInterface> => {
    const {
        file,
        onError,
        onSuccess
    } = props;
    const [updateFile] = useUpdateFileMutation({
        context: { service: 'platform' }
    });
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
            try {
                // the file name being rendered in text field is without extension, so before we
                // submit back the updated file name, we need to append the file extension again
                const result = await updateFile({
                    variables: { id: file.id, updateFileDto: { name: `${formValues?.name}.${fileExtension}` } }
                }).catch(onError);
                const data = result?.data?.updateFile;
                if (data) {
                    actions.resetForm({
                        values: {
                            name: formValues?.name,
                        },
                    });
                    onSuccess && onSuccess(data);
                }
                return data;
            } catch (e) {
                onError && onError(e as Error);
            }
        },
        [file?.id, updateFile, onSuccess, onError],
    );

    return useEnhancedFormik<EditFileFormValuesInterface>({
        initialValues,
        onSubmit,
        enableReinitialize: true,
        validationSchema: useFileEditFormSchema(),
    });
};
