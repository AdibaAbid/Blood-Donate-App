import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

export default function Status({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Status</Text>
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