import { StyleSheet, TextInput } from 'react-native'
import React from 'react'

export default function Input({ placeholder, secureTextEntry, onChangeText, autoCapitalize, multiline, value }) {
  return (
    <TextInput style={styles.input} placeholder={placeholder} secureTextEntry={secureTextEntry} onChangeText={onChangeText} autoCapitalize={autoCapitalize} multiline={multiline} value={value} />
  )
}

const styles = StyleSheet.create({
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginVertical: 10,
  }
})