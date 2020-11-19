import React from 'react'
import { View, Text, Button, StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

export default function Chat({ navigation }) {
    return (
        <View>
            {/* Navbar */}
            <SafeAreaView>
                <View style={styles.header} >
                    <Icon name="menu" style={[{ fontSize: 10 * vw, marginTop: 5 * vh, paddingLeft: 5 * vw, }]}
                        onPress={() => navigation.openDrawer()} />
                </View>
            </SafeAreaView>
            {/* Navbar work end */}
            <Text>Chat</Text>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        marginBottom: 0,
        paddingBottom: 0
    }
});