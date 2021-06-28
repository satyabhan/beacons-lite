import React, {useEffect, useState} from "react"
import AddBeacon from "./AddBeacon";
import BeaconList from "./BeaconList";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./App.scss";
import {Grid} from '@material-ui/core'
import {beaconsRef} from './firebase'

function App() {
  const [beacons, setBeacons] = useState<any>([]);
  useEffect(() => {
    beaconsRef.on('value', (snapshot) => {
      const items = snapshot.val();
      const newState = [];
      for (const item in items) {
        newState.push({
          id: item,
          linkTitle: items[item].linkTitle,
          linkUrl: items[item].linkUrl,
          isValid: items[item].isValid
        });
      }
      setBeacons(newState)
    });
  }, [])

  function BeaconsEditor(props: { beacons: [] }) {
    const {beacons} = props
    return <Container className="conatiner">
      <Card>
        <CardContent>
          <h3>Beacons Lite Editor</h3>
          <BeaconList beacons={beacons} editMode/>
          <AddBeacon/>
        </CardContent>
      </Card>
    </Container>
  }

  function BeaconsRenderer(props: { beacons: [] }) {
    const {beacons} = props
    return <Container className="conatiner">
      <Card>
        <CardContent>
          <h3>Beacons Lite Renderer</h3>
          <BeaconList beacons={beacons}/>
        </CardContent>
      </Card>
    </Container>
  }

  return (
    <div className="App">
      <Grid container>
        <Grid item xs={12} sm={6}>
          <BeaconsEditor beacons={beacons}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <BeaconsRenderer beacons={beacons}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
