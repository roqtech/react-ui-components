import "./locale-settings.scss";

import clsx from "classnames";
import React, { CSSProperties, ComponentType, HTMLAttributes } from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { useRoqTranslation } from "src/components/core/roq-provider";
import { Panel } from "src/components";
import { LocaleLanguageSelect } from "../locale-language-select";
import { LocaleTimezoneSelect } from "../locale-timezone-select";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "locale-settings";

export interface LocaleSettingsPropsInterface {
  showTitle?: boolean;
  title?: string;

  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    title?: string;
    content?: string;
    fieldset?: string;
    languageSelect?: string;
    timezoneSelect?: string;
  };
  components?: {
    Container?: ComponentType<
      Pick<HTMLAttributes<HTMLElement>, "className" | "style">
    >;
    Title?: ComponentType<Pick<HTMLAttributes<HTMLElement>, "className">>;
    Content?: ComponentType<Pick<HTMLAttributes<HTMLElement>, "className">>;
    FieldSet?: ComponentType<Pick<HTMLAttributes<HTMLElement>, "className">>;
    LanguageSelect?: ComponentType<
      Pick<HTMLAttributes<HTMLElement>, "className">
    >;
    TimezoneSelect?: ComponentType<
      Pick<HTMLAttributes<HTMLElement>, "className">
    >;
  };
}

export const LocaleSettings = (props: LocaleSettingsPropsInterface) => {
  const { t } = useRoqTranslation();
  const { style, className, classNames, components, ...rest } = props;
  const { showTitle = true, title } = rest;

  const Container = components?.Container ?? Panel;
  const Title = components?.Title ?? "div";
  const Content = components?.Content ?? "div";
  const FieldSet = components?.FieldSet ?? "div";
  const LanguageSelect = components?.LanguageSelect ?? LocaleLanguageSelect;
  const TimezoneSelect = components?.TimezoneSelect ?? LocaleTimezoneSelect;

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      {showTitle && (
        <Title className={clsx(_CLASS_IS + "__title", classNames?.title)}>
          {title ?? t("locale.settings.title")}
        </Title>
      )}
      <Content className={clsx(_CLASS_IS + "__content", classNames?.content)}>
        <FieldSet
          className={clsx(
            _CLASS_IS + "__content" + "__fieldset",
            classNames?.fieldset
          )}
        >
          <LanguageSelect
            className={clsx(
              _CLASS_IS + "__content" + "__fieldset" + "__language-select",
              classNames?.languageSelect
            )}
          />
        </FieldSet>
        <FieldSet
          className={clsx(
            _CLASS_IS + "__content" + "__fieldset",
            classNames?.fieldset
          )}
        >
          <TimezoneSelect
            className={clsx(
              _CLASS_IS + "__content" + "__fieldset" + "__timezone-select",
              classNames?.timezoneSelect
            )}
          />
        </FieldSet>
      </Content>
    </Container>
  );
};
