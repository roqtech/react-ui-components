import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo("en-US");

export const formatTimeAgo = (timestamp?: Date | number | string): string => {
  if (!timestamp) {
    return "";
  }

  return timeAgo.format(new Date(timestamp));
};
