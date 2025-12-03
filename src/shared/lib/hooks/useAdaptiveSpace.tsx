import { useElementSize } from "@mantine/hooks";
import type { TUseAdaptiveSpace } from "./types";
import { Space } from "@mantine/core";

export const useAdaptiveSpace: TUseAdaptiveSpace = () => {
  const { ref, height } = useElementSize();
  const AdaptiveSpace = () => <Space ref={ref} h={height} />;
  return [ref, AdaptiveSpace];
};
