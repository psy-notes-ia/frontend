import NoteService from "@/app/api/repository/NoteService";
import React, { useEffect, useState } from "react";
import Select from "react-select";

import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    border: "1px solid gray",
  }),
  option: (provided: any, state: { isSelected: any }) => ({
    ...provided,
    backgroundColor: state.isSelected ? "blue" : "white",
    color: state.isSelected ? "white" : "black",
    "&:hover": {
      backgroundColor: "",
    },
  }),
};

const formatOptionLabel = ({ label, description }: any) => (
  <div>
    <strong>{label}</strong>
    <span style={{ color: "gray" }}>
      {" "}
      ({format(description, "PPP", { locale: ptBR })})
    </span>
  </div>
);

export default function MultiSelectComponent({
  onChange,
  values,
}: {
  onChange: (value: any) => void;
  values: any[];
}) {
  const params = useSearchParams();

  const [sessions, setSessions] = useState<any[]>([]);
  const handleMultiSelectChange = (selected: any) => {
    if (values.length != 6) {
      onChange(selected);
    }
  };

  const fetchSession = async () => {
    var res = await NoteService.fetchAllNotesSession(params.get("p")!);
    const data = ((await res.json()) as []).map((e: any) => {
      return { label: e.title, value: e.id, description: e.session };
    });
    setSessions(data);
  };
  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <>
      <Select
        options={sessions}
        value={values}
        onChange={handleMultiSelectChange}
        placeholder="Selecione até 6"
        styles={customStyles}
        isMulti
        formatOptionLabel={formatOptionLabel}
        noOptionsMessage={() => "Anotação não encontrada"}
      />
    </>
  );
}
