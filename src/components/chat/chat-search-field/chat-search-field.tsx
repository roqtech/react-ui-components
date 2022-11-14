import "./chat-search-field.scss";

import clsx from "classnames";
import React, {
  CSSProperties,
  ComponentType,
  HTMLAttributes,
  useCallback,
  useState,
} from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { useRoqTranslation } from "src/components/core/roq-provider";
import { SearchIcon as DefaultLeftIcon } from "./search-icon";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-search-field";

export interface ChatSearchFieldPropsInterface {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: string;
  onSearch: (value: string) => void;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    icon?: string;
    input?: string;
  };
  components?: {
    Container?: ComponentType<HTMLAttributes<HTMLElement>>;
    LeftIcon?: ComponentType<HTMLAttributes<HTMLElement>>;
    Input?: ComponentType<HTMLAttributes<HTMLInputElement>>;
  };
}

export const ChatSearchField = (props: ChatSearchFieldPropsInterface) => {
  const { t } = useRoqTranslation();
  const { style, className, classNames, components, ...rest } = props;
  const { value, defaultValue, placeholder, onChange, onSearch } = rest;

  const Container = components?.Container ?? "form";
  const LeftIcon = components?.LeftIcon ?? DefaultLeftIcon;
  const Input = components?.Input ?? "input";

  const [searchValue, setSearchValue] = useState(value ?? defaultValue);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSearch?.(searchValue);
    },
    [onSearch, searchValue]
  );

  const hanldeInputChange = useCallback(() => {}, []);

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
      onSubmit={handleSubmit}
    >
      <LeftIcon className={clsx(_CLASS_IS + "__icon", classNames?.icon)} />
      <Input
        className={clsx(_CLASS_IS + "__input", classNames?.input)}
        value={searchValue}
        placeholder={placeholder ?? t("chat.sidebar.search")}
        onChange={hanldeInputChange}
      />
    </Container>
  );
};
