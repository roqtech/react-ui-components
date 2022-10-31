interface IConfig {
  platform: {
    url: string;
    graphqlUri: string;
  };
  backend: {
    graphqlUri: string;
  };
  authorizationHeader: string
}

const PLATFORM_BASE_URL = 'https://roq-core-snapshot-gateway.roq-platform.com/v01'
export const config: IConfig = {
  platform: {
    url: PLATFORM_BASE_URL,
    graphqlUri: `${PLATFORM_BASE_URL}/server/graphql`,
  },
  backend: {
    graphqlUri: ''
  },
  authorizationHeader: 'roq-platform-authorization'
}
