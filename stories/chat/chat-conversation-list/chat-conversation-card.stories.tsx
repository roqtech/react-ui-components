import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChatConversationCard, ChatConversationCardForm } from "../../../src";

export default {
  title:
    "Roq Components/Chat/ChatSidebar/ChatConversationList/ChatConversations/ChatConversationCard",
  component: ChatConversationCard,
  argTypes: {
    lastMessage: { control: "text" },
  },
} as ComponentMeta<typeof ChatConversationCard>;

const Template: ComponentStory<typeof ChatConversationCard> = (args) => (
  <div style={{ width: 400 }}>
    <ChatConversationCard {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: "Chat",
  timestamp: new Date(),
  message: `Hi! How it's going?`,
  members: [
    { fullName: "Mose Ewald", avatar: "https://i.pravatar.cc/60?img=15" },
    { fullName: "Susan Gomez", avatar: "https://i.pravatar.cc/60?img=1" },
    { fullName: "Piper Wong", avatar: "https://i.pravatar.cc/60?img=14" },
    { fullName: "Jared Brewer", avatar: "https://i.pravatar.cc/60?img=12" },
  ],
};

export const WithUnreadMessages = Template.bind({});
WithUnreadMessages.args = {
  title: "Chat",
  timestamp: new Date(),
  unreadCount: 4,
  message: `Have you checked your box?`,
  members: [
    { fullName: "Piper Wong", avatar: "https://i.pravatar.cc/60?img=14" },
    { fullName: "Jared Brewer", avatar: "https://i.pravatar.cc/60?img=12" },
    { fullName: "Mose Ewald", avatar: "https://i.pravatar.cc/60?img=15" },
    { fullName: "Susan Gomez", avatar: "https://i.pravatar.cc/60?img=1" },
  ],
};

const MOCKED_CONVERSATION = {
  title: "Chat",
  timestamp: new Date(),
  message: `Have you checked your box?`,
  members: [
    { fullName: "Mose Ewald", avatar: "https://i.pravatar.cc/60?img=15" },
    { fullName: "Susan Gomez", avatar: "https://i.pravatar.cc/60?img=1" },
    { fullName: "Piper Wong", avatar: "https://i.pravatar.cc/60?img=14" },
    { fullName: "Jared Brewer", avatar: "https://i.pravatar.cc/60?img=12" },
  ],
};

export const EditForm = Template.bind({});
EditForm.args = {
  ...MOCKED_CONVERSATION,
  children: <ChatConversationCardForm initialValues={MOCKED_CONVERSATION} />,
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
//     { fullName: "Mose Ewald", avatar: "https://i.pravatar.cc/60?img=15" },
//     { fullName: "Susan Gomez", avatar: "https://i.pravatar.cc/60?img=1" },
//     { fullName: "Piper Wong", avatar: "https://i.pravatar.cc/60?img=14" },
//     { fullName: "Jared Brewer", avatar: "https://i.pravatar.cc/60?img=12" },
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
//     { fullName: "Mose Ewald", avatar: "https://i.pravatar.cc/60?img=15" },
//     { fullName: "Susan Gomez", avatar: "https://i.pravatar.cc/60?img=1" },
//     { fullName: "Piper Wong", avatar: "https://i.pravatar.cc/60?img=14" },
//     { fullName: "Jared Brewer", avatar: "https://i.pravatar.cc/60?img=12" },
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
//     { fullName: "Mose Ewald", avatar: "https://i.pravatar.cc/60?img=15" },
//     { fullName: "Susan Gomez", avatar: "https://i.pravatar.cc/60?img=1" },
//     { fullName: "Piper Wong", avatar: "https://i.pravatar.cc/60?img=14" },
//     { fullName: "Jared Brewer", avatar: "https://i.pravatar.cc/60?img=12" },
//   ],
//   components: {
//     Container: WithAntdCard,
//     Title: AntdTitle,
//     Message: AntdMessage,
//   },
// };
