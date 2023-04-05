import * as React from 'react';
import { View, Text } from 'react-native';


export default function DetialsScrean({ navigation }) {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPrees={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold' }}
            >Detials Screan
            </Text>
        </View>
    );
}