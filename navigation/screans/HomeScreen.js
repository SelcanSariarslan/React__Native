import * as React from 'react';
import { View, Text } from 'react-native';

export default function HomeScrean({ navigation }) {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text
            onPrees={() => alert('This is the Home Page.')}
            style={{ fontSize: 26, fontWeight: 'bold' }}
        >Home Screan
        </Text>
    </View>
    );
}