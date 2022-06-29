// Example of Google Sign In in React Native Android and iOS App
// https://aboutreact.com/example-of-google-sign-in-in-react-native/

// Import React in our code
import React, { useState, useEffect } from 'react';

// Import all the components we are going to use
import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	Image,
	ActivityIndicator,
	TouchableOpacity,
	TextInput
} from 'react-native';

// Import Google Signin
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

const App = () => {
	const [userInfo, setUserInfo] = useState(null);
	const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

	useEffect(() => {
		GoogleSignin.configure({
			scopes: ['https://www.googleapis.com/auth/drive.readonly'],
			webClientId: '243708133992-svcuj6lv79f9pobq5ccfcf91hfp2ja6h.apps.googleusercontent.com'
		});
		_isSignedIn();
	}, []);

	const _isSignedIn = async () => {
		const isSignedIn = await GoogleSignin.isSignedIn();
		if (isSignedIn) {
			alert('User is already signed in');
			// Set User Info if user is already signed in
			_getCurrentUserInfo();
		} else {
			console.log('Please Login');
		}
		setGettingLoginStatus(false);
	};

	const _getCurrentUserInfo = async () => {
		try {
			let info = await GoogleSignin.signInSilently();
			console.log('User Info --> ', info);
			setUserInfo(info);
		} catch (error) {
			if (error.code === statusCodes.SIGN_IN_REQUIRED) {
				alert('User has not signed in yet');
				console.log('User has not signed in yet');
			} else {
				alert("Unable to get user's info");
				console.log("Unable to get user's info");
			}
		}
	};

	const _signIn = async () => {
		// It will prompt google Signin Widget
		try {
			await GoogleSignin.hasPlayServices({
				// Check if device has Google Play Services installed
				// Always resolves to true on iOS
				showPlayServicesUpdateDialog: true
			});
			const userInfo = await GoogleSignin.signIn();
			console.log('User Info --> ', userInfo);
			setUserInfo(userInfo);
		} catch (error) {
			console.log('Message', JSON.stringify(error));
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				alert('User Cancelled the Login Flow');
			} else if (error.code === statusCodes.IN_PROGRESS) {
				alert('Signing In');
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				alert('Play Services Not Available or Outdated');
			} else {
				alert(error.message);
			}
		}
	};

	if (gettingLoginStatus) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	} else {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={{ flex: 1 }}>
					<View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
						<Image
							style={{ marginTop: 20, paddingTop: 40, height: 50, width: 200, resizeMode: 'contain' }}
							source={{
								uri:
									'https://scontent.fidr1-1.fna.fbcdn.net/v/t1.6435-9/94380088_158421515647128_2009838879695175680_n.png?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=q43iU1ZiwmoAX8iWLLD&_nc_ht=scontent.fidr1-1.fna&oh=00_AT-cYli8rjKVUElzx7ps7LulQXnHKaEP-bTeNUbhcCjqSA&oe=62E26F29'
							}}
						/>

						<View style={{ width: '90%' }}>
							<Text style={{ paddingTop: 70, color: '#000' }}>Welcome!</Text>

							<TextInput
								style={{
									backgroundColor: '#EDEDF1',
									padding: 15,
									marginVertical: 10,
									borderRadius: 10
								}}
								placeholder="Email"
							/>

							<TextInput
								secureTextEntry={true}
								style={{
									backgroundColor: '#EDEDF1',
									padding: 15,
									marginVertical: 10,
									borderRadius: 10
								}}
								placeholder="Password"
							/>

							<TouchableOpacity
								style={{
									width: '100%',
									backgroundColor: '#F95C3F',
									padding: 15,
									marginVertical: 10,
									borderRadius: 10
								}}
							>
								<Text style={{ color: '#fff', textAlign: 'center', width: '100%' }}>Login</Text>
							</TouchableOpacity>

							<Text style={{ color: '#F95C3F', paddingTop: 50, textAlign: 'center', width: '100%' }}>
								Forgot password?
							</Text>

							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									width: '100%',
									paddingTop: 30,
									backgroundColor: '#fff'
								}}
							>
								<TouchableOpacity
									onPress={_signIn}
									style={{
										backgroundColor: '#fff',
										elevation: 5,
										borderColor: '#D3D3D3',
										borderRadius: 10,
										width: '48%',
										borderWidth: 1,
										paddingVertical: 10,
										flexDirection: 'row',
										alignItems: 'center'
									}}
								>
									<Image
										style={{
											// backgroundColor:'red',
											paddingHorizontal: 30,
											height: 20,
											width: 20,
											resizeMode: 'contain'
										}}
										source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }}
									/>

									<Text style={{ color: '#F95C3F', width: '40%', textAlign: 'center' }}> Signup</Text>
								</TouchableOpacity>

								<View
									style={{
										backgroundColor: '#fff',
										elevation: 5,
										borderColor: '#D3D3D3',
										borderRadius: 10,
										width: '48%',
										borderWidth: 1,
										paddingVertical: 10,
										flexDirection: 'row',
										alignItems: 'center'
									}}
								>
									<Image
										style={{
											// backgroundColor:'red',
											paddingHorizontal: 30,
											height: 20,
											width: 20,
											resizeMode: 'contain'
										}}
										source={{ uri: 'https://cdn-icons-png.flaticon.com/512/145/145802.png' }}
									/>

									<Text style={{ color: '#6784B4', width: '50%', textAlign: 'center' }}>
										Facebook
									</Text>
								</View>
							</View>

							<Text style={{ paddingTop: 50, textAlign: 'center', width: '100%', color: '#000' }}>
								Don't have an account?
								<Text style={{ color: '#F95C3F' }}> Signup</Text>
							</Text>
						</View>
					</View>
				</View>
			</SafeAreaView>
		);
	}
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10
	},
	titleText: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		padding: 20
	},
	imageStyle: {
		width: 200,
		height: 300,
		resizeMode: 'contain'
	},
	buttonStyle: {
		alignItems: 'center',
		backgroundColor: '#DDDDDD',
		padding: 10,
		width: 300,
		marginTop: 30
	},
	footerHeading: {
		fontSize: 18,
		textAlign: 'center',
		color: 'grey'
	},
	footerText: {
		fontSize: 16,
		textAlign: 'center',
		color: 'grey'
	}
});
