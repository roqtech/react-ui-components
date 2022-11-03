interface ClientValidationErrorInterface {
  message?: string;
  variables?: Record<string | number | symbol, unknown>;
}

export class ClientValidationError extends Error {
  variables: ClientValidationErrorInterface['variables']

  constructor(options: ClientValidationErrorInterface) {
    const { variables, message } = options;
    super(message);
    this.variables = variables;
  }
}
