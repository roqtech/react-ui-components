import { useRoqComponents } from "src/components/core/roq-provider";
import { IRequest, request } from "src/utils";

export const useRoqRequest = (
  args: Omit<IRequest, "url">,
  dataPath: string = ""
) => {
  const { token, host: url } = useRoqComponents();
  return request({
    ...args,
    url,
    headers: {
      ...args.headers,
      "roq-platform-authorization": token as string,
    },
  });
};
