import { List } from "@mantine/core";
import { Check, CircleX } from "lucide-react";
import type { ICardList } from "../types/CardList.interface";

const __CardList = List.withProps({
  center: true,
  p: "none",
}) as ICardList;
const NormalItem = List.Item.withProps({ c: "lime", icon: <Check /> });
const ErrorItem = List.Item.withProps({ c: "red", icon: <CircleX /> });
export const CardList = Object.assign(__CardList, {
  NormalItem,
  ErrorItem,
}) as ICardList;
