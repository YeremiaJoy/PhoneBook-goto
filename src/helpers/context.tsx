import { PropsWithChildren, createContext, useState } from "react";

export type VariableContent = {
  variables: Object;
  setVariables: Function;
};
// store favorite contact
export const VariablesListingContext = createContext<VariableContent>({
  variables: {},
  setVariables: () => {},
});

export default function Context({ children }: PropsWithChildren<{}>) {
  const [variables, setVariables] = useState({
    limit: 10,
    offset: 0,
  });

  return (
    <VariablesListingContext.Provider value={{ variables, setVariables }}>
      {children}
    </VariablesListingContext.Provider>
  );
}
