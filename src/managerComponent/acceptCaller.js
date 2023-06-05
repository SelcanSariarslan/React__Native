import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ConfirmationModal = (props) => {
    const callerData = props.CallerData;
    

    console.log("11111111111111111111111");
    console.log(callerData);


    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
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
            color:'red'
        },
        text: {
            fontSize: 16,
            marginBottom: 10,
        },
    });
    return (
        <Modal visible={true} animationType="fade" transparent={true}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                <View style={{ backgroundColor: '#fff', padding: 20, width: '92%', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderRadius: 10, borderColor: 'red' }}>
                    <View>
                    <Text style={{fontSize:40,color:'red',paddingBottom:20}}>Caller Information</Text>
                        {callerData.map((data, index) => (
                            <View style={styles.container}>
                                
                                <View style={styles.textContainer}>
                                <Image source={{ uri: data.caller_image}} style={styles.image} />
                                    <Text style={styles.label}>Caller Name: </Text>
                                    <Text style={styles.text}>{data.name} {data.surname}</Text>
                                    <Text style={styles.label}>Caller Location:</Text>
                                    <Text style={styles.text}>{data.caller_location}</Text>
                                    <Text style={styles.label}>Calling Status:</Text>
                                    <Text style={styles.text}>{data.calling_status}</Text>
                                    <Text style={styles.label}>Caller Status:</Text>
                                    <Text style={styles.text}>{data.caller_emergencylevel}</Text>
                                </View>
                            </View>
                        ))}
                    </View> 
                   
                   
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <TouchableOpacity onPress={props.oncancel} >
                            <Text style={{ fontSize: 18, color: 'red', paddingRight: '40%', fontSize: 40, fontWeight: 'bold' }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={props.onPress} >
                            <Text style={{ fontSize: 18, color: 'green', fontSize: 40, fontWeight: 'bold' }}>Accept</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmationModal;
