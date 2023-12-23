import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/router/router";

function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
export default App;
