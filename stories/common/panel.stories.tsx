import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Panel } from "../../src";

export default {
  title: "Roq Components/Common/Panel",
  component: Panel,
  argTypes: {},
} as ComponentMeta<typeof Panel>;

const Template: ComponentStory<typeof Panel> = (args) => (
  <div
    style={{ width: 600, height: 400, padding: 10, backgroundColor: "#f1f5f8" }}
  >
    <Panel {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: <div style={{}}>Inner content</div>,
};
