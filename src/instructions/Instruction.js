import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ImageBackground } from 'react-native';


const FirstInstruction = ({ visible, onCancel, onConfirm }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigation = useNavigation();

    const handleCancel = () => {
        onCancel();
    };

    const handleConfirm = () => {
        if (currentPage === 1) {
            setCurrentPage(2);
        } else if (currentPage === 2) {
            setCurrentPage(3);

        } else {
            onConfirm();
            handleCancel();
        }
    };

    const handlePrevious = () => {
        if (currentPage === 2) {
            setCurrentPage(1);
        }
        if (currentPage === 3) {
            setCurrentPage(2);
        }
    };

    const handleNext = () => {
        if (currentPage === 1) {
            setCurrentPage(2);
        }
        if (currentPage === 2) {
            setCurrentPage(3);
        }
    };


    return (
        <Modal visible={visible} animationType="slide">
         <ImageBackground source={require('./../image/background.jpeg')} style={{ flex: 1, width: '100%', height: '100%' }}>
             
            <View style={{ flex: 1, width: '100%', height: '100%',backgroundColor: 'transparent' }}>
                 
                <TouchableOpacity onPress={handleCancel}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            marginRight: 10,
                            paddingTop: 10,
                        }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'red' }}>
                            Skip all
                        </Text>
                        <Icon name="angle-right" size={30} style={{ marginLeft: 5, color: 'red' }} />
                    </View>
                </TouchableOpacity>

                {currentPage === 1 && (
                    <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0)',
                            }}>
                            <View
                                style={{
                                   
                                    padding: 20,
                                    width: '100%',
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderColor: 'red',
                                }}>
                                <Text
                                    style={{
                                        fontSize: 50,
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        marginTop: 20,
                                        color: 'red',
                                    }}>
                                    First Page
                                </Text>
                            </View>
                        </View>
                   
                )}

                {currentPage === 2 && (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                        }}>
                        <View
                            style={{
                               
                                padding: 20,
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderColor: 'red',
                            }}>
                           <Text
                                style={{
                                    fontSize: 50,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    marginTop: 20,
                                    color: 'red',
                                }}>
                                Second Page
                            </Text>
                        </View>
                    </View>
                )}

                {currentPage === 3 && (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                        }}>
                        <View
                            style={{
                                
                                padding: 20,
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderColor: 'red',
                            }}>
                            <Text
                                style={{
                                    fontSize: 50,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    marginTop: 20,
                                    color: 'red',
                                }}>
                                Therd Page
                            </Text>
                        </View>
                    </View>
                )}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                       {currentPage === 1 ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity onPress={handleCancel}>

                                </TouchableOpacity>

                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: '61.5%' }}>
                                    <View style={{ backgroundColor: 'red', width: 8, height: 8, borderRadius: 5, marginRight: 5 }}></View>
                                    <View style={{ backgroundColor: '#ccc', width: 8, height: 8, borderRadius: 5, marginRight: 5 }}></View>
                                    <View style={{ backgroundColor: '#ccc', width: 8, height: 8, borderRadius: 5 }}></View>
                                </View>
                            </View>

                        ) : (
                            <TouchableOpacity onPress={handlePrevious}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="angle-left" size={30} style={{ marginRight: 10, color: 'red' }} />
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>Previous</Text>
                                    {currentPage !== 1 && currentPage !== 2 ? (
                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: '31.5%' }}>
                                            <View style={{ backgroundColor: '#ccc', width: 8, height: 8, borderRadius: 5, marginRight: 5 }}></View>
                                            <View style={{ backgroundColor: '#ccc', width: 8, height: 8, borderRadius: 5, marginRight: 5 }}></View>
                                            <View style={{ backgroundColor: 'red', width: 8, height: 8, borderRadius: 5 }}></View>
                                        </View>
                                    ) : (
                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: '31.5%' }}>
                                            <View style={{ backgroundColor: '#ccc', width: 8, height: 8, borderRadius: 5, marginRight: 5 }}></View>
                                            <View style={{ backgroundColor: 'red', width: 8, height: 8, borderRadius: 5, marginRight: 5 }}></View>
                                            <View style={{ backgroundColor: '#ccc', width: 8, height: 8, borderRadius: 5 }}></View>
                                        </View>
                                    )}

                                </View>
                            </TouchableOpacity>
                        )}
                        {currentPage === 3 ? (
                            <TouchableOpacity onPress={handleConfirm}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>Finish</Text>
                                    <Icon name="check" size={20} style={{ marginLeft: 10, color: 'red' }} />
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={handleNext}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>Next</Text>
                                    <Icon name="angle-right" size={30} style={{ marginLeft: 10, color: 'red' }} />
                                </View>
                            </TouchableOpacity>
                        )}
                    
                </View>
                
            </View>
            </ImageBackground>
        </Modal>
    );
};

export default FirstInstruction;

