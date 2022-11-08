import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { LocaleSettings } from "../../src";

export default {
  title: "Roq Components/Locale/LocaleSettings",
  component: LocaleSettings,
  argTypes: {},
  decorators: [
    (Story) => {
      return (
        <div style={{ width: 500 }}>
          {Story()}
        </div>
      );
    },
  ],
} as ComponentMeta<typeof LocaleSettings>;

const Template: ComponentStory<typeof LocaleSettings> = (args) => (
  <LocaleSettings {...args} />
);

export const Widget = Template.bind({});
Widget.args = {};
