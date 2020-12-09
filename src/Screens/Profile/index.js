import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  Image,
  ActivityIndicator,
  TextInput,
  Dimensions, SafeAreaView,
  Alert,
} from 'react-native';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"

import { Picker } from '@react-native-community/picker';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons';
import { setUserInformation } from '../../config/firebase/firebase'
import * as Location from 'expo-location';
// import { white } from 'react-native-paper/lib/typescript/src/styles/colors';
import * as SecureStore from 'expo-secure-store';

const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;


const ProfileScreen = ({ route, navigation }) => {
  console.log('route***', route)
  const userName = route.params.name
  const userPicture = route.params.picture.data.url
  const userID = route.params.id
  SecureStore.setItemAsync('userID', userID)
  // const syncData =  SecureStore.getItemAsync('userID')
  // console.log('sync data aya-----------', syncData.id)


  const [isImageLoading, setImageLoadStatus] = useState(false);
  const [image, setImage] = useState(false);

  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [location, setLocation] = useState('')
  const [city, setCity] = useState("")
  const [bloodGroup, setBloodGroup] = useState("")
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    cameraPermission()
    locationPermission()

  }, []);

  //Location work
  async function locationPermission() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
  }

  async function getLocation() {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    if (errorMsg) {
      console.log('errorr*****', errorMsg)
    } else if (location) {
      setLocation(location)
    }
  }
  //Location work end 

  //Image picker work
  async function cameraPermission() {
    console.log("hello")

    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  //Image picker work end

  //Submit data and safe data in firebase
  const registerUserInfo = () => {
    let userData = {
      fName:fName,
      lName:lName,
      email:email,
      phoneNum:phoneNum,
      location:location,
      city:city,
      bloodGroup:bloodGroup
    }
    console.log('userData****', userData)
    setUserInformation(userData)
    Alert.alert("Successfully Submit data")
    setFName("")
    setLName("")
    setPhoneNum("")
    setCity("")
    setEmail("")
    setLocation("")
    setBloodGroup("")
  }
  //Firebase work end


  return (

    <View >
    
      {/* navBar work */}
      <SafeAreaView>
        <View style={styles.header} >
          <Icon name="menu" style={[{ fontSize: 10 * vw, marginTop: 8 * vh, paddingLeft: 5 * vw, color:'white' }]}
            onPress={() => navigation.openDrawer()} />
        </View>
      </SafeAreaView>

      {/* Image picker work */}
      <ScrollView>
      <View style={styles.container} >
        <View style={{ marginVertical: 5*vh, marginHorizontal: 26 * vw }}>
          {
            image ? <Image
              style={{ width: 150, height: 150, borderRadius: 150, position: "relative" }}
              source={{ uri: image }}
              onLoadEnd={() => setImageLoadStatus(true)}
            /> :
              <View>
                <Image
                  style={{ width: 150, height: 150, borderRadius: 150, position: "relative" }}
                  source={{ uri: userPicture }}
                  onLoadEnd={() => setImageLoadStatus(true)}
                />
                <ActivityIndicator size="large" color="#0000ff" animating={!isImageLoading} style={{ position: "absolute" }} />
              </View>
          }
          <Text style={{ fontSize: 22, marginVertical: 5, color: '#fff' }}>Hi {userName}!</Text>

          <View style={{ position: 'absolute', bottom: 0, left: 30 * vw, top: 15 * vh, right: 5 * vw }}>
            <FontAwesome name="plus-circle" size={50} color="pink"
              onPress={pickImage} />
          </View>
          {/* Image picker work end */}

          {/* Form work */}
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#444" size={20} />
            <TextInput
              placeholder="First Name"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: "#444",
                },
              ]}
              onChangeText={Fname => setFName(Fname)}
              value={fName}
            />
          </View>

          <View style={styles.action}>
            <FontAwesome name="user-o" color="#444" size={20} />
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: "#444",
                },
              ]}
              onChangeText={Lname => setLName(Lname)}
              value={lName}
            />
          </View>

          <View style={styles.action}>
            <FontAwesome name="phone" color="#444" size={20} />
            <TextInput
              placeholder="Phone"
              placeholderTextColor="#666666"
              keyboardType="number-pad"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: "#444",
                },
              ]}
              onChangeText={phoneNum => setPhoneNum(phoneNum)}
              value={phoneNum}
            />
          </View>
          
            <View style={styles.action}>
              <FontAwesome name="envelope-o" color="#444" size={20} />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#666666"
                keyboardType="email-address"
                autoCorrect={false}
                style={[
                  styles.textInput,
                  {
                    color: "#444",
                  },
                ]}
                onChangeText={email => setEmail(email)}
                value={email}
              />
            </View>

            <View style={styles.action}>
              <FontAwesome name="globe" color="#444" size={20} />
              <TextInput
                placeholder="Location"
                placeholderTextColor="#666666"
                autoCorrect={false}
                style={[
                  styles.textInput,
                  {
                    color: "#444",
                  },
                ]}
                onChangeText={getLocation}
                value={location}
              />
            </View>

            <View style={styles.action}>
              <Icon name="map-marker-outline" color="#444" size={20} />
              <TextInput
                placeholder="City"
                placeholderTextColor="#666666"
                autoCorrect={false}
                style={[
                  styles.textInput,
                  {
                    color: "#444",
                  },
                ]}
                onChangeText={city => setCity(city)}
                value={city}
              />
            </View>
            
            <Picker
              selectedValue={bloodGroup}
              style={{ height: 50, width: vw*100, color:'#fff' }}
              onValueChange={bloodGroup => setBloodGroup(bloodGroup)}
              value={bloodGroup}
            >
              <Picker.Item label="Select your Blood group" value="0"/>
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="O-" value="O-" />
              <Picker.Item label="Ab+" value="AB+" />
              <Picker.Item label="B-" value="B-" />
            </Picker>
            
            <TouchableOpacity style={styles.commandButton}>
              <Text style={styles.panelButtonTitle}
                onPress={registerUserInfo}
              >Submit</Text>
            </TouchableOpacity>
          </View>

        </View>
        </ScrollView>
      </View>
   

  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: -3 * vh,
    backgroundColor: "#de7192",
    height: 100 * vh,

  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 6,
    marginHorizontal: -6 * vw 
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
    height: 30,
    width: 100 * vw
  },
  // container: {
  //   flex: 1,
  // },
  commandButton: {
    padding: 15,
    borderRadius: 30,
    backgroundColor: 'pink',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#de7192',
    // color:'white'
    // paddingTop: 10,
    // fontcolor:white,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fc0328',
    // color: 'white',
  },
});