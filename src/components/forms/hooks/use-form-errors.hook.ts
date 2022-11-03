import { FormikErrors } from 'formik';
import { FormikTouched } from 'formik/dist/types';
import { useMemo, useState } from 'react';

export type UseFormErrorsParams<Values> = {
  initialValues: Values;
  values: Partial<Values>;
  errors: FormikErrors<Values>;
  touched: FormikTouched<Values>;
  submitCount: number;
}


function resolveEverChangedFieldsAndVisibleErrors<T>(
    value: T,
    initialValue: T,
    prevEverChanged: FormikTouched<T>,
    touched: FormikTouched<T>,
    error: FormikErrors<T>,
): [FormikTouched<T>, (FormikErrors<T> | undefined)] {
  if (typeof value === 'object' && value !== null) {
    if (Array.isArray(value)) {
      const arrayResult = value.map((v, idx) =>
          resolveEverChangedFieldsAndVisibleErrors(v, initialValue?.[idx], prevEverChanged?.[idx] || false, touched?.[idx], error?.[idx])
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const [formikTouched, formikErrors] = arrayResult.reduce((acc: [FormikTouched<any[]>, FormikErrors<any[]>], [itemChangedFields, itemErrors]) => {
        acc[0].push(itemChangedFields);
        acc[1].push(itemErrors);
        return acc;
      }, [[], []])
      return [formikTouched as unknown as FormikTouched<T>, formikErrors as unknown as FormikErrors<T>];
    }
    return Object.entries(value).reduce((acc: [FormikTouched<T>, FormikErrors<T>], [k, v]) => {
      const childResult = resolveEverChangedFieldsAndVisibleErrors(v, initialValue?.[k], prevEverChanged?.[k], touched?.[k], error?.[k]);
      acc[0][k] = childResult[0];
      if (childResult[1]) {
        acc[1][k] = childResult[1];
      }
      return acc;
    }, [{}, {}])
  }
  const everChanged = (Boolean(prevEverChanged) || (value !== initialValue)) as unknown as FormikTouched<T>;
  const visibleError = touched && everChanged ? error : undefined;

  return [everChanged, visibleError];
}

export const useFormErrors = <Values>(
    { initialValues, values, errors, submitCount, touched }: UseFormErrorsParams<Values>
): FormikErrors<Partial<Values>> | undefined => {
  const [everChangedFields, setEverChangedFields] = useState<FormikTouched<Partial<Values>>>({});

  return useMemo(() => {
    if (submitCount > 0) {
      return errors;
    }
    const [newEverChangedFields, visibleErrors] = resolveEverChangedFieldsAndVisibleErrors(
        values,
        initialValues,
        everChangedFields,
        touched,
        errors
    );
    setEverChangedFields(newEverChangedFields);
    return visibleErrors;
  }, [values, initialValues, errors, touched]);
}
