import { render, screen } from "@testing-library/react";
import { Label } from "./Label";
import React from "react";

describe("Label component", () => {
  it("renders without crashing", () => {
    render(<Label htmlFor="test-input">Test Label</Label>);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("applies custom className prop", () => {
    render(
      <Label className="custom-class" htmlFor="test-input">
        Test Label
      </Label>
    );
    const label = screen.getByText("Test Label");
    expect(label).toHaveClass("custom-class");
  });

  it("maintains existing classes when custom className is provided", () => {
    render(
      <Label className="custom-class" htmlFor="test-input">
        Test Label
      </Label>
    );
    const label = screen.getByText("Test Label");
    // Verify core styling classes are preserved
    expect(label).toHaveClass("text-sm");
    expect(label).toHaveClass("font-medium");
    expect(label).toHaveClass("leading-none");
  });

  it("maintains ref forwarding", () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(
      <Label ref={ref} htmlFor="test-input">
        Test Label
      </Label>
    );
    expect(ref.current).toBeTruthy();
  });

  it("associates with form control via htmlFor", () => {
    render(
      <div>
        <input id="test-input" />
        <Label htmlFor="test-input">Test Label</Label>
      </div>
    );
    const input = screen.getByLabelText("Test Label");
    expect(input).toBeInTheDocument();
  });
});
