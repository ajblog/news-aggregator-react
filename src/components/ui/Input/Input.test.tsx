import { render, screen } from "@testing-library/react";
import { Input } from "./Input";
import React from "react";
import { vi } from "vitest";

describe("Input component", () => {
  it("renders without crashing", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("accepts custom className prop", () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
  });

  it("maintains existing classes when custom className is provided", () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole("textbox");
    // Verify core styling classes are preserved
    expect(input).toHaveClass("border");
    expect(input).toHaveClass("transition-colors");
    expect(input).toHaveClass("focus-visible:ring-1");
  });

  it("handles onClick event", () => {
    const handleClick = vi.fn();
    render(<Input onClick={handleClick} />);
    const input = screen.getByRole("textbox");
    input.click();
    expect(handleClick).toHaveBeenCalled();
  });

  it("maintains ref forwarding", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it("applies dark mode styles", () => {
    // Enable dark mode via CSS media query
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: true,
      media: query,
    }));

    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("dark:bg-gray-500");
    expect(input).toHaveClass("dark:text-white");
    expect(input).toHaveClass("dark:border-gray-600");
  });
});
