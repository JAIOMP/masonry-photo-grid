import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../../../components/ErrorBoundry/ErrorBoundary";
import { describe, test, expect } from "vitest";

const ProblematicComponent = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary Component", () => {
  test("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <div>Test Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("Test Component")).toBeInTheDocument();
  });

  test("catches errors and displays fallback UI", () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We're sorry, but an unexpected error occurred. Please try again later."
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });
});
