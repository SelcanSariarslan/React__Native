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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 1 }}>


                <View style={{ backgroundColor: '#fff', padding: 2, width: '95%', height: '85%', borderWidth: 2, borderRadius: 10, borderColor: 'red' }}>
                    <ImageBackground source={require('./../image/background.jpeg')} style={{ flex: 1, width: '100%', height: '100%' }}>
                    <View style={{  padding: 20, width: '95%', height: '85%', borderWidth: 0, borderRadius: 10, borderColor: 'red' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 20, color: 'red' }}>How to Use!!!</Text>
                        </View>
                        <View style={{}}></View>
                        <View style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', borderRadius: 3 }}>
                            <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Fast Explenation</Text>
                        </View>

                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20, paddingTop: 50 }}>First:</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Second:</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Third:</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>For More Details please Click </Text>
                            <TouchableOpacity onPress={handleConfirm} style={{ flex: 1 }}>
                                <Text style={{ fontSize: 20, color: 'red', fontWeight: 'bold' }}>Here</Text>
                            </TouchableOpacity>
                        </View>

                        {modalVisible && (
                            <View>
                                <FirstInstruction
                                    onCancel={onCancel}
                                    onConfirm={handleConfirm} />
                            </View>
                        )}

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 20, paddingTop: '50%' }}>
                            <TouchableOpacity onPress={onCancel} style={{ width: 110, height: 40, backgroundColor: 'red', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
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