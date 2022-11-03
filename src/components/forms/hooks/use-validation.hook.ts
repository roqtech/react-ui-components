import { useAsyncEffect } from 'src/hooks';
import { useMemo, useState } from 'react';
import { BaseSchema, ValidationError } from 'yup';

export interface ValidationRuleInterface {
  name: string;
  message: string;
}

export interface UseValidationParamsInterface {
  schema: BaseSchema;
  rules?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  label: string;
}

export const useValidation = (props: UseValidationParamsInterface): [ValidationRuleInterface[], ValidationError[]] => {
  const { schema, label, rules, value } = props
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])

  const validationRules = useMemo(() => schema.tests
      .map(x => x.OPTIONS)
      .filter(x => rules?.includes(x.name as string))
      .map(x =>
          ({
            name: x.name as string,
            message: ValidationError.formatError(x.message, { path: label }),
          })
      ), [schema, label, rules])

  useAsyncEffect(async () => {
    try {
      await schema.validate(value, { abortEarly: false })
      setValidationErrors([])
    } catch (err) {
      const validationError = err as ValidationError;
      setValidationErrors((validationError.inner || []).filter(x => !rules || rules.includes(x.type as string)))
    }
  }, [schema, value])

  return [
    validationRules,
    validationErrors,
  ];
};
