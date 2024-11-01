import type { Meta, StoryObj } from "@storybook/react";
import CopyToClipboardButton from "../components/buttons/CopyToClickboardButton";

const meta: Meta<typeof CopyToClipboardButton> = {
    component: CopyToClipboardButton,
};

export default meta;

type Story = StoryObj<typeof CopyToClipboardButton>;

export const Primary: Story = {
    args: {},
};
