import {
  filterGroups,
  priorityColors,
  translateCategoryAndPriority,
} from "../utils/taskUtils";

describe("translateCategoryAndPriority", () => {
  test("should correctly translate known categories and priorities", () => {
    expect(translateCategoryAndPriority("Category")).toBe("Categoria");
    expect(translateCategoryAndPriority("Work")).toBe("Trabalho");
    expect(translateCategoryAndPriority("Study")).toBe("Estudos");
    expect(translateCategoryAndPriority("Personal")).toBe("Pessoal");
    expect(translateCategoryAndPriority("Priority")).toBe("Prioridade");
    expect(translateCategoryAndPriority("High")).toBe("Alta");
    expect(translateCategoryAndPriority("Medium")).toBe("Média");
    expect(translateCategoryAndPriority("Low")).toBe("Baixa");
  });

  test("should return the original value if it is not found in the map", () => {
    expect(translateCategoryAndPriority("Unknown")).toBe("Unknown");
  });
});

describe("priorityColors", () => {
  test("should return correct CSS classes for each priority level", () => {
    expect(priorityColors.High).toBe("bg-red-100 text-red-800");
    expect(priorityColors.Medium).toBe("bg-yellow-100 text-yellow-800");
    expect(priorityColors.Low).toBe("bg-green-100 text-green-800");
  });
});

describe("filterGroups", () => {
  test("should contain two groups: Category and Priority", () => {
    expect(filterGroups).toHaveLength(2);
    expect(filterGroups[0].group).toBe("Category");
    expect(filterGroups[1].group).toBe("Priority");
  });

  test("should include the correct options for Category", () => {
    const categoryOptions = filterGroups[0].options.map((opt) => opt.value);
    expect(categoryOptions).toEqual(["Work", "Personal", "Study"]);
  });

  test("should include the correct options for Priority", () => {
    const priorityOptions = filterGroups[1].options.map((opt) => opt.value);
    expect(priorityOptions).toEqual(["High", "Medium", "Low"]);
  });
});
