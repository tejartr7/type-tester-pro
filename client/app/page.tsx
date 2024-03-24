import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import { Navbar } from "@/components/Navbar";
import { Timer } from "@/components/Timer";
import WordWrapperModal from "@/app/components/WordWrapperModal";

export default async function Index() {
  // const { systemTheme } = useThemeContext();
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="fixed top-0 left-0 right-0 z-10"></div>
        <main
          className=" mx-auto flex h-full max-w-5xl flex-col gap-4 px-4 xl:px-0"
          style={{}}
        >
          <Timer />
          <div className="flex justify-center">
            <WordWrapperModal />
          </div>
        </main>
      </div>
    </>
  );
}
