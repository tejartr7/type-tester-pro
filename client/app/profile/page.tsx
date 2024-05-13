import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import ProfileCard from "./profileCard";
export default function Profile() {
  return (
    <div>
      <Navbar />
      <ProfileCard />
    </div>
  );
}
