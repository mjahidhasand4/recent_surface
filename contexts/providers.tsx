import { MediaLibraryProvider } from ".";

interface Props {
  children: React.ReactNode;
}

export const Providers: React.FC<Props> = (props) => {
  return <MediaLibraryProvider>{props.children}</MediaLibraryProvider>;
};
