"use client";
import { DismissIcon } from "@/components/icons";
import { Button, Checkbox, Input, Portal } from ".";
import { useClickOutside } from "@/hooks/share";
import { CreateFolder as CreateDirectory } from "@/lib/play";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  closeBox: () => void;
  parentId: string | null;
}

export const Folder: React.FC<Props> = ({ parentId, closeBox }) => {
  const ref = useClickOutside(closeBox);
  const queryClient = useQueryClient();

  const onSubmit = async (formData: FormData) => {
    try {
      await CreateDirectory(formData);

      // Invalidate the queries to refetch the folder data
      queryClient.invalidateQueries({
        queryKey: ["folder", parentId || "root"],
      });

      closeBox();
    } catch (error) {
      console.error("Failed to create folder:", error);
    }
  };

  return (
    <Portal>
      <div className="overlay">
        <form action={onSubmit} ref={ref} className="folder">
          <div>
            <h1>New Folder</h1>
            <button onClick={closeBox}>
              <DismissIcon />
            </button>
          </div>
          <p>Make a new folder for file organization.</p>
          <Input name="name" title="Name" autoComplete="off" />
          <Checkbox name="private" title="Private" />

          {/* Hidden input to include parentId */}
          <input type="hidden" name="parentId" value={parentId ?? ""} />

          <Button button="submit" text="Continue" />
        </form>
      </div>
    </Portal>
  );
};
