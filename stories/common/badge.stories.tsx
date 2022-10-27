import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Badge } from "../../src";

export default {
  title: "Roq Components/Common/Badge",
  component: Badge,
  argTypes: {
    maxValue: { control: "number" },
  },
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => (
  <div style={{ position: "relative", width: 100 }}>
    <div
      style={{
        width: "32px",
        height: "32px",
      }}
    >
      <Badge {...args}>
        <div
          style={{
            width: "32px",
            height: "32px",
            display: "block",
            background: "white",
          }}
        />
      </Badge>
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  count: 2,
};

export const MaxValue = Template.bind({});
MaxValue.args = {
  count: 521,
  maxCount: 500,
};
