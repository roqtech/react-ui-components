import React, { SVGProps } from "react";

interface DefaultImageProps<T = SVGSVGElement> extends SVGProps<T> {}

export const DefaultImage = (props: DefaultImageProps) => (
  <svg
    viewBox="0 0 24 24"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="currentColor" fill-rule="evenodd">
      <circle cx={12} cy={8} r={4} />
      <path d="M12 14c-6.1 0-8 4-8 4v2h16v-2s-1.9-4-8-4z" />
    </g>
  </svg>
);
