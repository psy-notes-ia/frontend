
import { z } from "zod";
import React from "react";
import { Tag, TagInput } from "./tag-input";

const FormSchema = z.object({
  topics: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
});

export default function TagInputComponent({
  onChange,
  values,
}: {
  onChange: (tags: any) => void;
  values: Tag[];
}) {
  //   const form = useForm<z.infer<typeof FormSchema>>({
  //     resolver: zodResolver(FormSchema),
  //   });

  //   const [tags, setTags] = React.useState<Tag[]>([]);

  //   const { setValue } = form;

  return (
    <TagInput
      placeholder="Digite uma tag e pressione Enter para adicionar"
      tags={values}
      className="sm:min-w-[350px]"
      setTags={(newTags) => {
        onChange(newTags);
        // setTags(newTags);
        // setValue("topics", newTags as [Tag, ...Tag[]]);
      }}
    />
  );
}
