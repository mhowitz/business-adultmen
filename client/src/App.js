import React from "react";
import Container from "./components/Container";
import { UserProvider } from "./contexts"

function App() {
  return (
    <UserProvider>
      <Container />
    </UserProvider>
  );
}

export default App;
