import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const Cancel_Button = ({ onPress }) => {
  return (
    <View style={{ width: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', paddingTop: 40, paddingBottom: 20 }}>
                <TouchableOpacity onPress={onPress} style={{ width: 150, height: 150, borderRadius: 400, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 40 }}>Cancel</Text>
                </TouchableOpacity>
                <View style={{paddingRight:2,paddingLeft:2 }}>
                    <Text style={{ color: 'red', fontSize: 20, paddingTop: 20 }}>
                    If you want to cancel the service, please{'\n'}
                        <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>Cancel</Text>{" "}
                        Click the button!!
                    </Text>
                </View>
            </View>
  );
};

export default Cancel_Button;
