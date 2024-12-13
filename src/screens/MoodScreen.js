import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MoodInputComponent from '../components/MoodInputComponent';
import DatePickerComponent from '../components/DatePickerComponent';
import ButtonComponent from '../components/ButtonComponent';

const MoodScreen = () => {
  const [mood, setMood] = useState('');
  const [activity, setActivity] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const suggestActivity = (mood) => {
    if (mood === 'bahagia') {
      setActivity('Berjalan-jalan atau bertemu teman!');
    } else if (mood === 'sedih') {
      setActivity('Cobalah mendengarkan musik favorit atau meditasi.');
    } else if (mood === 'marah') {
      setActivity('Pertimbangkan untuk berolahraga intensif atau tinju.');
    } else {
      setActivity('Mungkin kamu bisa melakukan sesuatu yang kreatif, seperti melukis!');
    }
  };

  // Function to save mood data to AsyncStorage
  const saveMoodData = async () => {
    try {
      const newMoodData = { mood, activity, date };
      const existingData = await AsyncStorage.getItem('moodHistory');
      const updatedMoodHistory = existingData ? JSON.parse(existingData) : [];
      updatedMoodHistory.push(newMoodData);
      await AsyncStorage.setItem('moodHistory', JSON.stringify(updatedMoodHistory));
      Alert.alert('Mood Tersimpan', 'Mood dan saran aktivitas Anda telah disimpan!');
    } catch (error) {
      Alert.alert('Error', 'Gagal menyimpan data mood.');
    }
  };

  useEffect(() => {
    if (mood) {
      suggestActivity(mood);
    }
  }, [mood]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mood Tracker</Text>

      <DatePickerComponent
        date={date}
        setDate={setDate}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
      />

      <MoodInputComponent mood={mood} setMood={setMood} activity={activity} />

      <ButtonComponent title="Simpan Mood" onPress={saveMoodData} />
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
});

export default MoodScreen;
