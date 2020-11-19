import React from "react"
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions

} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

const {width, height} = Dimensions.get('window')

function SplashScreen( {navigation} ){
    return(
        <View style={{flex:1, backgroundColor:'white', backgroundColor:'#cfcfcf', justifyContent:'flex-end'}}>
        <View style={{...StyleSheet, height:'50%'}}>
              <Image 
              source={require('../../../assets/pink.jpg')}
              style={{flex:1, height: null, width: null}}
              />         
        </View>
        <View 
        style={
            {height: height/3, 
            justifyContent:'center',
            marginTop:'-10%'
             }}>
            <View style={styles.button}>
                <TouchableOpacity>
                <Text 
                style={{fontSize:20, fontWeight: 'bold', color:'#fc0328'}}
                onPress={()=> navigation.navigate('Welcome to Our App')}
                >   
                    Get Started
                </Text>
                </TouchableOpacity>
            </View> 
        </View> 
    </View>
       
    )
}

export default  SplashScreen 

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent:'center'
    },
    button: {
        marginVertical:5,
        backgroundColor: 'pink',
        height:60,
        marginHorizontal:20,
        borderRadius: 35,
        alignItems:'center',
        justifyContent: 'center'
    }
})