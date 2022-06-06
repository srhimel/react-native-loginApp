import { StyleSheet, Text, View, Pressable, Animated } from 'react-native'
import React from 'react'

export default function RadioInput({ option, gender, setGender }) {

  return (
    option.map((item, index) => {
      const selected = gender === item;
      return (
        <Pressable key={index} onPress={() => setGender(item)} style={styles.radioContainer}>
          <Animated.View style={[styles.outerCircle, selected && styles.selectedOuterCircle]}>
            <Animated.View style={[styles.innerCircle, selected && styles.selectedInnerCircle]} />
          </Animated.View>
          <Text style={styles.text}>{item}</Text>
        </Pressable>

      )
    })
  )
}

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,

  },
  outerCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOuterCircle: {
    borderColor: '#FF5A67',
  },
  innerCircle: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: '#ccc',

  },
  selectedInnerCircle: {
    backgroundColor: '#FF5A67',
    borderColor: '#FF5A67',
  },
  text: {
    marginLeft: 10,
  }
})