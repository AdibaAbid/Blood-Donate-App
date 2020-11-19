import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { sendMessageToDb, getMessages } from '../../config/firebase/firebase'
import * as SecureStore from 'expo-secure-store';

const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

export default function Chatroom({ route }) {
    const chatID = route.params.userID
    console.log('route from chatroom*****', chatID)

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [userOneId, setUserOneId] = useState(null)

    useEffect(() => {
        renderMessages()
    }, [])

    const renderMessages = async () => {
        const userID = await SecureStore.getItemAsync('userID')
        setUserOneId(userID)
        console.log('user UID*****', userID)
        const response = await getMessages(chatID)
        const tempMessages = []
        response.forEach(doc => {
            tempMessages.push({ ...doc.data(), textId: doc.id })

            // console.log('tempmessages*******', dbDate)
            // console.log('dateeeee*******', new Date(dbDate))

        })
        setMessages(tempMessages)
    }

    const sendMessage = async () => {
        console.log('hello chatroom', message, chatID)
        await sendMessageToDb(message, chatID)
        renderMessages()
        setMessage('')
    }
    console.log('messagessss', messages)
    return (
        <View style={styles.outerContainer}>
            <View style={styles.messagesContainer}>
                <ScrollView >
                    {
                        messages.map(item => {
                            let date = item.timestamp.toDate().toDateString();
                            let time = item.timestamp.toDate().toLocaleTimeString('en-US');
                            return <><View style={{ ...styles.textContainer, alignSelf: userOneId === item.userID ? "flex-end" : "flex-start" }} key={item.textId}>
                                <Text style={styles.text}>{item.message}</Text>
                                <Text style={{ ...styles.duration, marginRight: userOneId === item.userID ? 10 : 110 }}>{date}, {time}</Text>
                            </View>
                            </>
                        })
                    }
                </ScrollView>
            </View>

            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Enter your message'
                    onChangeText={msg => setMessage(msg)}
                    value={message}>
                </TextInput>
                <TouchableOpacity>
                    <View style={styles.sendButton}>
                        <FontAwesome
                            name="send"
                            size={30}
                            color="#d61c54"
                            onPress={sendMessage}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#fce8f1',
        width: '85%',
        position: 'absolute',
        bottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
        flex: 1
    },
    input: {
        fontSize: 14,
        color: '#555',
        paddingHorizontal: 10,
        flex: 1
    },
    textContainer: {
        marginVertical: 2*vh,
        marginBottom:5*vh,
        alignSelf: 'flex-end',
        maxWidth: 220,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#f75284',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
    },
    text: {
        color: '#fff',
    },
    outerContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
        backgroundColor: 'pink',
    },
    messagesContainer: {
        backgroundColor: '#FFF',
        height: '92%',
        paddingHorizontal: 20,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        paddingTop: 20
    },
    duration: {
        color: '#b0adac',
        fontSize: 9,
        flex: 1,
        top: 40,
        position: 'absolute',
    },
});