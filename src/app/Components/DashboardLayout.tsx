"use client"; // 🔹 Nu kan vi använda useState och context

import SideNavbar from "./SideNavbar/SideNavbar";
import TopDisplay from "./TopDisplay/TopDisplay";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <SideNavbar />
      <div className="flex flex-col flex-1">
        <TopDisplay /> 
        {children}
      </div>
    </div>
  );
}
