import { PromptInputProps } from '@/components/ai-elements/prompt-input';
import { Fn } from '@/shared/types/functions/fn.type';

export interface IAskModelPromptFormProps {
  onSubmit: PromptInputProps['onSubmit'];
  setModel: Fn<[string]>;
  model: string;
}
