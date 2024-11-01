import type { Meta, StoryObj } from "@storybook/react";
import CopyToClipboardButton from "../components/buttons/CopyToClickboardButton";

const meta: Meta<typeof CopyToClipboardButton> = {
    title: "Components/Button",
    component: CopyToClipboardButton,
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: () => <CopyToClipboardButton />,
    args: {},
};
