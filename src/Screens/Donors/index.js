import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, Dimensions, SafeAreaView, Alert, } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
// import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';
import * as firebase from 'firebase'
import 'firebase/firestore';
import { getAllDonors } from '../../config/firebase/firebase'


const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

export default function Donor({ navigation }) {
  const [data, setData] = useState([])
  const [errorMsg, setErrorMsg] = useState(null);



  useEffect(() => {
    getCurrentLocation()
    // userData()
    fetchData();
  }, []);

  //Location work
  async function locationPermission() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    return location
  }

  async function getCurrentLocation() {
    const result = await locationPermission()
    const currentLocation = result.coords
    return currentLocation
  }

  const userData = async () => {
    try {
      const currentLocation = await getCurrentLocation()
      console.log('current Location aii?', currentLocation)
      const myLat = currentLocation.latitude
      const myLan = currentLocation.longitude

      const dataList = []
      const userData = await getAllDonors()
      userData.forEach(doc => {
        // dataList.push({ ...doc.data(), id: doc.id })
        // console.log('*********', dataList)
        let lat = doc.data().location.coords.latitude
        let lon = doc.data().location.coords.longitude
        // Calculate nearest distance (10km)
        const response = getDistanceFromLatLonInKm(lat, lon, myLat, myLan)

        if (response) {
          dataList.push({ ...doc.data(), distance: response })
          setData(dataList)
        }
        console.log('distance in km**', response)
        console.log('lat long', lat, lon)
        console.log('name of residence**', doc.data().fName)
      })

    } catch (e) {
      console.log(e.message)
      Alert.alert(e.message)
    }
  }

  const fetchData = async () => {
    const availableDonors = []

    const currentLocation = await getCurrentLocation()
    console.log('current Location aii?', currentLocation)
    const myLat = currentLocation.latitude
    const myLan = currentLocation.longitude

    const db = firebase.firestore()
    await db.collection("userInfo")
      .onSnapshot(function (data) {
        console.log("data aya firebase se", data.docs.map(doc =>({...doc.data(), id:doc.id}) ))

        data.docs.map(doc => {
          let lat = doc.data().location.coords.latitude
          let lon = doc.data().location.coords.longitude
          // Calculate nearest distance (10km)
          const response = getDistanceFromLatLonInKm(lat, lon, myLat, myLan)

          if (response) {
            availableDonors.push({ ...doc.data(), distance: response, id: doc.id })
            setData(availableDonors)
          }
          console.log('distance in km**', response)
          console.log('lat long', lat, lon)
          console.log('name of residence**', doc.data().fName)
          console.log('id of residence**', doc.id)

        })
      })
  }

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    const ansInKM = Math.round(d)
    if (ansInKM <= 10) {
      return ansInKM
    } else {
      const msg = `Too Far from you ${ansInKM}`
      return msg
    }
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  return (
    <View>
      {/* Navbar */}
      <SafeAreaView >
        <View style={styles.header} >
          <Icon name="menu" style={[{color:'white', fontSize: 10 * vw, marginTop: 5 * vh, paddingLeft: 5 * vw, }]}
            onPress={() => navigation.openDrawer()} />
          <Text style={{marginTop:6*vh, fontSize:20, color:'#fc0328',}}>Nearest Donor Details</Text>
          <View >
        </View>
        </View>
       
      </SafeAreaView>
      {/* Navbar work end */}

      {/* List of nearest  data */}
      <FlatList
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => (
          <Button
            title="Insert new data"
            onPress={() => navigation.navigate('Profile')} />
        )}
        ListFooterComponentStyle={styles.listHeaderStyle}
        data={data}
        renderItem={({ item }) => (
          <View style={styles.list}>
            <Text style={{fontSize:18}}>Name: {item.fName} {item.lName}</Text>
            <Text style={{fontSize:16}}>Blood Group: {item.bloodGroup}</Text>
            <Text>Distance from you: {item.distance}km</Text>

          </View>
        )}
      />
      {/* nearest data end */}
    </View>

  )
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: 'pink',
    paddingTop: 20,
    marginBottom: 0,
    paddingBottom: 0,
    display:"flex",
    flexDirection:"row",
    justifyContent: "space-between",
  },
  list: {
    marginBottom: 24,
    padding: 30,
    backgroundColor: 'pink',
    fontSize: 24,
    textAlign: "center",
    alignItems: "center",
  },
  listHeaderStyle: {
    height: 25 * vh,
    width: '100%',
    alignItems: 'center',
  },
});