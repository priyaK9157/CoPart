import * as Font from 'expo-font';

exports.FontMadimi = () => {
  return Font.loadAsync({
    'madimi-one': require("../../assets/Fonts/2V0YKIEADpA8U6RygDnZZFQoBoHMd2U.ttf")
  });
};

exports.fontNuecha=()=>{
     return Font.loadAsync({
        "Neucha":require("../../assets/Fonts/q5uGsou0JOdh94bvugNsCxVEgA.ttf")
     })
}

exports.fontEczar=()=>{
  return Font.loadAsync({
     "Eczar":require("../../assets/Fonts/BXR2vF3Pi-DLmxcpJB-qbNTyTMDXHd6WqTIVKWJKWg.ttf")
  })
}

exports.fontDeliusSwashCaps=()=>{
  return Font.loadAsync({
     "Delius Swash Caps":require("../../assets/Fonts/DeliusSwashCaps-Regular.ttf")
  })
}
