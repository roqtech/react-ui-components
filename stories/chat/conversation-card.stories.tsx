import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { ChatConversationCard } from "../../src";

export default {
  title: "Roq Components/Chat/Conversation Card",
  component: ChatConversationCard,
  argTypes: {
    lastMessage: { control: "string" },
  },
} as ComponentMeta<typeof ChatConversationCard>;

const Template: ComponentStory<typeof ChatConversationCard> = (args) => (
  <div style={{ width: 320 }}>
    <ChatConversationCard {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: "Chat",
  date: "2 minutes ago",
  message: `Hi! How it's going?`,
  members: [
    { name: "Mose Ewald", src: "https://i.pravatar.cc/60?img=15" },
    { name: "Susan Gomez", src: "https://i.pravatar.cc/60?img=1" },
    { name: "Piper Wong", src: "https://i.pravatar.cc/60?img=14" },
    { name: "Jared Brewer", src: "https://i.pravatar.cc/60?img=12" },
  ],
};

// const StyledTailwindText = (props) => {
//   return (
//     <StackedText
//       {...props}
//       classNames={{
//         ...props.classNames,
//         text: "font-semibold",
//         primaryText: "group-hover:text-blue-100",
//         secondaryText: "group-hover:text-blue-200",
//       }}
//     />
//   );
// };

// export const WithTailwind = Template.bind({});
// WithTailwind.args = {
//   title: "Chat",
//   date: "2 minutes ago",
//   message: `Hi! How it's going?`,
//   members: [
//     { name: "Mose Ewald", src: "https://i.pravatar.cc/60?img=15" },
//     { name: "Susan Gomez", src: "https://i.pravatar.cc/60?img=1" },
//     { name: "Piper Wong", src: "https://i.pravatar.cc/60?img=14" },
//     { name: "Jared Brewer", src: "https://i.pravatar.cc/60?img=12" },
//   ],
//   classNames: {
//     container:
//       "hover:bg-blue-500 hover:ring-blue-500 hover:shadow-md group rounded-md p-3 bg-white ring-1 ring-slate-200 shadow-sm",
//     message: "group-hover:text-white font-normal text-slate-900",
//   },
//   components: {
//     Title: StyledTailwindText,
//   },
// };

// const MuiTitle = (props) => {
//   return (
//     <StackedText
//       {...props}
//       components={{
//         ...props?.components,
//         primaryText: (p) => <MuiTypography {...p} variant="body1" />,
//         secondaryText: (p) => <MuiTypography {...p} variant="subtitle2" bold />,
//       }}
//     />
//   );
// };

// const MuiMessage = (props) => (
//   <MuiTypography {...props} variant="overline" display="block" gutterBottom />
// );

// const WithMuiCard = (props) => <MuiCard {...props} sx={{ padding: 0 }} />;

// export const WithMui = Template.bind({});
// WithMui.args = {
//   title: "Chat",
//   date: "2 minutes ago",
//   message: `Hi! How it's going?`,
//   theme: "none",
//   members: [
//     { name: "Mose Ewald", src: "https://i.pravatar.cc/60?img=15" },
//     { name: "Susan Gomez", src: "https://i.pravatar.cc/60?img=1" },
//     { name: "Piper Wong", src: "https://i.pravatar.cc/60?img=14" },
//     { name: "Jared Brewer", src: "https://i.pravatar.cc/60?img=12" },
//   ],
//   // style: { boxShadow: "none" },
//   components: {
//     Container: WithMuiCard,
//     Inner: MuiCardContent,
//     Top: MuiBox,
//     Title: MuiTitle,
//     Message: MuiMessage,
//   },
// };

// const AntdTitle = (props) => {
//   return (
//     <StackedText
//       {...props}
//       components={{
//         ...props?.components,
//         primaryText: (p) => <AntdTypography.Title {...p} level={5} />,
//         secondaryText: (p) => <AntdTypography.Text {...p} type="secondary" />,
//       }}
//     />
//   );
// };

// const AntdMessage = (props) => <AntdTypography.Text {...props} italic />;

// const WithAntdCard = (props) => <AntdCard {...props} hoverable />;

// export const WithAntd = Template.bind({});
// WithAntd.args = {
//   title: "Chat",
//   date: "2 minutes ago",
//   message: `Hi! How it's going?`,
//   theme: "none",
//   style: { boxShadow: "none" },
//   members: [
//     { name: "Mose Ewald", src: "https://i.pravatar.cc/60?img=15" },
//     { name: "Susan Gomez", src: "https://i.pravatar.cc/60?img=1" },
//     { name: "Piper Wong", src: "https://i.pravatar.cc/60?img=14" },
//     { name: "Jared Brewer", src: "https://i.pravatar.cc/60?img=12" },
//   ],
//   components: {
//     Container: WithAntdCard,
//     Title: AntdTitle,
//     Message: AntdMessage,
//   },
// };
