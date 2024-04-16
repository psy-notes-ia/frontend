import React from "react";
import MultipleSelector, { Option } from "./component";

const OPTIONS: Option[] = [
  { label: "nextjs", description: "e", value: "nextjs" },
  { label: "React", description: "e", value: "react" },
  { label: "Remix", description: "e", value: "remix" },
  { label: "Vite", description: "e", value: "vite" },
  { label: "Nuxt", description: "e", value: "nuxt" },
  { label: "Vue", description: "e", value: "vue" },
  { label: "Svelte", description: "e", value: "svelte" },
  { label: "Angular", description: "e", value: "angular" },
  { label: "Astro", description: "e", value: "astro" },
];

const MultipleSelectorComponent = ({
  onChange,
}: {
  onChange: (opts: Option[]) => void;
}) => {
  return (
    <MultipleSelector
      defaultOptions={OPTIONS}
      onChange={onChange}
      placeholder="Selecione 1 ou mais"
      emptyIndicator={
        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
          Não encontrado
        </p>
      }
    />
  );
};

export default MultipleSelectorComponent;
