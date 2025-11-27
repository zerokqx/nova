import { createStore } from "@colorfy-software/zfy";

export const useHistoryChatStore = createStore("history-chat-store", {
    messages: [],
});
