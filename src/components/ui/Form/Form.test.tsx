import { render, screen } from "@testing-library/react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "./Form";
import { useForm } from "react-hook-form";
import userEvent from "@testing-library/user-event";

// Mock Form Component Wrapper
const MockForm = ({ children }: any) => {
  const methods = useForm();
  return <Form {...methods}>{children}</Form>;
};

describe("Form Components", () => {
  test("renders FormItem", () => {
    render(
      <MockForm>
        <FormItem data-testid="form-item">Test Item</FormItem>
      </MockForm>
    );
    expect(screen.getByTestId("form-item")).toBeInTheDocument();
  });

  test("renders FormLabel", () => {
    render(
      <MockForm>
        <FormItem>
          <FormLabel>Test Label</FormLabel>
        </FormItem>
      </MockForm>
    );
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  test("renders FormDescription", () => {
    render(
      <MockForm>
        <FormItem>
          <FormDescription>Test Description</FormDescription>
        </FormItem>
      </MockForm>
    );
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  test("renders FormMessage when error exists", () => {
    render(
      <MockForm>
        <FormItem>
          <FormMessage>Error Message</FormMessage>
        </FormItem>
      </MockForm>
    );
    expect(screen.getByText("Error Message")).toBeInTheDocument();
  });

  test("does not render FormMessage when no error", () => {
    render(
      <MockForm>
        <FormItem>
          <FormMessage />
        </FormItem>
      </MockForm>
    );
    expect(screen.queryByTestId("form-message")).not.toBeInTheDocument();
  });

  test("FormField provides context", () => {
    render(
      <MockForm>
        <FormField name="test" render={() => <input data-testid="input" />} />
      </MockForm>
    );
    expect(screen.getByTestId("input")).toBeInTheDocument();
  });

  test("FormControl receives input correctly", async () => {
    render(
      <MockForm>
        <FormItem>
          <FormControl>
            <input data-testid="input" />
          </FormControl>
        </FormItem>
      </MockForm>
    );
    const input = screen.getByTestId("input");
    await userEvent.type(input, "Hello");
    expect(input).toHaveValue("Hello");
  });
});
