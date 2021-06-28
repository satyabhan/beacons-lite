import React from "react";
import BeaconForm from "./BeaconForm";
import BeaconList from "./BeaconList";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./App.scss";
function App() {
  return (
    <div className="App">
      <Container className="conatiner" maxWidth="sm">
        <Card>
          <CardContent>
            <h3>Beacons Lite</h3>
            <BeaconList />
            <BeaconForm />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default App;
