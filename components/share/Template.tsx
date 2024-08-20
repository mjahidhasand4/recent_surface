import { Header, SideBar } from ".";
import { EditorHeader } from "@/components/headers";

interface Props {
  page?: "global" | "editor";
  children: React.ReactNode;
}

export const Template: React.FC<Props> = (props) => {
  const { page = "global", children } = props;

  return (
    <>
      {page === "global" && <Header />}
      {page === "editor" && <EditorHeader />}

      <SideBar />
      {children}
    </>
  );
};
