import { LogotypeNoColors } from "@components/LogotypeSection/LogotypeNoColors";
import { SendButton } from "@components/SendButton";
import { useResponsive } from "@hooks/useResponsive";
import { Grid, Select, Textarea } from "@mantine/core";
import type { IInputWithControls } from "./types/input-with-controls.type";

export const InputWithControls = ({ providers }: IInputWithControls) => {
  const { mobile } = useResponsive();
  const providersExists = providers?.length > 0;
  return (
    <Grid
      bdrs={"md"}
      p={"md"}
      styles={(t) => ({
        root: {
          border: `${t.colors.blue[5]} 0.1rem solid`,
        },
      })}
    >
      <Grid.Col span={12}>
        <Textarea
          minRows={3}
          maxRows={10}
          cols={50}
          autosize={!mobile}
          leftSection={<LogotypeNoColors />}
          placeholder={
            providersExists ? "Спросите что угодно..." : "Создайте провайдер..."
          }
          maw={"100%"}
          styles={{
            input: {
              border: "none",
            },
          }}
        />
      </Grid.Col>
      {providersExists && (
        <>
          <Grid.Col span={2}>
            <Select />
          </Grid.Col>
          <Grid.Col span={"auto"} />
          <Grid.Col span={"content"}>
            <SendButton />
          </Grid.Col>
        </>
      )}
    </Grid>
  );
};
