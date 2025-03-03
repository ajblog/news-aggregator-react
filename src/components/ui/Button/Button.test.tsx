import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button Component", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary text-primary-foreground");
  });

  it("applies the correct variant class", () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole("button", { name: /delete/i });

    expect(button).toHaveClass("bg-destructive text-destructive-foreground");
  });

  it("applies the correct size class", () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole("button", { name: /large/i });

    expect(button).toHaveClass("h-10 rounded-md px-8");
  });

  it("supports the asChild prop", () => {
    render(
      <Button asChild>
        <a href="/test">Link</a>
      </Button>
    );
    const link = screen.getByRole("link", { name: /link/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });

  it("calls onClick handler when clicked", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });

    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when the disabled prop is set", async () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );
    const button = screen.getByRole("button", { name: /disabled/i });

    expect(button).toBeDisabled();

    await userEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
