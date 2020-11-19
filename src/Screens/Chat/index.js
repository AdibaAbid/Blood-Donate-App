import React, {useEffect, useState} from 'react'
import { View, Text, Button, StyleSheet, Dimensions, SafeAreaView, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {getAllDonors, joinRoom} from '../../config/firebase/firebase'

const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;


export default function Chat({ navigation }) {
  const[donors, setDonors]= useState(null)
  const [friendID, setFriendID] = useState(null)
  
useEffect(() => {
    fetchData();
  }, []);

const fetchData = async () => {
try{
    const response = await getAllDonors()
    const allDonors = []
    response.forEach(doc=>{
        allDonors.push({...doc.data(), id: doc.id})
        // setFriendID(doc.id)
        console.log('data aya?????', allDonors)
        setDonors(allDonors)
    })
}
catch(e){
    Alert.alert(e.message)
}
}
const createRoomForChat =async (friendID)=>{
   await joinRoom(friendID)

}  
    return (
            <View>
                <View>
                    {/* List of nearest  data */}
                    <FlatList
                        keyExtractor={item => item.id}
                        ListFooterComponentStyle={styles.listHeaderStyle}
                        data={donors}
                        renderItem={({ item }) => (
                            <View style={styles.list}>
                                <Text style={{fontSize:18}}>Name: {item.fName}</Text>
                             <Button
                             title="Start Chat"
                             onPress={()=> {
                                 createRoomForChat(item.id)
                                 navigation.navigate('Chatroom',{userID: item.id})
                                }
                                 }/>
                            </View>
                        )}
                    />
                    {/* nearest data end */}
                    {/* <Button
                    title="Chat start"
                    onPress={()=> navigation.navigate('Chatroom')}/> */}

                </View>

            </View>
    )
}
const styles = StyleSheet.create({
 list: {
        marginBottom: 20,
        padding: 20,
        backgroundColor: 'pink',
        textAlign: "center",
        alignItems: "center",
      },
      listHeaderStyle: {
        height: 25 * vh,
        width: '100%',
        alignItems: 'center',
        marginBottom:10*vh,
      },
});