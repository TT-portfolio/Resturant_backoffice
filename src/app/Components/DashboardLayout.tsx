import SideNavbar from "./SideNavbar/sideNavbar";
import TopDisplay from "./TopDisplay/TopDisplay";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full">
      <SideNavbar />
      <div className="flex flex-col flex-1">
        <TopDisplay /> 
        {children}
      </div>
    </div>
  );
}
