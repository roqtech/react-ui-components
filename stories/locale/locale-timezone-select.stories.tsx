import { ComponentMeta, ComponentStory } from "@storybook/react";

import React from "react";
import { LocaleTimezoneSelect } from "../../src";

export default {
  title: "Roq Components/Locale/LocaleTimezoneSelect",
  component: LocaleTimezoneSelect,
  argTypes: {},
  decorators: [
    (Story) => {
      return (
        <div style={{ width: 280 }}>
          <Story />
        </div>
      );
    },
  ],
} as ComponentMeta<typeof LocaleTimezoneSelect>;

const Template: ComponentStory<typeof LocaleTimezoneSelect> = (args) => (
  <LocaleTimezoneSelect {...args} />
);

export const Default = Template.bind({});
Default.args = {};
