import { withForm } from "@shared/ui/Form";

export const AiInputTextArea = withForm({
  defaultState: {
    canSubmit: false,
  },
  defaultValues: {
    provider: "",
    content: "",
  },
  render({ form }) {
    return (
      <form.AppField
        name="content"
        validators={{
          onChange: ({ value }) => {
            const isValid = value.trim().length > 0;
            console.log("Validation:", value, "isValid:", isValid);
            return isValid ? undefined : "Введите запрос";
          },
        }}
        children={(field) => (
          <field.TextArea
            minRows={3}
            cols={60}
            placeholder="Введите запрос..."
            maxRows={10}
            autosize
            styles={(t) => ({
              input: { border: "none" },
            })}
          />
        )}
      />
    );
  },
});
