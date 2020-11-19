import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerNavgationItems, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

const SideMenu = (props) => {
    const[userName , setUserName]=useState(null)
    const[userImg , setUserImg]=useState(null)

    const sideMenubar = props.state.routes
    console.log('propss', sideMenubar )

    useEffect(()=>{
     checkData()
    }, sideMenubar)

 function checkData(){
    if(props.state.routes[1].params !== undefined){
        const userName =  props.state.routes[1].params.name
        const userPicture = props.state.routes[1].params.picture.data.url
        console.log('propss true hoa?', userName)
        setUserImg(userPicture)
        setUserName(userName)
    }
}
    return (
        
        <DrawerContentScrollView style={{ flexDirection: "row", marginTop: 20 }} {...props}>
            {userName && 
              <View>
                <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
                    <Image source={{ uri: userImg }}
                        style={styles.profile} />
                </TouchableOpacity>
                <Text style={styles.name}>{userName}</Text>
                </View>
                }
            <View style={styles.container}>
                <DrawerItemList {...props} />
            </View>
             
        </DrawerContentScrollView>
    )
}
export default SideMenu

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profile: {
        width: 90,
        height: 90,
        marginHorizontal: 24 * vw,
        borderWidth: 3,
        marginTop: vh * 5,
        borderRadius: 50,
        borderColor: "#f50a3d"
    },
    name: {
        fontSize: 2 * vh,
        marginVertical: 2 * vh,
        fontWeight: 'bold',
        color: "#444",
        marginHorizontal: 25 * vw
    },
});