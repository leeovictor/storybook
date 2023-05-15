import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'examples/Button with Meta Subtitle in Both',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    // Stop *this* story from being stacked in Chromatic
    theme: 'default',
    // this is to test the deprecated features of the Subtitle block
    componentSubtitle: 'This subtitle is set in parameters.componentSubtitle',
    docs: {
      subtitle: 'This subtitle is set in parameters.docs.subtitle',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithMetaSubtitleInBoth: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};
