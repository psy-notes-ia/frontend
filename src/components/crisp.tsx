
"use client"

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("bc11ad50-0302-4b24-8010-de7fc7250132");
  });

  return null;
}

export default CrispChat;