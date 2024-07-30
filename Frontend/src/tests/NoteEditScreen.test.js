import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Router, MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import axios from "axios";
import NoteEditScreen from "../pages/NoteEditScreen";

jest.mock("axios");

describe("NoteEditScreen Component", () => {
  test("renders screen correctly", () => {
    const note = { _id: "1", title: "Test Title", content: "Test Content" };
    const history = createMemoryHistory();
    const state = { note };

    render(
      <Router location={{ state }} navigator={history}>
        <NoteEditScreen />
      </Router>
    );

    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByText("Note Editor")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("handleSave button functionality", async () => {
    const note = { _id: "1", title: "Test Title", content: "Test Content" };
    const history = createMemoryHistory();
    const state = { note };

    axios.put = jest.fn().mockImplementation(() => Promise.resolve({ data: {} }));

    render(
      <Router location={{ state }} navigator={history}>
        <NoteEditScreen />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Updated Title" },
    });

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        `/api/notes/${note._id}`,
        { title: "Updated Title", content: "<p>Test Content</p>" },
        { headers: { "Content-type": "application/json" } }
      );
      expect(history.location.pathname).toBe("/mynotes");
    });
  });
});
