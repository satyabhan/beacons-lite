import React, {useState} from "react"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import "./Beacon.scss"
import {beaconsRef, increment} from "./firebase"
import {Button, Grid, makeStyles, Typography, Switch, FormControlLabel} from "@material-ui/core"
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
			textTransform: 'none',
			borderRadius: 0,
		},
		'& .MuiTypography-root': {
			padding: theme.spacing(1),
		},

	},
	round: {
		borderRadius: '8px !important',
	}
}))

function Beacon(props: any) {
	const {beacon, editMode, divider} = props
	const classes = useStyles()
	const [linkTitle, setLinkTitle] = useState(beacon.linkTitle)
	const [linkUrl, setLinkUrl] = useState(beacon.linkUrl)

	const validUrl = () => {
		if (!linkUrl) return false
		try {
			new URL(linkUrl)
		} catch (e) {
			//console.error(e);
			return false
		}
		return true
	}

	const validTitle = () => {
		return !!linkTitle;

	}

	const validBeacon = () => {
		return validTitle() && validUrl()
	}

	const updateBeacon = (e: React.FormEvent<EventTarget>) => {
		e.preventDefault()
		const newBeacon = {
			linkTitle: linkTitle,
			linkUrl: linkUrl,
			isValid: validBeacon(),
		}
		console.log('newBeacon', newBeacon)
		beaconsRef.child(beacon.id).update(newBeacon)
	}

	return (
		editMode ?
			<Grid container className={classes.root}>
				<Grid item xs={12}>
					<TextField
						value={linkTitle}
						onChange={(e) => {
							setLinkTitle(e.target.value)
						}}
						error={!validTitle()}
						onBlur={updateBeacon}
						label="Beacon title"
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						value={linkUrl}
						onChange={(e) => {
							setLinkUrl(e.target.value)
						}}
						error={!validUrl()}
						onBlur={updateBeacon}
						label="Beacon url"
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12} container justify={'space-between'} alignContent={'center'}>
					<FormControlLabel
						control={<Switch
							edge="end" checked={beacon.makeRound} onChange={(e) => {
							const newBeacon = {
								makeRound: !beacon.makeRound,
							}
							beaconsRef.child(beacon.id).update(newBeacon)
						}}
							inputProps={{ "aria-labelledby": "switch-list-label-bluetooth" }}
						/>}
						label="Circular"
					/>
					<Typography variant={'h5'}>
						{beacon.totalClicks? 'Clicks: ' + beacon.totalClicks : ''}
					</Typography>
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
          <Button color={'primary'} className={beacon.makeRound? classes.round : ''} variant={'outlined'} size={'large'}  id={beacon.id} type="submit" fullWidth onClick={(e) => {
						e.preventDefault()
						const newBeacon = {
							totalClicks: increment,
						}
						beaconsRef.child(beacon.id).update(newBeacon)
					}}>
						{beacon.linkTitle}
          </Button>
        </Grid>
				}
			</Grid>
	)
}

export default Beacon