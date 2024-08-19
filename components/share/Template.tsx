import { SideBar } from ".";

interface Props {
  children: React.ReactNode;
}

export const Template: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <>
      <SideBar />
      {children}
    </>
  );
};