import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { LocaleLanguageSelect } from "../../src";

export default {
  title: "Roq Components/Locale/LocaleSettings/LocaleLanguageSelect",
  component: LocaleLanguageSelect,
  argTypes: {},
  decorators: [
    (Story) => {
      return <div style={{ width: 280 }}>{Story()}</div>;
    },
  ],
} as ComponentMeta<typeof LocaleLanguageSelect>;

const Template: ComponentStory<typeof LocaleLanguageSelect> = (args) => (
  <LocaleLanguageSelect {...args} />
);

export const Default = Template.bind({});
Default.args = {};
