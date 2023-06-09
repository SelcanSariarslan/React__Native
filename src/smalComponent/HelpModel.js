import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import FirstInstruction from '../instructions/Instruction';
import { ImageBackground } from 'react-native';


const HelpModel = ({ visible, onCancel, onDetails, oncancelShow }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [showDetailes, setshowDetailes] = useState(false);
    const handleCancel = () => {
        setModalVisible(false);
    };
    const handleConfirm = () => {
        setModalVisible(true);

    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 0 }}>


                <View style={{ backgroundColor: '#fff', padding: 2, width: '95%', height: '87%', borderWidth: 2, borderRadius: 10, borderColor: 'red' }}>
                    <ImageBackground source={require('./../image/background.jpeg')} style={{ flex: 1, width: '100%', height: '100%' }}>
                    <View style={{  padding: 20, width: '95%', height: '85%', borderWidth: 0, borderRadius: 10, borderColor: 'red' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 20, color: 'red' }}>How to Use!!!</Text>
                        </View>
                        <View style={{}}></View>
                        <View style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', borderRadius: 3 }}>
                            <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Fast Explenation</Text>
                        </View>

                         <Text style={{ color:'red', fontSize: 18, fontWeight: 'bold', marginBottom: 0, paddingTop: 20 }}>First(Vehicle Page):</Text>
                        <Text style={{ fontSize: 18, marginBottom: 20 }}>You have to select a service from the vehicles page to call a service.</Text>
                        <Text style={{ color:'red', fontSize: 18, fontWeight: 'bold', marginBottom: 0 }}>Second(Station Page):</Text>
                        <Text style={{ fontSize: 18, marginBottom: 20 }}>After selecting the service, you can specify the level of urgency on the station page, describe your situation in text, voice, and photo and call the service by clicking the call button.</Text>
                        <Text style={{ color:'red', fontSize: 18, fontWeight: 'bold', marginBottom: 0 }}>Third(Map Page):</Text>
                        <Text style={{ fontSize: 18, marginBottom: 20 }}>You can cancel the service you have called in the map section by clicking the cancel button or you can look at your location on the map belove</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>For More Details please Click </Text>
                            <TouchableOpacity onPress={handleConfirm} style={{ flex: 1 }}>
                                <Text style={{ fontSize: 30, color: 'red', fontWeight: 'bold' }}>Here</Text>
                            </TouchableOpacity>
                        </View>

                        {modalVisible && (
                            <View>
                                <FirstInstruction
                                    onCancel={onCancel}
                                    onConfirm={handleConfirm} />
                            </View>
                        )}

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '15%'}}>
                            <TouchableOpacity onPress={onCancel} style={{ width: 110, height: 40, backgroundColor: 'red', borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>Cancel</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

            </View>

        </Modal>
    );
};

export default HelpModel;


/**
 <TouchableOpacity onPress={onConfirm}>
              <Text style={{ fontSize: 18, color: 'green', fontSize: 20,fontWeight:'bold' }}>Evet</Text>
            </TouchableOpacity>
 */