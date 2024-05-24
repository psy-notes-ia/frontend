import { atom, useAtom } from "jotai"

import { Mail, mails } from "./data"

type Config = {
  selected: Mail["id"] | null,
  isNote: boolean | null
  isEditMode: boolean | null
}

const configAtom = atom<Config>({
  // selected: mails[0].id,
  selected: null,
  isNote: true,
  isEditMode: false,
})

export function useMail() {
  return useAtom(configAtom)
}
