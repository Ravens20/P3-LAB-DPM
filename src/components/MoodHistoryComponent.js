import React from 'react';
import { View, Text } from 'react-native';

const MoodHistoryComponent = ({ moodHistory }) => {
  return (
    <View>
      <Text style={{ fontSize: 18, marginTop: 30, fontWeight: 'bold', color: '#004d40' }}>Riwayat Mood</Text>
      {moodHistory.length === 0 ? (
        <Text>Tidak ada riwayat mood.</Text>
      ) : (
        moodHistory.map((item, index) => (
          <View key={index} style={{
            marginTop: 10,
            padding: 10,
            borderColor: '#00796b',
            borderWidth: 1,
            borderRadius: 10,
            marginBottom: 5,
            width: '80%',
            backgroundColor: '#ffffff',
            alignItems: 'center',
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          }}>
            <Text>{new Date(item.date).toLocaleDateString()} - {item.mood} - {item.activity}</Text>
          </View>
        ))
      )}
    </View>
  );
};

export default MoodHistoryComponent;
