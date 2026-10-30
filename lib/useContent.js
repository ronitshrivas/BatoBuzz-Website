"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { defaultContent } from "./defaults";
import { loadContent } from "./store";

const ContentContext = createContext(defaultContent);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    let active = true;
    loadContent().then((c) => {
      if (active) setContent(c);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
}

// Read the whole content object, or a single top-level section with a safe
// fallback to the default for that section.
export function useContent(section) {
  const content = useContext(ContentContext);
  if (!section) return content;
  return content?.[section] ?? defaultContent[section];
}

export default useContent;
