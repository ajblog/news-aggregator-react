import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./Card";

describe("Card Component", () => {
  it("renders the Card component correctly", () => {
    render(<Card>Card Content</Card>);
    const card = screen.getByText("Card Content");

    expect(card).toBeInTheDocument();
    expect(card).toHaveClass(
      "rounded-lg border bg-card text-card-foreground shadow-sm"
    );
  });

  it("renders CardHeader correctly", () => {
    render(<CardHeader>Card Header</CardHeader>);
    const header = screen.getByText("Card Header");

    expect(header).toBeInTheDocument();
    expect(header).toHaveClass("flex flex-col space-y-1.5 p-6");
  });

  it("renders CardTitle correctly", () => {
    render(<CardTitle>Card Title</CardTitle>);
    const title = screen.getByText("Card Title");

    expect(title).toBeInTheDocument();
    expect(title).toHaveClass(
      "text-2xl font-semibold leading-none tracking-tight"
    );
  });

  it("renders CardDescription correctly", () => {
    render(<CardDescription>Description here</CardDescription>);
    const description = screen.getByText("Description here");

    expect(description).toBeInTheDocument();
    expect(description).toHaveClass("text-sm text-muted-foreground");
  });

  it("renders CardContent correctly", () => {
    render(<CardContent>Some content</CardContent>);
    const content = screen.getByText("Some content");

    expect(content).toBeInTheDocument();
    expect(content).toHaveClass("p-6 pt-0");
  });

  it("renders CardFooter correctly", () => {
    render(<CardFooter>Footer content</CardFooter>);
    const footer = screen.getByText("Footer content");

    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass("flex items-center p-6 pt-0");
  });

  it("renders a complete Card structure", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
