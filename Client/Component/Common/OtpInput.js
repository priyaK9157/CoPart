import React from 'react';
import { StyleSheet } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const MyComponent = () => {
  const styles = StyleSheet.create({
    borderStyleBase: {
      width: 30,
      height: 45,
     
    },
    borderStyleHighLighted: {
     
    },
    underlineStyleBase: {
      width: 60,
      height: 45,
      borderWidth: 0,
      borderBottomWidth: 1,
      backgroundColor: '#3651b3'
    },
    underlineStyleHighLighted: {
      borderColor: "#26409e",
    
    },
  });

  return (
    <OTPInputView
      style={{ width: '80%', height: 200 }}
      pinCount={4}
      autoFocusOnLoad
      codeInputFieldStyle={styles.underlineStyleBase}
      codeInputHighlightStyle={styles.underlineStyleHighLighted}
      onCodeFilled={(code) => {
        console.log(`Code is ${code}, you are good to go!`);
      }}
    />
  );
};

export default MyComponent;
