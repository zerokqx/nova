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
              input: { border: "none" },
            })}
          />
        )}
      />
    );
  },
});
