import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const ButtonComponent = ({ onPress, title }) => {
  return (
    <TouchableOpacity 
      style={{ backgroundColor: '#00796b', padding: 10, borderRadius: 8, marginTop: 15, width: '80%', alignItems: 'center' }} 
      onPress={onPress}
    >
      <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
