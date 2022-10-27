import React, {
  createContext,
  ReactElement,
  ReactNode,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

import {
  socketClient,
  SocketClientInterface,
  SocketClientProps,
} from "src/utils/socket-client.util";
import { ChatSocket } from "src/utils/chat-socket.util";

export interface SocketContextInterface {
  socket: SocketClientInterface | null;
}

export const SocketContext = createContext<SocketContextInterface | null>(null);

export interface ChatProviderPropsInterface extends SocketClientProps {
  children?: ReactNode;
}

export const SocketProvider = (
  props: ChatProviderPropsInterface
): ReactElement => {
  const { children, ...rest } = props;

  const [socket, setSocket] = useState<SocketClientInterface | null>(null);

  useLayoutEffect(function windowIsReady() {
    if (socket) {
      return;
    }

    const clientProps: SocketClientProps = {
      ...rest,
    };

    const client = socketClient(clientProps);

    setSocket(client);
  }, []);

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
