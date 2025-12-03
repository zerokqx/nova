import { withForm } from "@shared/ui/Form";
import { AiInputSubmit } from "./AiInputSubmit";
import type { ITransformModel } from "@shared/api/ai/lib/formatModel/types/transform.type";

export const AiInputBottomSection = withForm({
  defaultValues: {
    provider: "",
    content: "",
  },
  props: {
    readOnly: false,
    providers: [{ label: "", value: "" }] as ITransformModel["forSelect"],
  },
  render({ form, readOnly, providers }) {
    console.log(providers);
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
              {...{ readOnly }}
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
