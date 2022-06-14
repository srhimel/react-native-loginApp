import { StyleSheet, Text, Pressable, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Button({ children, onPress, customStyle, loading }) {
  return (
    <View style={{ marginTop: 30 }}>
      <TouchableOpacity onPress={onPress} style={[styles.button, customStyle]}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>  {loading ? <ActivityIndicator size={13.1} color="#fff" /> : children}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

  button: {
    backgroundColor: '#FF5A67',
    paddingVertical: 15,
    borderRadius: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    width: 200,
  },
})