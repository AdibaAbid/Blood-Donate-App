import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    StyleSheet ,
    StatusBar,
    Alert,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';

const LoginInScreen = ({navigation}) => {
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    const textInputChange = (val) => {
        if( val.trim().length >= 3 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = (userName, password) => {;

        if ( userName.length == 0 || password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }
        else{
            userName=""
            password=""
            Alert.alert(`Successfull Login ${data.username}`)
            navigation.navigate('Profile')

        }

    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
          <View style={styles.header}>
              <Text style={styles.text_header}>Welcome!</Text>
          </View>
          <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: 'pink'
            }]}
        >
            <Text style={[styles.text_footer, {
                color:'#fc0328'
            }]}>Username</Text>
            <View style={styles.action}>
                <Image source={require('../../../assets/user.png')}
                style={{ height: '80%'}}
                />
                <TextInput 
                    placeholder="Your Username"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: '#222'
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Username must be 3 characters long.</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color: '#fc0328',
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={'#fc0328'}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: '#222'
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }
            <TouchableOpacity>
                <Text style={{color: '#e06246', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={styles.button}>   
                <TouchableOpacity
                    onPress={() => {loginHandle( data.username, data.password )}}
                    style={[styles.signIn, {
                        borderColor: '#fc0328',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#fc0328'
                    }]}>LogIn</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#fc0328',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#fc0328'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default LoginInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#fff'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color:'#fc0328',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        // marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#222',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        backgroundColor: 'pink',
        marginVertical:5,
        height:35,
        
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });

































// import React, {Component} from "react"
// import {
//     View,
//     Text,
//     Image,
//     StyleSheet,
//     Dimensions

// } from "react-native"
// import { TouchableOpacity } from "react-native-gesture-handler"

// const {width, height} = Dimensions.get('window')
// class SignIn extends Component{
//     render(){
//         return(
//         <View style={{flex:1, backgroundColor:'white'}}>
//         <View style={{...StyleSheet, height:'80%', marginTop:'20%'}}>
//               <Image 
//               source={require('../../../assets/blood-donate.jpg')}
//               style={{ height: '44%', width: '100%'}}
//               />
//              <Text
//              style={{
//                  color:'#fc0328',
//                  fontSize:30,
//                  fontWeight:'bold',
//                  alignSelf:'center',
//                  marginTop:'5%'
//              }}>
//                 Save the Lifes
//             </Text>
//             <Text
//             style={{
//                 fontWeight:'300',
//                 textAlign:'center',
//                 marginHorizontal:55,
//                 opacity:0.4,
//                 marginTop:5
//             }}>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
//             </Text>
             
//         </View>
       
//         </View>
//         )
//     }
// }
// export default  SignIn 

// const styles = StyleSheet.create({
//     container: {
//         flex:1,
//         alignItems: 'center',
//         justifyContent:'center'
//     },
//     button: {
//         marginVertical:5,
//         backgroundColor: 'pink',
//         height:60,
//         marginHorizontal:20,
//         borderRadius: 35,
//         alignItems:'center',
//         justifyContent: 'center'
//     }
// })