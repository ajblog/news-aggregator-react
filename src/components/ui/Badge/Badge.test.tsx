import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge component", () => {
  it("renders without crashing", () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  it("applies the correct default variant styles", () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText("Default Badge");
    expect(badge).toHaveClass("bg-primary text-primary-foreground");
  });

  it("applies the correct variant styles", () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>);
    const badge = screen.getByText("Secondary Badge");
    expect(badge).toHaveClass("bg-secondary text-secondary-foreground");
  });

  it("accepts additional class names", () => {
    render(<Badge className="custom-class">Styled Badge</Badge>);
    const badge = screen.getByText("Styled Badge");
    expect(badge).toHaveClass("custom-class");
  });
});
