import React from "react";
import {beaconsRef} from "./firebase";
import { Button } from "@material-ui/core";


function AddBeacon() {
  const createBeacon = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const beacon = {
      linkTitle: '',
      linkUrl: '',
      isValid: false,
    };
    beaconsRef.push(beacon);
  };
  return (
    <Button color={'primary'} variant={'outlined'} type="submit" fullWidth onClick={createBeacon}>
      Add new link
    </Button>
  );
}
export default AddBeacon;
