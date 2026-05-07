import { useMemo } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store/store";


interface StoreProviderProps {
  children: React.ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const store = useMemo(() => makeStore(), []);

  return <Provider store={store}>{children}</Provider>;
}