import { render, screen, fireEvent } from "@testing-library/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./Dialog";
import "@testing-library/jest-dom";

describe("Dialog Component", () => {
  it("renders the dialog trigger", () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
          <DialogDescription>This is a test dialog</DialogDescription>
          <DialogClose>Close</DialogClose>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByText("Open Dialog")).toBeInTheDocument();
  });

  it("opens the dialog when trigger is clicked", () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
          <DialogDescription>This is a test dialog</DialogDescription>
          <DialogClose>Close</DialogClose>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByText("Open Dialog"));

    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
    expect(screen.getByText("This is a test dialog")).toBeInTheDocument();
  });

  it("closes the dialog when close button is clicked", () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
          <DialogDescription>This is a test dialog</DialogDescription>
          <DialogClose>Close</DialogClose>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByText("Open Dialog"));
    expect(screen.getByText("Test Dialog")).toBeInTheDocument();

    const closeButtons = screen.getAllByText("Close");
    fireEvent.click(closeButtons[0]); // Try changing index if needed    expect(screen.queryByText("Test Dialog")).not.toBeInTheDocument();
  });

  it("does not render the dialog content initially", () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    expect(screen.queryByText("Test Dialog")).not.toBeInTheDocument();
  });
});
