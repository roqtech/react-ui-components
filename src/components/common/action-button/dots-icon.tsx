import * as React from "react";

export const DotsIcon = (props) => (
  <svg
    width={18}
    height={4}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {" "}
    <g fill="currentColor" fillRule="evenodd">
      <path
        d="M2 2h.01H2Zm7 0h.01H9Zm7 0h.01H16ZM3 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0v0Zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0v0Zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0v0Z"
        stroke="#64748B"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
