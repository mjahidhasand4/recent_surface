import { Template } from "@/components/share";
import { CreateUser } from "@/lib/play";

const Home = async () => {
  // await CreateUser()
  return (
    <Template>
      <main className="homepage global">
        <div className="overlap"></div>
        <div className="overlap"></div>
      </main>
    </Template>
  );
};

export default Home;