import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Mengimpor ikon kalender

const DatePickerComponent = ({ date, setDate, showDatePicker, setShowDatePicker }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Pilih Tanggal:</Text>

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Icon name="calendar-today" size={24} color="#00796b" style={styles.icon} />
        <Text style={styles.dateText}>
          {date ? date.toLocaleDateString() : 'Pilih Tanggal'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setDate(selectedDate || date);
            setShowDatePicker(false);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginTop: 10,
    color: '#004d40',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#00796b',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: '80%',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#004d40',
  },
});

export default DatePickerComponent;
