import React, { useState } from "react";
import Counter from "./Counter";
import CounterHooks from "./CounterHooks";

export const ThemeContext = React.createContext();

function App() {
  const [theme, setTheme] = useState("perple");
  return (
    <ThemeContext.Provider value={{ background: theme }}>
      Counter
      < Counter initialCount={0} />
      Counter Hooks
      < CounterHooks initialCount={0} />
      <button onClick={() => setTheme(prevTheme => { 
        return prevTheme === "red" ? "green" : "red";
        })}>Toggle Theme</button>
    </ThemeContext.Provider>
  )
}

export default App;
