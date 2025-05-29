import { describe, it, expect } from "vitest";
import {
  filterGroups,
  priorityColors,
  translateCategoryAndPriority,
} from "../utils/taskUtils";

describe("translateCategoryAndPriority", () => {
  it("should correctly translate known categories and priorities", () => {
    expect(translateCategoryAndPriority("Category")).toBe("Categoria");
    expect(translateCategoryAndPriority("Work")).toBe("Trabalho");
    expect(translateCategoryAndPriority("Study")).toBe("Estudos");
    expect(translateCategoryAndPriority("Personal")).toBe("Pessoal");
    expect(translateCategoryAndPriority("Priority")).toBe("Prioridade");
    expect(translateCategoryAndPriority("High")).toBe("Alta");
    expect(translateCategoryAndPriority("Medium")).toBe("Média");
    expect(translateCategoryAndPriority("Low")).toBe("Baixa");
  });

  it("should return the original value if it is not found in the map", () => {
    expect(translateCategoryAndPriority("Unknown")).toBe("Unknown");
  });
});

describe("priorityColors", () => {
  it("should return correct CSS classes for each priority level", () => {
    expect(priorityColors.High).toBe("bg-red-100 text-red-800");
    expect(priorityColors.Medium).toBe("bg-yellow-100 text-yellow-800");
    expect(priorityColors.Low).toBe("bg-green-100 text-green-800");
  });
});

describe("filterGroups", () => {
  it("should contain two groups: Category and Priority", () => {
    expect(filterGroups).toHaveLength(2);
    expect(filterGroups[0].group).toBe("Category");
    expect(filterGroups[1].group).toBe("Priority");
  });

  it("should include the correct options for Category", () => {
    const categoryOptions = filterGroups[0].options.map((opt) => opt.value);
    expect(categoryOptions).toEqual(["Work", "Personal", "Study"]);
  });

  it("should include the correct options for Priority", () => {
    const priorityOptions = filterGroups[1].options.map((opt) => opt.value);
    expect(priorityOptions).toEqual(["High", "Medium", "Low"]);
  });
});
