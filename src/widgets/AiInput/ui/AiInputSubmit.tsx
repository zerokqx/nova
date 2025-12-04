import { ActionIcon } from "@mantine/core";
import { withForm } from "@shared/ui/Form";
import { Send } from "lucide-react";

export const AiInputSubmit = withForm({
  defaultValues: {
    provider: "",
    content: "",
  },
  render({ form }) {
    return (
      <form.Subscribe
        selector={(s) => {
          console.log(s.canSubmit);
          return [s.canSubmit];
        }}
        children={([canSubmit]) => (
          <ActionIcon
            type="submit"
            size={"xl"}
            bdrs={"xl"}
            variant="gradient"
            disabled={!canSubmit}
          >
            <Send size={16} />
          </ActionIcon>
        )}
      />
    );
  },
});
