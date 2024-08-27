import { Button, Input, Portal, Switch } from ".";

export const CreateFolder = () => {
  return (
    <Portal>
      <div className="overlay">
        <form className="folder">
          <h1>New Folder</h1>
          <Input name="name" title="Name" />
          <div className="container switch">
            <label htmlFor="status">Private</label>
            <Switch />
          </div>
          <div className="container switch">
            <label htmlFor="status">Shareable</label>
            <Switch />
          </div>
          <Button text="Continue" />
        </form>
      </div>
    </Portal>
  );
};
