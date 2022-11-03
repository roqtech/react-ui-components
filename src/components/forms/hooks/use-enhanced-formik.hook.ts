import { FormikConfig, FormikErrors, FormikHelpers, FormikState, FormikTouched, FormikValues, useFormik } from 'formik';
import { useFormErrors } from 'src/components/forms/hooks/use-form-errors.hook';
import { ChangeEvent, SetStateAction, useCallback } from 'react';

export interface SubmitStateInterface {
  success: boolean;
  error?: { message: string };
}

export interface UseEnhancedFormikInterface<Values  extends FormikValues = FormikValues> extends ReturnType<typeof useFormik<Values>> {
  initialValues: Values;
  handleChange: {
    (e: ChangeEvent<any>): void;
    <T_1 = string | ChangeEvent<any>>(field: T_1): T_1 extends ChangeEvent<any>
        ? void
        : (e: string | ChangeEvent<any>) => void;
  };
  resetForm: (nextState?: Partial<FormikState<Values>> | undefined) => void;
  setErrors: (errors: FormikErrors<Values>) => void;
  setFormikState: (stateOrCb: FormikState<Values> | ((state: FormikState<Values>) => FormikState<Values>)) => void;
  setFieldTouched: (
      field: string,
      touched?: boolean,
      shouldValidate?: boolean | undefined,
  ) => Promise<FormikErrors<Values>> | Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined,
  ) => Promise<FormikErrors<Values>> | Promise<void>;
  setFieldError: (field: string, value: string | undefined) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  setTouched: (
      touched: FormikTouched<Values>,
      shouldValidate?: boolean | undefined,
  ) => Promise<FormikErrors<Values>> | Promise<void>;
  setValues: (
      values: SetStateAction<Values>,
      shouldValidate?: boolean | undefined,
  ) => Promise<FormikErrors<Values>> | Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitForm: () => Promise<any>;
  validateForm: (values?: Values) => Promise<FormikErrors<Values>>;
  dirty: boolean;
  values: Values;
  errors: FormikErrors<Values>;
  touched: FormikTouched<Values>;
  visibleErrors: FormikErrors<Values>;
  status?: SubmitStateInterface;
  setStatus: (status: SubmitStateInterface) => void;
  resetStatus: () => void;
}

export interface EnhancedFormikConfig<Values> extends FormikConfig<Values> {
  onSubmitSuccess?: (result: unknown, values: Values) => void;
  onSubmitError?: (error: any) => void;
}

export const useEnhancedFormik = <Values extends FormikValues = FormikValues>(
    config: EnhancedFormikConfig<Values>,
): UseEnhancedFormikInterface<Values> => {
  const onSubmit = useCallback(
      async (values: Values, actions: FormikHelpers<Values>) => {
        try {
          actions.setStatus(null);
          const result = await config.onSubmit(values, actions);
          actions.setStatus({ success: true });
          config.onSubmitSuccess?.(result, values);
          return result;
        } catch (error) {
          actions.setSubmitting(false);
          actions.setStatus({ success: false, error });
          config.onSubmitError?.(error);
        }
      },
      [config.onSubmit, config.onSubmitSuccess, config.onSubmitError],
  );

  const formik = useFormik({
    ...config,
    onSubmit,
  });

  const resetStatus = useCallback(() => {
    formik.setStatus(null);
  }, [formik.setStatus]);

  const visibleErrors = useFormErrors(formik);

  return {
    ...formik,
    resetStatus,
    visibleErrors: visibleErrors as FormikErrors<Values>,
  };
};
