import React, {useEffect, useState} from "react"
import AddBeacon from "./AddBeacon"
import BeaconList from "./BeaconList"
import Container from "@material-ui/core/Container"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import "./App.scss"
import {Button, Grid} from '@material-ui/core'
import {beaconsRef} from './firebase'
import firebase from "firebase"


function signIn() {
	const provider = new firebase.auth.GoogleAuthProvider()
	firebase.auth()
		.signInWithPopup(provider)
		.then((result) => {
			/** @type {firebase.auth.OAuthCredential} */
			const credential = result.credential
			console.log('credential', credential)

			// This gives you a Google Access Token. You can use it to access the Google API.
			// @ts-ignore
			const token = credential.accessToken
			console.log('token', token)
			// The signed-in user info.
			const user = result.user
			console.log('user', user)
			// ...
		}).catch((error) => {
		// Handle Errors here.
		const errorCode = error.code
		console.log('errorCode', errorCode)
		const errorMessage = error.message
		console.log('errorMessage', errorMessage)
		// The email of the user's account used.
		const email = error.email
		console.log('email', email)
		// The firebase.auth.AuthCredential type that was used.
		const credential = error.credential
		console.log('credential', credential)
		// ...
	})
}

function signOut() {
	firebase.auth().signOut().then(() => {
		console.log('signed out')
	}).catch((error) => {
		console.log('signed out error', error.toJSON())
	})
}

function App() {
	const [beacons, setBeacons] = useState<any>([])
	const [loggedInUser, setLoggedInUser] = useState<firebase.User | null>(null)

	firebase.auth().onAuthStateChanged((user) => {
		setLoggedInUser(user)
	})

	useEffect(() => {
		if (loggedInUser) {
			beaconsRef.on('value', (snapshot) => {
				const items = snapshot.val()
				const newState = []
				for (const item in items) {
					newState.push({
						id: item,
						linkTitle: items[item].linkTitle,
						linkUrl: items[item].linkUrl,
						isValid: items[item].isValid,
						makeRound: items[item].makeRound,
						totalClicks: items[item].totalClicks,
					})
				}
				setBeacons(newState)
			})
		} else {
			setBeacons([])
		}
	}, [loggedInUser])

	function BeaconsEditor(props: { beacons: [] }) {
		const {beacons} = props
		return <Container className="conatiner">
			<Card>
				<CardContent>
					<Grid item xs={12} container justify={'space-between'}>
							<h3>Beacons Lite Editor</h3>
							<Button color={'primary'} variant={'outlined'} type="submit" size={"small"}
											onClick={signOut}>
								Log out
							</Button>

					</Grid>
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

	if (!loggedInUser) {
		return (
			<div className="App">
				<Container className="conatiner">
					<Card>
						<CardContent style={{textAlign: 'center'}}>
							<h3>Welcome to beacons lite</h3>
							<Button color={'primary'} variant={'outlined'} type="submit"
											onClick={loggedInUser ? signOut : signIn}>
								Login
							</Button>
						</CardContent>
					</Card>
				</Container>
			</div>
		)
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
	)
}

export default App
