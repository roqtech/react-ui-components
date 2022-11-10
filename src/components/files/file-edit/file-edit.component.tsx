import React from 'react';
import { FileEditPropsInterface } from 'src/components/files/file-edit/file-edit.interface';
import { FileEditFormActionOverlay } from 'src/components/files/file-edit/file-edit-form-action-overlay.component';
import { useFileQuery } from 'src/lib/graphql/hooks/generated';

export const FileEditComponent = (props: FileEditPropsInterface) => {
    const { fileId } = props;
    const { data, loading } = useFileQuery({
        variables: { fileId }
    });
    if (!data?.file) {
        return null;
    }

    return <FileEditFormActionOverlay file={data?.file} isLoading={loading} {...props} />;
};
