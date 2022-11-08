import { SelectOptionInterface } from "../common.interface";

export type LocaleTranslationFunctionInterface = (
  key: string,
  defaultValue?: string
) => string;

export interface LocaleLanguageInterface extends SelectOptionInterface {}

export type LocaleTimzeoneInterface = string;
