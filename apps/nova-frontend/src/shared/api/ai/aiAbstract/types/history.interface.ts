export type IHistoryItem<T extends string | unknown = "content"> = {
  role: "user" | "assistant";
} & {
  [K in T extends string ? T : "content"]: string;
};
