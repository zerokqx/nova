import { Fn } from '@/shared/types/functions/fn.type';
import { TOnSubmitHandlerForm } from '@/shared/ui/Form';
import { ChatStatus } from 'ai';

type TAskModelWithSelectProps = {
  withSelect?: true;
  model: string;
  onSubmit: TOnSubmitHandlerForm<{ text: string; model: string }>;
  setModel: Fn<[string]>;
};
type TAskModelWithoutSelectProps = {
  onSubmit: TOnSubmitHandlerForm<{ text: string; model: string }>;
  withSelect?: false;
};
export type IAskModelPromptFormProps = (TAskModelWithSelectProps | TAskModelWithoutSelectProps) & {
  status?: ChatStatus;
  callbacks?: {
    stop: () => Promise<void>;
  };
};
