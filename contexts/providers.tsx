import { FileManagerProvider } from ".";

interface Props {
  children: React.ReactNode;
}

export const Providers: React.FC<Props> = (props) => {
  return <FileManagerProvider>{props.children}</FileManagerProvider>;
};