import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';

const HelpModel = ({ visible, onCancel, onDetails }) => {
    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 7 }}>

                <View style={{ backgroundColor: '#fff', padding: 20, width: '95%', height: '84%', borderWidth: 2, borderRadius: 10, borderColor: 'red' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 20, color: 'red' }}>How to Use!!!</Text>
                    </View>
                    <View style={{  }}></View>
                    <View style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'center',borderRadius: 3 }}>
                        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Fast Explenation</Text>
                    </View>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20, paddingTop: 50 }}>First:</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Second:</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Third:</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>For More Details please Click </Text>
                        <TouchableOpacity onPress={onDetails} style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20, color: 'red', fontWeight: 'bold' }}>Here</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 20, paddingTop: '50%' }}>


                        <TouchableOpacity onPress={onCancel} style={{ width: 110, height: 40, backgroundColor: 'red', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
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