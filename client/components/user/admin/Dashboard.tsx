import { useAuthStore } from "@/context/AuthContext";
import { useState } from "react";
import AdminUsers from "./Users";
import AdminReports from "./Reports";
import {  UserCog } from "lucide-react";

export default function DashboardAdmin() {
  const { user } = useAuthStore((state) => state);
  const [activeTab, setActiveTab] = useState("dashboard");


  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "users", label: "Users" },
    { id: "reports", label: "Reports" },
  ]

  function renderTabContent() {
    switch (activeTab) {
      case "users":
        return <AdminUsers />;
      case "reports":
        return <AdminReports />;
      default:
        return null;
    }

  }

 
  return (
    <div className="flex flex-col min-h-screen py-2">
        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/3 p-3 mb-2">
            <div className="flex size-11 items-center justify-center rounded-md bg-red-500/15 text-red-300">
              <UserCog size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                {user?.name}
              </p>
            </div>
          </div>
        <nav className="flex flex-wrap gap-2 rounded-lg border border-white/10 bg-zinc-950/70 p-2">

      {tabs.map((tab) => (
        <button
        type="button"
        key={tab.id}
        className={`px-4 py-2 ${activeTab === tab.id && "bg-red-900 rounded-lg"}`}
        onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
</nav>
        <div>
          {renderTabContent()}
        </div>

    </div>
  );
}