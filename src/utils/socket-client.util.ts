import isEmpty from "lodash/isEmpty";
import { io, Socket, ManagerOptions } from "socket.io-client";

const DEFAULT_SOCKET_PATH = "socket.io";
const DEFAULT_NAMESPACE = "messageCenter";

export interface SocketClientInterface extends Socket {}

export interface SocketClientProps {
  secure?: boolean;
  platformToken: string;
  platformUrl?: string;
  path?: string;
  url?: string;
  namespace?: string;

  transports?: ManagerOptions["transports"];
  autoConnect?: ManagerOptions["autoConnect"];
  forceNew?: ManagerOptions["forceNew"];
  reconnection?: ManagerOptions["reconnection"];
  reconnectionDelay?: ManagerOptions["reconnectionDelay"];
  reconnectionAttempts?: ManagerOptions["reconnectionAttempts"];
  withCredentials?: ManagerOptions["withCredentials"];
}

export const socketClient = (
  props: SocketClientProps
): SocketClientInterface => {
  const {
    secure,
    platformToken,
    platformUrl,
    url,
    path = DEFAULT_SOCKET_PATH,
    namespace = DEFAULT_NAMESPACE,
    transports = ["polling", "websocket"],
    autoConnect = false,
    forceNew = true,
    reconnection = true,
    reconnectionDelay = 3000,
    reconnectionAttempts = Infinity,
    withCredentials = false,
  } = props;

  if (isEmpty(url) && isEmpty(platformUrl)) {
    throw Error(
      "To use Socket Client you must provide valid platformUrl or url "
    );
  }

  const socketUrl = new URL(url ?? `${platformUrl}${path}`);

  return io(`${socketUrl.origin}/${namespace}`, {
    secure,
    path: socketUrl.pathname,
    transports,
    autoConnect,
    forceNew,
    reconnection,
    reconnectionDelay,
    reconnectionAttempts,
    withCredentials,
    extraHeaders: {
      PlatformToken: platformToken,
    },
  });
};
