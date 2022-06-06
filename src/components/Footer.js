import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Footer({ children }) {
  return (
    <View style={styles.footer}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 40
  }
})