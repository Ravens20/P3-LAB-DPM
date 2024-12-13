import React from 'react';
import { TextInput, Text } from 'react-native';

const MoodInputComponent = ({ mood, setMood, activity }) => {
  return (
    <>
      <Text style={{ fontSize: 18, marginTop: 10, color: '#004d40' }}>Bagaimana perasaan Anda hari ini?</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: '#00796b',
          borderWidth: 1,
          borderRadius: 10,
          width: '80%',
          marginBottom: 10,
          paddingLeft: 10,
          color: '#004d40',
          fontSize: 16,
        }}
        placeholder="Masukkan mood Anda (misalnya: bahagia, sedih, marah)"
        value={mood}
        onChangeText={(text) => setMood(text)}
      />

      <Text style={{ fontSize: 16, marginTop: 20, fontStyle: 'italic', color: '#00796b', textAlign: 'center' }}>
        Aktivitas yang Disarankan: {activity}
      </Text>
    </>
  );
};

export default MoodInputComponent;
