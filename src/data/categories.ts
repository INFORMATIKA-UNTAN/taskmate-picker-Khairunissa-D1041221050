export type Category = {
  name: string;
  color: string;
};

export const defaultCategories: Category[] = [
  { name: "Mobile", color: "#3b82f6" },
  { name: "RPL", color: "#10b981" },
  { name: "IoT", color: "#6b7280" },
  { name: "Umum", color: "#9e9e9e" }
];

const colors = ["#f44336", "#673ab7", "#009688", "#795548", "#3f51b5"];
let colorIndex = 0;

export function pickColor(): string {
  const color = colors[colorIndex % colors.length];
  colorIndex++;
  return color;
}
