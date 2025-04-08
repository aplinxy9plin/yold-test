import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ImageIcon } from "react-line-awesome";
import { Avatar } from "@/components/ui/Avatar";
import React from "react";

const Components = () => {
  return (
    <div className="flex-col space-y-4 p-4 w-full">
      <Button>Primary</Button>
      <Button before={<ImageIcon />}>Before</Button>
      <Button after={<ImageIcon />}>After</Button>
      <Button before={<ImageIcon />} after={<ImageIcon />}>
        Before and After
      </Button>
      <Button disabled>Disabled primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondary" disabled>
        Disabled secondary
      </Button>
      <div className="flex flex-col gap-2">
        <Input placeholder="Input" />
        <Input placeholder="Input error" error />
        <Input placeholder="Input before" before={<ImageIcon />} />
        <Input placeholder="Input after" after={<ImageIcon />} />
        <Input
          placeholder="Input before and after"
          before={<ImageIcon />}
          after={<ImageIcon />}
        />
        <Input placeholder="Disabled" disabled />
      </div>
      <Avatar size="big" image="/default-avatar.png" username="John Doe" />
      <Avatar size="mini" image="/default-avatar.png" username="John Doe" />
      <Avatar size="big" username="John Doe" />
      <Avatar size="mini" username="John Doe" />
    </div>
  );
};

export default Components;
