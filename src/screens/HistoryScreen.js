import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icon

const HistoryScreen = () => {
  const [moodHistory, setMoodHistory] = useState([]);

  // Load mood history from AsyncStorage
  const loadMoodHistory = async () => {
    try {
      const savedMoodHistory = await AsyncStorage.getItem('moodHistory');
      if (savedMoodHistory) {
        setMoodHistory(JSON.parse(savedMoodHistory));
      }
    } catch (error) {
      console.error('Gagal memuat riwayat mood');
    }
  };

  useEffect(() => {
    loadMoodHistory();
  }, []);

  // Function to remove a specific mood entry
  const removeMoodHistory = async (indexToRemove) => {
    try {
      const updatedMoodHistory = moodHistory.filter((_, index) => index !== indexToRemove);
      await AsyncStorage.setItem('moodHistory', JSON.stringify(updatedMoodHistory));
      setMoodHistory(updatedMoodHistory); // Update the state
      Alert.alert('Riwayat Dihapus', 'Riwayat mood telah berhasil dihapus.');
    } catch (error) {
      Alert.alert('Error', 'Gagal menghapus riwayat mood.');
    }
  };

  // Refresh button to reload mood history
  const handleRefresh = () => {
    loadMoodHistory();
    Alert.alert('Riwayat Diperbarui', 'Riwayat mood telah diperbarui.');
  };

  // Function to determine background color based on mood
  const getMoodColor = (mood) => {
    switch (mood) {
      case 'bahagia':
        return '#ffeb3b'; // Yellow for happy mood
      case 'sedih':
        return '#2196f3'; // Blue for sad mood
      case 'marah':
        return '#f44336'; // Red for angry mood
      default:
        return '#9e9e9e'; // Default gray for others
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Riwayat Mood</Text>
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Icon name="refresh" size={30} color="#00796b" />
      </TouchableOpacity>
      {moodHistory.length === 0 ? (
        <Text>Tidak ada riwayat mood.</Text>
      ) : (
        <FlatList
          data={moodHistory}
          renderItem={({ item, index }) => (
            <View key={index} style={[styles.historyItemContainer, { backgroundColor: getMoodColor(item.mood) }]}>
              <View style={styles.historyItem}>
                <Text style={styles.historyText}>
                  {new Date(item.date).toLocaleDateString()} - {item.mood} - {item.activity}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeMoodHistory(index)}
              >
                <Text style={styles.deleteButtonText}>Hapus</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 20,
    textAlign: 'center',
  },
  refreshButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginTop: -10,
    marginRight: 10,
  },
  historyItemContainer: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3, // Add shadow effect for a better appearance on Android
  },
  historyItem: {
    flex: 1,
  },
  historyText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#f44336',
    fontWeight: 'bold',
  },
});

export default HistoryScreen;
