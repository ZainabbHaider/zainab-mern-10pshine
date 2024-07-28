import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom"; // for the matchers
import Homepage from "../pages/Homepage"; // Adjust the import path if necessary

describe("Homepage Component", () => {
  test("renders the cover image", () => {
    const { getByAltText } = render(
      <Router>
        <Homepage />
      </Router>
    );
    const coverImage = getByAltText(/cover/i);
    expect(coverImage).toBeInTheDocument();
  });
  
  test("renders the heading", () => {
    const { getByText } = render(
      <Router>
        <Homepage />
      </Router>
    );
    const heading = getByText(/One Space for All Your Thoughts/i);
    expect(heading).toBeInTheDocument();
  });

  test("renders Sign In and Sign Up buttons", () => {
    const { getByText } = render(
      <Router>
        <Homepage />
      </Router>
    );
    const signInButton = getByText(/Sign In/i);
    const signUpButton = getByText(/Sign Up/i);
    expect(signInButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });

  test("Sign In button links to /login", () => {
    const { getByText } = render(
      <Router>
        <Homepage />
      </Router>
    );
    const signInButton = getByText(/Sign In/i);
    expect(signInButton.closest("a")).toHaveAttribute("href", "/login");
  });

  test("Sign Up button links to /register", () => {
    const { getByText } = render(
      <Router>
        <Homepage />
      </Router>
    );
    const signUpButton = getByText(/Sign Up/i);
    expect(signUpButton.closest("a")).toHaveAttribute("href", "/register");
  });
});
