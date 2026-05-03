import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Project from "./Project";

afterEach(() => {
  cleanup();
});

test("renders project information", () => {
  render(
    <BrowserRouter>
      <Project
        project={{
          id: 1,
          title: "Project A",
          description: "Test project",
          deadline: "2026-06-01",
        }}
        onDelete={() => {}}
      />
    </BrowserRouter>
  );

  expect(screen.getByText("Project A")).toBeInTheDocument();
  expect(screen.getByText("Test project")).toBeInTheDocument();
  expect(screen.getByText("2026-06-01")).toBeInTheDocument();
});

test("calls onDelete when delete button is clicked", async () => {
  const user = userEvent.setup();
  const onDelete = vi.fn();

  render(
    <BrowserRouter>
      <Project
        project={{
          id: 1,
          title: "Project A",
          description: "Test project",
          deadline: "2026-06-01",
        }}
        onDelete={onDelete}
      />
    </BrowserRouter>
  );

  await user.click(screen.getByRole("button", { name: /delete/i }));

  expect(onDelete).toHaveBeenCalledWith(1);
});

test("user can type in input", async () => {
  const user = userEvent.setup();

  render(<input placeholder="name" />);

  const input = screen.getByPlaceholderText("name");

  await user.type(input, "Hamza");

  expect(input).toHaveValue("Hamza");
});