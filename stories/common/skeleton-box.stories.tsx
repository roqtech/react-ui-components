import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SkeletonBox } from 'src/components/common/skeleton-box';

export default {
    title: 'Roq Components/Common/SkeletonBox',
    component: SkeletonBox,
} as ComponentMeta<typeof SkeletonBox>;

let Template: ComponentStory<typeof SkeletonBox> = (args) => (
    <SkeletonBox {...args}/>
);

export const Default = Template.bind({});

Default.args = {
    rows: 5,
};


Template = (args) => (
    <SkeletonBox {...args}/>
);

export const Customized = Template.bind({});

Customized.args = {
    rows: 5,
    width: '50%',
    height: '2em'
};

Template = (args) => (
    <>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '10%' }}>
                <SkeletonBox height="8em"/>
            </div>
            <div style={{ width: '90%', marginLeft: '1em', marginTop: '1em' }}>
                <SkeletonBox width="20%" height="1.4em"/>
                <SkeletonBox height="1em" rows={2}/>
                <SkeletonBox width="80%" height="1em"/>
            </div>
        </div>
        <SkeletonBox  {...args} />

    </>
);

export const WithAvatar = Template.bind({});

WithAvatar.args = {
    rows: 5,
};
