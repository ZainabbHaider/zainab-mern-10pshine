import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import axios from "axios";
import Register from "../pages/Register";
import Modal from "react-modal";
import '@testing-library/jest-dom';

jest.mock("axios");

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

beforeAll(() => {
  const appElement = document.createElement('div');
  appElement.id = 'app';
  document.body.appendChild(appElement);
  Modal.setAppElement('#app');
});

describe("Register Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Storage.prototype, 'setItem');
  });

  test("renders register screen correctly", () => {
    const history = createMemoryHistory();
    
    render(
      <Router location={history.location} navigator={history}>
        <Register />
      </Router>
    );

    expect(screen.getByPlaceholderText("heading")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });

  test("handles submit correctly", async () => {
    const history = createMemoryHistory();
    const userData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password",
    };
    
    axios.post.mockResolvedValue({ data: userData });

    render(
      <Router location={history.location} navigator={history}>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("First name"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Last name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "john.doe@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password" } });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "/api/users",
        userData,
        { headers: { "Content-type": "application/json" } }
      );
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'userInfo',
      JSON.stringify(userData)
    );
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
