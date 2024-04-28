import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import MainComponent from "@/components/MainComponent";
import Navbar from "@/components/Navbar";

export default async function Index() {
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };
  const isSupabaseConnected = canInitSupabaseClient();
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div suppressHydrationWarning>
      <Navbar user={user}/>
      <MainComponent  />
    </div>
  );
}
