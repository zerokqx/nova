type ModuleImportFn = () => Promise<unknown>;

type GetModuleType<TImportFn extends ModuleImportFn> = Awaited<
  ReturnType<TImportFn>
>;

export const i = <
  ImportFn extends ModuleImportFn,
  ModuleType = GetModuleType<ImportFn>,
  Key extends keyof ModuleType = keyof ModuleType,
>(
  importFn: ImportFn,
  key: Key,
) => {
  return importFn().then((m) => ({ default: m[key] }));
};

const d = () => import("@pages/Index/ui/index"); // Предположим, это возвращает Promise<{ IndexPage: React.FC }>

i(d, "IndexPage");
