import React from "react";
import { RoqProvider } from "../../src";
import { request } from "../../src/utils";

const roqIdentifier = 'b1effe50-226c-4a40-89b4-98500d49ceee'
const tenantId = '4b765d06-44af-47b7-aa03-34e3f3750641'
const apiKey = '16c0ce73-cb2a-4b41-86dc-1b66c8042bd1'
const host = 'https://www.story-cpd-1440-api-ig65eri-ycorogwwlxijw.de-2.platformsh.site/'
export const NotificationDecorator = (Story, context) => {
  const args = {
    roqIdentifier,
    tenantId,
    apiKey
  }

  const getToken = async () => {
    return request(
      {
        url: host + 'v01/authorize',
        body: args,
      },
      'accessToken',
    )
  };

  const config = {
    host,
    getToken,
  };

  return (
    <RoqProvider config={config}>
      {Story()}
    </RoqProvider>
  );
};
