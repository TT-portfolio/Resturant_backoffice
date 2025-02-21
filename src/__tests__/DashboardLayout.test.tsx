import { render, screen } from "@testing-library/react";
import DashboardLayout from "@/app/Components/DashboardLayout";
import SideNavbar from "@/app/Components/SideNavbar/sideNavbar";
import TopDisplay from "@/app/Components/TopDisplay/TopDisplay";

jest.mock("@/app/Components/SideNavbar/sideNavbar", () => () => <div data-testid="side-navbar">SideNavbar</div>);
jest.mock("@/app/Components/TopDisplay/TopDisplay", () => () => <div data-testid="top-display">TopDisplay</div>);

describe("DashboardLayout Component", () => {
  test("renderas utan krascher och innehåller navbar, topdisplay och children", () => {
    render(
      <DashboardLayout>
        <div data-testid="child-content">Child Content</div>
      </DashboardLayout>
    );

    // Kontrollera att SideNavbar och TopDisplay renderas
    expect(screen.getByTestId("side-navbar")).toBeInTheDocument();
    expect(screen.getByTestId("top-display")).toBeInTheDocument();

    // Kontrollera att children också renderas
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
  });
});
