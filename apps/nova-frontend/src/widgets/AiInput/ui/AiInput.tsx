import type { IAiInputProps } from "./types/AiInput.interface";
import { AiInputTextArea } from "./AiInputTextArea";
import { useAiInputForm } from "../lib/useAiInputForm";
import { AiInputBottomSection } from "./AiInputBottomSection";

export const AiInput = ({
  providers,
  onSubmit,
  readOnly = false,
  ...props
}: IAiInputProps) => {
  console.log(onSubmit);
  const { t, form } = useAiInputForm(providers, onSubmit);
  return (
    <form.AppForm>
      <form.Form>
        <form.Vertical
          bg={"black"}
          gap={"md"}
          maw={"50rem"}
          w={"100%"}
          bd={`0.1rem ${t.colors.blue[5]} solid`}
          p={"md"}
          bdrs={"md"}
          {...props}
        >
          <AiInputTextArea form={form} />
          <AiInputBottomSection {...{ readOnly }} {...{ form, providers }} />
        </form.Vertical>
      </form.Form>
    </form.AppForm>
  );
};
