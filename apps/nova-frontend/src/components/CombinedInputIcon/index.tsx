import { ActionIcon, useMantineTheme } from "@mantine/core";
import type { IInputWithControls } from "./types/input-with-controls.type";
import { useAppForm } from "@components/Form/ui/FormV2/FormV2";
import { Send } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export const InputWithControls = ({ providers }: IInputWithControls) => {
  const t = useMantineTheme();
  const form = useAppForm({
    defaultValues: {
      provider: providers[0] ?? "",
      text: "",
    },
  });
  return (
    <form.AppForm>
      <form.Form>
        <form.Vertical
          maw={"50rem"}
          w={"100%"}
          bd={`0.1rem ${t.colors.blue[5]} solid`}
          p={"md"}
          bdrs={"md"}
        >
          <form.AppField
            name="text"
            validators={{
              onChange: ({ value }) =>
                value.length > 0 ? undefined : "Введите запрос",
            }}
            children={(field) => (
              <field.TextArea
                minRows={3}
                cols={60}
                placeholder="Введите запрос..."
                maxRows={10}
                autosize
                styles={(t) => ({
                  input: { borderRadius: t.radius.sm, border: "none" },
                })}
              />
            )}
          />
          <form.Horizontal
            wrap="nowrap"
            grow={false}
            justify="space-between"
            bg={"drk.9"}
          >
            <form.AppField
              name="provider"
              children={(field) => (
                <field.Select
                  aria-label="Provider"
                  radius={"xl"}
                  data={providers}
                />
              )}
            />
            <form.Subscribe
              selector={(s) => [s.fieldMeta]}
              children={([meta]) => (
                <ActionIcon
                  type="submit"
                  size={"xl"}
                  bdrs={"xl"}
                  variant="gradient"
                  disabled={!meta.text?.isValid}
                >
                  <Send size={16} />
                </ActionIcon>
              )}
            />
          </form.Horizontal>
        </form.Vertical>
      </form.Form>
    </form.AppForm>
  );
};
