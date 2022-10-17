
import {
  gray,
  blue,
  red,
  green,
  grayDark,
  blueDark,
  redDark,
  greenDark,
} from '@radix-ui/colors';
import { createStitches } from '@stitches/react';

const { styled, theme, css, globalCss } = createStitches({
  theme: {
    colors: {
      ...gray,
      ...blue,
      ...red,
      ...green,
      ...grayDark,
      ...blueDark,
      ...redDark,
      ...greenDark,
    },
    fonts: {
      "main": '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol',
    }
  },
})

export { styled, theme, css }

export const globalStyles = globalCss({
  "html, body, div, button, span": {
    "font-family": '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  }
})
