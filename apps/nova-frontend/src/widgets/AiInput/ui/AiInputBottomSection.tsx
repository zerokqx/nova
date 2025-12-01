import type { TModels } from "@shared/api/ai/aiAbstract/types/models.type";
import { withForm } from "@shared/ui/Form";
import { AiInputSubmit } from "./AiInputSubmit";

export const AiInputBottomSection = withForm({
  defaultValues: {
    provider: "",
    content: "",
  },
  props: {
    providers: ["Provider", "Provider"] as TModels,
  },
  render({ form, providers }) {
    return (
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
        <AiInputSubmit form={form} />
      </form.Horizontal>
    );
  },
});
