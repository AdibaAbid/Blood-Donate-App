import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

export default function Calls({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Calls</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
  });