import React, { ButtonHTMLAttributes, ComponentType, DetailedHTMLProps, ReactElement, ReactNode } from 'react';
import { Drawer } from 'src/components/common/drawer';
import clsx, { ClassValue } from 'clsx';
import './confirmation-drawer.scss';
import { ArrowRightIcon } from 'src/components/icons';
import { DrawerPropsInterface } from 'src/components/common/drawer/drawer.component';
import { HTMLComponentType } from 'src/interfaces';

export interface ConfirmationDrawerPropsInterface {
  isVisible: boolean;
  title?: string | ReactNode;
  message?: string | ReactNode;
  cancelButtonProps: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
  confirmButtonProps: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
  onClose?: () => void;
  classNames?: {
    container?: ClassValue,
    backIconWrapper?: ClassValue,
    backIcon?: ClassValue,
    title?: ClassValue,
    message?: ClassValue,
    buttonRow?: ClassValue,
    cancelButton?: ClassValue,
    confirmButton?: ClassValue,
  },
  components?: {
    drawer?: ComponentType<DrawerPropsInterface>,
    container?: HTMLComponentType<HTMLDivElement>,
    backIconWrapper?: HTMLComponentType<HTMLSpanElement>
    backIcon?: HTMLComponentType<React.SVGProps<HTMLOrSVGElement>>,
    title?: HTMLComponentType<HTMLHeadingElement>,
    message?: HTMLComponentType<HTMLParagraphElement>,
    buttonRow?: HTMLComponentType<HTMLDivElement>,
    cancelButton?: HTMLComponentType<HTMLButtonElement>,
    confirmButton?: HTMLComponentType<HTMLButtonElement>,
  }
}

export const _CLASS_IS = 'roq-confirm-drawer'

export const ConfirmationDrawer = (props: ConfirmationDrawerPropsInterface): ReactElement => {
  const {
    isVisible,
    title,
    message,
    onClose,
    cancelButtonProps,
    confirmButtonProps,
    classNames,
    components
  } = props;

  const DrawerComponent = components?.drawer || Drawer;
  const Container = components?.container || 'div';
  const BackIconWrapper = components?.backIconWrapper || 'span';
  const BackIcon = components?.backIconWrapper || ArrowRightIcon;
  const Title = components?.title || 'h2';
  const Message = components?.message || 'p';
  const Row = components?.buttonRow || 'div';
  const CancelButton = components?.cancelButton || 'button';
  const ConfirmButton = components?.confirmButton || 'button';

  return (
      <DrawerComponent
          isVisible={isVisible}
      >
        <Container className={clsx(_CLASS_IS, classNames?.container)}>
          {
              onClose && (
                  <BackIconWrapper
                      className={clsx(`${_CLASS_IS}-back-icon-wrapper`, classNames?.backIconWrapper)}
                  >
                    <BackIcon
                        onClick={onClose}
                        className={clsx(`${_CLASS_IS}-back-icon`, classNames?.backIcon)}
                    />
                  </BackIconWrapper>
              )
          }
          {title && (
              <Title className={clsx(`${_CLASS_IS}-title`, `${_CLASS_IS}-h-4`, classNames?.title)}>
                {title}
              </Title>
          )}
          <Message className={clsx(`${_CLASS_IS}-message`, `${_CLASS_IS}-body-2`, classNames?.message)}>
            {message}
          </Message>

          <Row className={clsx(`${_CLASS_IS}-button-row`, classNames?.buttonRow)}>
            <CancelButton
                {...cancelButtonProps}
                className={clsx(`${_CLASS_IS}-button`, `${_CLASS_IS}-button-text`, classNames?.cancelButton, cancelButtonProps.className)}/>
            <ConfirmButton
                {...confirmButtonProps}
                className={clsx(`${_CLASS_IS}-button`, `${_CLASS_IS}-button-primary`, classNames?.confirmButton, confirmButtonProps.className)}
            />
          </Row>
        </Container>
      </DrawerComponent>
  );
};
