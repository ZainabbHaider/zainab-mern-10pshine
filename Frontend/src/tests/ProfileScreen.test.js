import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import axios from "axios";
import ProfileScreen from "../pages/ProfileScreen";

jest.mock("axios");

const mockSetIsLoggedIn = jest.fn();

describe("ProfileScreen Component", () => {
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  };

  beforeEach(() => {
    axios.get = jest.fn().mockResolvedValue({ data: user });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders screen correctly", async () => {
    const history = createMemoryHistory();
    
    render(
      <Router location={history.location} navigator={history}>
        <ProfileScreen setIsLoggedIn={mockSetIsLoggedIn} />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("My Profile")).toBeInTheDocument();
      expect(screen.getByText("First Name:")).toBeInTheDocument();
      expect(screen.getByText("Last Name:")).toBeInTheDocument();
      expect(screen.getByText("Email:")).toBeInTheDocument();
      expect(screen.getByText("John")).toBeInTheDocument();
      expect(screen.getByText("Doe")).toBeInTheDocument();
      expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
      expect(screen.getByText("Edit Profile")).toBeInTheDocument();
      expect(screen.getByText("Logout")).toBeInTheDocument();
    });
  });

  test("fetches user details on mount", async () => {
    const history = createMemoryHistory();
    
    render(
      <Router location={history.location} navigator={history}>
        <ProfileScreen setIsLoggedIn={mockSetIsLoggedIn} />
      </Router>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("/api/users/profile");
      expect(screen.getByText("John")).toBeInTheDocument();
      expect(screen.getByText("Doe")).toBeInTheDocument();
      expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    });
  });

  test("handles logout correctly", async () => {
    const history = createMemoryHistory();
    
    render(
      <Router location={history.location} navigator={history}>
        <ProfileScreen setIsLoggedIn={mockSetIsLoggedIn} />
      </Router>
    );

    fireEvent.click(screen.getByText("Logout"));

    await waitFor(() => {
      expect(mockSetIsLoggedIn).toHaveBeenCalledWith(false);
      expect(history.location.pathname).toBe("/");
    });
  });

  test("toggles edit mode correctly", async () => {
    const history = createMemoryHistory();
    
    render(
      <Router location={history.location} navigator={history}>
        <ProfileScreen setIsLoggedIn={mockSetIsLoggedIn} />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("Edit Profile")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Edit Profile"));

    await waitFor(() => {
      expect(screen.getByText("Save")).toBeInTheDocument();
      expect(screen.getByDisplayValue("John")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();
      expect(screen.getByDisplayValue("john.doe@example.com")).toBeInTheDocument();
    });
  });
});
