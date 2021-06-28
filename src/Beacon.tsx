import React, {useState} from "react"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import "./Beacon.scss"
import {beaconsRef} from "./firebase"
import {Button, Grid, makeStyles} from "@material-ui/core"
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(1),
			width: '100%',
		},
		'& .MuiButton-root': {
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(1),
			width: '100%',
		},
	},
}))

function Beacon(props: any) {
	const {beacon, editMode, divider} = props
	const classes = useStyles()
	const [linkTitle, setLinkTitle] = useState(beacon.linkTitle)
	const [linkUrl, setLinkUrl] = useState(beacon.linkUrl)

	const isBeaconValid = () => {
		return linkTitle !== '' && linkUrl !== ''
	}

	const updateBeacon = (e: React.FormEvent<EventTarget>) => {
		e.preventDefault()
		const newBeacon = {
			linkTitle: linkTitle,
			linkUrl: linkUrl,
			isValid: isBeaconValid(),
		}
		beaconsRef.child(beacon.id).set(newBeacon)
	}

	return (
		editMode ?
			<Grid container className={classes.root}>
				<Grid item xs={12}>
					<TextField
						id="beacon-title"
						value={linkTitle}
						onChange={(e) => {
							setLinkTitle(e.target.value)
						}}
						onBlur={updateBeacon}
						label="Beacon title"
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="beacon-url"
						value={linkUrl}
						onChange={(e) => {
							setLinkUrl(e.target.value)
						}}
						onBlur={updateBeacon}
						label="Beacon url"
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12} style={{textAlign: 'right'}}>
					<IconButton aria-label="delete" onClick={e => beaconsRef.child(beacon.id).remove()}>
						<DeleteIcon fontSize="large"/>
					</IconButton>
				</Grid>
				{divider && <Grid item xs={12}>
          	<Divider/>
        	</Grid>
				}
			</Grid> :
			<Grid container className={classes.root}>
				{beacon.isValid && <Grid item xs={12}>
						<Button color={'primary'} variant={'outlined'} type="submit" fullWidth>
							{beacon.linkTitle}
						</Button>
					</Grid>
				}
			</Grid>
	)
}

export default Beacon