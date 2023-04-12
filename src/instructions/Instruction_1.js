import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';

const FirstInstruction = ({ visible }) => {
    return (
        <Modal visible={visible} animationType="fade" transparent={true}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                <View style={{ backgroundColor: '#fff', padding: 20, width: '92%', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderRadius: 10, borderColor: 'red' }}>
                    <Image source={require('./../image/ok.jpg')} style={{ width: 250, height: 100 }} />
                    <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 20, color: 'red' }}>
                        İstediğiniz Araç
                    </Text>

                   
                </View>
            </View>
        </Modal>
    );
};

export default FirstInstruction;
