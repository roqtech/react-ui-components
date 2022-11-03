interface NetworkOfflineErrorInterface {
  message?: string;
}

export class NetworkOfflineError extends Error {
  constructor(
    options: NetworkOfflineErrorInterface = {
      message: 'NetworkOffline',
    },
  ) {
    const { message } = options;
    super(message);
  }
}
