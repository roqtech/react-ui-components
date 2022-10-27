interface IConfig {
  platform: {
    url: string;
    gql: string;
  };
  authorizationHeader: string
}

const PLATFORM_BASE_URL = 'https://roq-core-snapshot-gateway.roq-platform.com/v01'
export const config: IConfig = {
  platform: {
    url: PLATFORM_BASE_URL,
    gql: `${PLATFORM_BASE_URL}/server/graphql`,
  },
  authorizationHeader: 'roq-platform-authorization'
}
