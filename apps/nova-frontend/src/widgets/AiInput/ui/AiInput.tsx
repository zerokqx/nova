import type { IAiInputProps } from "./types/AiInput.interface";
import { AiInputTextArea } from "./AiInputTextArea";
import { useAiInputForm } from "../lib/useAiInputForm";
import { AiInputBottomSection } from "./AiInputBottomSection";

export const AiInput = ({ providers, onSubmit }: IAiInputProps) => {
  const { t, form } = useAiInputForm(providers, onSubmit);
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
          <AiInputTextArea form={form} />
        </form.Vertical>
        <AiInputBottomSection {...{ form, providers }} />
      </form.Form>
    </form.AppForm>
  );
};
