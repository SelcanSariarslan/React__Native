import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ConfirmationModal = (props) => {
    const callerData = props.CallerData;


   // console.log("11111111111111111111111");
   // console.log(callerData);


    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        image: {
            width: 200,
            height: 200,
            borderRadius: 10,
            marginRight: 10,
        },
        textContainer: {


        },
        label: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 5,
            color: 'darkred'
        },
        text: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
        },
    });
    return (
        <Modal visible={true} animationType="fade" transparent={true}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                <View style={{ backgroundColor: '#fff', padding: 20, width: '92%', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderRadius: 10, borderColor: 'red' }}>
                    <View>
                        <Text style={{ fontSize: 40, color: '#3b3945', fontWeight: 'bold', borderBottomWidth: 2, marginBottom: 15 }}>Caller Information</Text>
                        <Text style={styles.label}></Text>
                        {callerData.map((data, index) => (
                            <View style={styles.container}>
                                <View style={styles.textContainer}>
                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        <Text style={styles.label}>Caller Emergency Status: </Text>
                                        <Text style={styles.text}>{data.caller_emergencylevel}</Text>

                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        <Text style={styles.label}>Caller Name: </Text>
                                        <Text style={styles.text}>{data.caller_name} {data.caller_surname}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        <Text style={styles.label}>Caller message: </Text>
                                        <Text style={styles.text}>{data.caller_message}</Text>
                                    </View>
                                    <Text style={styles.label}>Photo sent by the caller:</Text>
                                    <Text style={styles.label}></Text>
                                    <Image source={{ uri: data.caller_image }} style={styles.image} />
                                    <Text style={styles.label}></Text>
                                    <Text style={styles.label}></Text>
                                    <Text style={styles.text}></Text>
                                </View>
                            </View>
                        ))}
                    </View>


                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={props.oncancel} >
                            <Text style={{ color: 'white', backgroundColor: 'red', fontSize: 30, fontWeight: 'bold', borderWidth: 2, padding: 5, borderRadius: 10, borderColor: 'red' }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={props.onPress} >
                            <Text style={{ color: 'white', backgroundColor: 'green', fontSize: 30, fontWeight: 'bold', borderWidth: 2, padding: 5, borderRadius: 10, borderColor: 'green' }}>Accept</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmationModal;
