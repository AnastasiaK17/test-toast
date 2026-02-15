import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { ToastProvider } from "../context/ToastContext";
import { ToastItem } from "../components/ToastItem";
import type { Toast } from "../types/types";

jest.useFakeTimers();

describe("Smart Timer", () => {
  const removeToastMock = jest.fn();

  const renderToastItem = (toast: Toast) => {
    render(
      <ToastProvider>
        <ToastItem toast={toast} onRemove={removeToastMock} />
      </ToastProvider>,
    );
  };

  beforeEach(() => {
    removeToastMock.mockClear();
  });

  it("pauses timer on mouse enter", async () => {
    const toast: Toast = {
      id: "1",
      message: "Успех!",
      type: "success",
      duration: 5000,
    };

    renderToastItem(toast);

    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(removeToastMock).not.toHaveBeenCalled();

    act(() => {
      fireEvent.mouseEnter(screen.getByText("Test Toast"));
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(removeToastMock).not.toHaveBeenCalled();

    act(() => {
      fireEvent.mouseLeave(screen.getByText("Test Toast"));
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(removeToastMock).toHaveBeenCalledWith(toast.id);
    });
  });
});
