import * as React from 'react';
// import { View, Text, Button, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, Button, StyleSheet, Dimensions, SafeAreaView, Alert } from 'react-native'
const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

import SignInScreen from '../../Screens/SignIn/index'
import SplashScreen from '../../Screens/Splash/index'
import LoginScreen from '../../Screens/Login/index'
import ProfileScreen from '../../Screens/Profile/index'
import SideMenu from '../../Screens/SideMenu/index'
import Chat from '../../Screens/Chat/index'
import Chatroom from '../../Screens/Chatroom/index'


import Donors from '../../Screens/Donors/index'
import ChatsTab from '../../Screens/Tabs/Chat'
import CallsTab from '../../Screens/Tabs/Calls'
import StatusTab from '../../Screens/Tabs/Status'

// import Icon from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { color } from 'react-native-reanimated';


import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();



function MainNavigator() {
  return (
    <Drawer.Navigator drawerContent={props => <SideMenu {...props} />}
      initialRouteName="SignInScreen">
      <Drawer.Screen
        options={{
          title: "Logout",
          drawerIcon: () =>
            <Feather name="log-out" size={30} color="#f71661" />
        }}
        name="Welcome to Our App" component={SignInScreen} />

      <Drawer.Screen
        options={{
          title: "Profile",
          drawerIcon: () =>
            <FontAwesome name="user" size={30} color="#f71661" />
        }}
        name="Profile" component={ProfileScreen} />
      <Drawer.Screen
        options={{
          title: "Donors",
          drawerIcon: () =>
            <FontAwesome name="heart" size={30} color="#f71661" />
        }}
        name="Donors" component={Donors} />
      <Drawer.Screen
        options={{
          title: "Chats",
          drawerIcon: () =>
            <FontAwesome name="wechat" size={30} color="#f71661" />
        }}
        name="Chatroom" component={ChatroomNavigator} />

      {/* <Drawer.Screen
       options={{
        title:"Logout",
        drawerIcon: () => 
        <Feather name="log-out" size={30} color="#f71661" />
      }}
      name="Logout" component={SignInScreen} /> */}
    </Drawer.Navigator>
  )
}
function ChatroomNavigator({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <View style={styles.header} >
              <Icon name="menu" style={[{color:"white", fontSize: 10 * vw, marginTop: 5 * vh, paddingLeft: 5 * vw, }]}
                onPress={() => navigation.openDrawer()} />
            </View>
          ),
          headerTitle: "Chats",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: 'pink' },
          headerTintColor: "#fc0328",
          
        }}
        name="Chat" component={Chat}
      />
      <Stack.Screen

        options={{
          // headerLeft: () => (
          //   <View style={styles.header} >
          //     <Icon name="menu" style={[{ fontSize: 10 * vw, marginTop: 5 * vh, paddingLeft: 5 * vw, }]}
          //       onPress={() => navigation.openDrawer()} />
          //   </View>
          // ),
          headerTitle: "Chatrooms",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: 'pink' },
          headerTintColor: "#fc0328"
        }}
        name="Chatroom" component={Chatroom}
      />
    </Stack.Navigator>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chats" component={ChatsTab} />
      <Tab.Screen name="Calls" component={CallsTab} />
      <Tab.Screen name="Status" component={StatusTab} />
    </Tab.Navigator>
  )
}

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerTitle: "Blood bank",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: 'pink' },
          headerTintColor: "#fc0328"
        }}
        name="Blood Donate App" component={SplashScreen} />

      <Stack.Screen name="Welcome to Login"
        options={{
          headerTitle: "Blood bank",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: 'pink' },
          headerTintColor: "#fc0328"
        }} component={LoginScreen} />

      <Stack.Screen
        options={{
          headerShown: false,
          headerTitle: "Blood bank",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: 'pink' },
          headerTintColor: "#fc0328"
        }}
        name="Welcome to Our App" component={MainNavigator} />
      {/* <Stack.Screen name="Profile" children={MainNavigator} /> */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
      // backgroundColor: '#FFFFFF',
      // paddingTop:-20*vh,
      // marginVertical:*vh,
      // marginBottom: 0,
      paddingBottom: 5*vh
  },
}
)