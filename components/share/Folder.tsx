"use client";
import { DismissIcon } from "@/components/icons";
import { Button, Checkbox, Input, Portal } from ".";
import { useClickOutside } from "@/hooks/share";
import {CreateFolder as CreateDirectory} from "@/lib/play"

interface Props {
  closeBox: () => void;
}

export const CreateFolder: React.FC<Props> = (props) => {
  const { closeBox } = props;
  const ref = useClickOutside(closeBox);

  return (
    <Portal>
      <div className="overlay">
        <form action={async () => {
          await CreateDirectory("")
        }} ref={ref} className="folder">
          <div>
            <h1>New Folder</h1>
            <button onClick={closeBox}>
              <DismissIcon />
            </button>
          </div>
          <p>Make a new folder for file organization.</p>
          <Input name="name" title="Name" autoComplete="off" />
          <Checkbox name="private" title="Private" />
          <Button text="Continue" />
        </form>
      </div>
    </Portal>
  );
};
