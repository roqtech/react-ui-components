import axios from "axios";

export interface AuthorizeServiceAccountPropsInterface {
  platformUrl: string;
  tenantId: string;
  apiKey: string;
  serviceAccount: string;
}

export async function authorizeServiceAccount(
  props: AuthorizeServiceAccountPropsInterface
) {
  const { platformUrl, tenantId, apiKey, serviceAccount } = props;

  const client = axios.create({
    baseURL: platformUrl,
  });

  const response = await client
    .post("/authorize/serviceAccount", {
      tenantId: tenantId,
      apiKey: apiKey,
      email: serviceAccount,
    })
    .catch((err) => {
      throw new Error(err?.response?.data?.message);
    });

  return response.data.accessToken;
}
