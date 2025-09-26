import Navbar from "@/components/Navbar";
import DashboardClient from "./DashboardClient";


export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <DashboardClient/>
    </div>
  );
}
