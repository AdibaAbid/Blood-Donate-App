import React from "react"
import * as Facebook from 'expo-facebook';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,

} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

const { width, height } = Dimensions.get('window')

function SignIn({ navigation }) {


    async function facebookLogIn() {
        await Facebook.initializeAsync({
            appId: '681522369161863',
        });
        const {
            type,
            token,
            expirationDate,
            permissions,
            declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile'],
        })

        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`);
            const userInfo = await response.json()
            console.log('userInfo', userInfo)
       
            navigation.navigate('Profile', userInfo)            
        } 
    }


    return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ ...StyleSheet, height: '80%', marginTop: '20%' }}>
                    <Image
                        source={require('../../../assets/blood-donation.png')}
                        style={{ height: '44%', width: '100%' }}
                    />
                    <Text
                        style={{
                            color: '#fc0328',
                            fontSize: 30,
                            fontWeight: 'bold',
                            alignSelf: 'center'
                        }}>
                        Save the Lifes
            </Text>
                    <Text
                        style={{
                            fontWeight: '300',
                            textAlign: 'center',
                            marginHorizontal: 55,
                            opacity: 0.4,
                            marginTop: 5
                        }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
            </Text>

                </View>
                <View
                    style={
                        {
                            height: height / 3,
                            justifyContent: 'flex-start',
                            marginTop: '-30%'
                        }}>
                    <View >
                        <TouchableOpacity>
                            <Text style={styles.button}
                                onPress={() => navigation.navigate('Welcome to Login')}>
                                SIGN IN
                </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Text style={styles.fbLoginBtn} 
                            onPress={facebookLogIn}>
                                CONNECT WITH FACEBOOK
                </Text>
                        </TouchableOpacity>

                    </View>
                </View>
          </View>
      
    )
}
export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical:5,
        backgroundColor: 'pink',
        marginHorizontal: 20,
        borderRadius: 25,
        fontSize: 18, 
        color: '#fc0328',
        textAlign: "center",
    },
    fbLoginBtn: {
        color:"#fff",
        textAlign: "center",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4267b2',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal:20,
        borderRadius: 20
    },
  
})