import React, {
  createContext,
  ReactElement,
  ReactNode,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

import { useRoqComponents } from "src/components/core/roq-provider";
import {
  SocketClientInterface,
  SocketClientProps,
  socketClient,
} from "src/utils/socket-client.util";

export interface SocketContextInterface {
  socket: SocketClientInterface | null;
}

export const SocketContext = createContext<SocketContextInterface | null>(null);

export interface ChatProviderPropsInterface
  extends Pick<SocketClientProps, "secure"> {
  children?: ReactNode;
}

export const SocketProvider = (
  props: ChatProviderPropsInterface
): ReactElement => {
  const { children, ...rest } = props;

  const { platformChat, token } = useRoqComponents();

  const [socket, setSocket] = useState<SocketClientInterface | null>(null);

  useLayoutEffect(
    function windowIsReady() {
      if (!token) {
        return;
      }

      if (socket) {
        return;
      }

      const clientProps: SocketClientProps = {
        ...rest,
        platformToken: token,
        platformUrl: platformChat,
      };

      const client = socketClient(clientProps);

      setSocket(client);
    },
    [token, platformChat]
  );

  const value = useMemo<SocketContextInterface>(
    () => ({
      socket,
    }),
    [socket]
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

SocketProvider.displayName = "SocketProvider";
