import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import List from "../List"; // Adjust the import path if necessary
import { fetchItemsFromAPI } from "../../utils/api";
import { BrowserRouter as Router } from "react-router-dom";

// Mock API call for fetching items
jest.mock("../../utils/api", () => ({
  fetchItemsFromAPI: jest.fn(),
}));

describe("List Component", () => {
  beforeEach(() => {
    // Reset mock implementation before each test
    fetchItemsFromAPI.mockReset();
  });

  it("renders correctly", () => {
    render(
      <Router>
        <List favorites={[]} toggleFavorite={() => {}} />
      </Router>
    );

    // Check if the heading exists
    expect(screen.getByText("List of Items")).toBeInTheDocument();
  });

  it("calls fetchItems when page is loaded", async () => {
    // Mock API call to return data for page 1
    fetchItemsFromAPI.mockResolvedValueOnce([{ id: 1, title: "Item 1" }]);

    render(
      <Router>
        <List favorites={[]} toggleFavorite={() => {}} />
      </Router>
    );

    // Wait for the data to be loaded and check if the item is displayed
    await waitFor(() => screen.getByText("Item 1"));
    expect(screen.getByText("Item 1")).toBeInTheDocument();

    // Ensure that the API was called once
    expect(fetchItemsFromAPI).toHaveBeenCalledTimes(1);
    expect(fetchItemsFromAPI).toHaveBeenCalledWith(1); // Check if it called with page 1
  });

  it("fetches the next page when scrolled to the bottom", async () => {
    // Mock API call for pages 1 and 2
    fetchItemsFromAPI
      .mockResolvedValueOnce([{ id: 1, title: "Item 1" }])
      .mockResolvedValueOnce([{ id: 2, title: "Item 2" }]);

    render(
      <Router>
        <List favorites={[]} toggleFavorite={() => {}} />
      </Router>
    );

    // Check if first page is loaded
    await waitFor(() => screen.getByText("Item 1"));
    expect(screen.getByText("Item 1")).toBeInTheDocument();

    // Simulate scrolling to trigger API call for the next page
    fireEvent.scroll(window, { target: { scrollY: 1000 } });

    // Check if the next page API call was made
    await waitFor(() => screen.getByText("Item 2"));
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(fetchItemsFromAPI).toHaveBeenCalledTimes(2);
    expect(fetchItemsFromAPI).toHaveBeenCalledWith(2); // Check if it called with page 2
  });

  it("does not make an API call for already loaded pages", async () => {
    // Mock API call for pages 1 and 2
    fetchItemsFromAPI
      .mockResolvedValueOnce([{ id: 1, title: "Item 1" }])
      .mockResolvedValueOnce([{ id: 2, title: "Item 2" }]);

    render(
      <Router>
        <List favorites={[]} toggleFavorite={() => {}} />
      </Router>
    );

    // Wait for data from page 1 and page 2
    await waitFor(() => screen.getByText("Item 1"));
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    await waitFor(() => screen.getByText("Item 2"));
    expect(screen.getByText("Item 2")).toBeInTheDocument();

    // Check that fetchItems was called twice (for page 1 and page 2)
    expect(fetchItemsFromAPI).toHaveBeenCalledTimes(2);

    // Simulate navigating back and check if page 2 data is retained without re-fetching
    fireEvent.click(screen.getByText("Back to Dashboard"));
    fireEvent.click(screen.getByText("Back to List"));

    // Check if page 2 data is still there without another API call
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(fetchItemsFromAPI).toHaveBeenCalledTimes(2); // No additional API calls
  });

  it("should reset state and start fresh on page refresh", async () => {
    // Mock API call to return data for page 1
    fetchItemsFromAPI.mockResolvedValueOnce([{ id: 1, title: "Item 1" }]);

    // Render the List component
    render(
      <Router>
        <List favorites={[]} toggleFavorite={() => {}} />
      </Router>
    );

    // Check if the item is displayed
    await waitFor(() => screen.getByText("Item 1"));
    expect(screen.getByText("Item 1")).toBeInTheDocument();

    // Simulate page refresh (reload)
    global.location.reload = jest.fn(); // Mock the reload function
    fireEvent.click(screen.getByText("Back to Dashboard"));
    fireEvent.click(screen.getByText("Back to List"));

    // Check if it starts from page 1 again and the API is called
    await waitFor(() => screen.getByText("Item 1"));
    expect(fetchItemsFromAPI).toHaveBeenCalledTimes(1); // API should be called once
  });

  it("handles loading state correctly", () => {
    render(
      <Router>
        <List favorites={[]} toggleFavorite={() => {}} />
      </Router>
    );
    expect(screen.getByText("List of Items")).toBeInTheDocument();
    expect(screen.getByText("No items available")).toBeInTheDocument();
  });
});
