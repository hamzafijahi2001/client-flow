import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { expect, test, vi, afterEach } from "vitest";
import Client from "./Client";

afterEach(() => {
  cleanup();
});

test("renders client information", () => {
  render(
    <BrowserRouter>
      <Client
        client={{
          id: 1,
          name: "Client A",
          email: "a@test.com",
          phone: "0600000000",
          status: 2,
        }}
        onDelete={() => {}}
      />
    </BrowserRouter>
  );

  expect(screen.getByText("Client A")).toBeInTheDocument();
  expect(screen.getByText("a@test.com")).toBeInTheDocument();
  expect(screen.getByText("0600000000")).toBeInTheDocument();
});

test("calls onDelete when delete button is clicked", async () => {
  const user = userEvent.setup();
  const onDelete = vi.fn();

  render(
    <BrowserRouter>
      <Client
        client={{
          id: 1,
          name: "Client A",
          email: "a@test.com",
          phone: "0600000000",
        }}
        onDelete={onDelete}
      />
    </BrowserRouter>
  );

  await user.click(screen.getByRole("button", { name: /delete/i }));

  expect(onDelete).toHaveBeenCalledWith(1);
});