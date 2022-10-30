import React from "react";
import { SocketContext } from "./socket-provider";

export const useSocket = () => {
  const ctx = React.useContext(SocketContext);

  if (!ctx) {
    throw new Error("useSocket must be used within the SocketProvider");
  }

  return ctx;
};
