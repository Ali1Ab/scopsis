import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskForm } from "../TaskForm";

describe("TaskForm", () => {
    it("calls onAdd with title, description, and date and clears fields", async () => {
        const user = userEvent.setup();
        const onAdd = vi.fn();
        render(<TaskForm onAdd={onAdd} />);

        const title = screen.getByLabelText(/task title/i);
        const description = screen.getByLabelText(/task description/i);
        const date = screen.getByLabelText(/due date/i);
        const add = screen.getByRole("button", { name: /add task/i });

        await user.type(title, "Buy milk");
        await user.type(description, "2% organic");
        await user.type(date, "2025-12-01");
        await user.click(add);

        expect(onAdd).toHaveBeenCalledWith({
            title: "Buy milk",
            description: "2% organic",
            dueDate: "2025-12-01",
            tags: undefined,
        });

        // Wait for form to clear (TaskForm uses setTimeout)
        await new Promise(resolve => setTimeout(resolve, 150));
        
        expect(title).toHaveValue("");
        expect(description).toHaveValue("");
        expect(date).toHaveValue("");
    });
});


