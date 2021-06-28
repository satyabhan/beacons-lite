import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import {beaconsRef} from "./firebase";
import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(1),
      width: '100%',
    },
  },
}))

function BeaconForm() {
  const classes = useStyles()
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const createBeacon = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const beacon = {
      linkTitle: linkTitle,
      linkUrl: linkUrl,
      done: false,
    };
    beaconsRef.push(beacon);
    setLinkTitle("");
    setLinkUrl("");
  };
  return (
    <form className={classes.root} onSubmit={createBeacon}>
      <TextField
        id="beacon-title"
        value={linkTitle}
        onChange={(e) => setLinkTitle(e.target.value)}
        label="Beacon title"
        variant="outlined"
      />
      <TextField
        id="beacon-url"
        value={linkUrl}
        onChange={(e) => setLinkUrl(e.target.value)}
        label="Beacon url"
        variant="outlined"
      />
      <Button color={'primary'} variant={'outlined'} type="submit" fullWidth>
        Add new link
      </Button>
    </form>
  );
}
export default BeaconForm;
