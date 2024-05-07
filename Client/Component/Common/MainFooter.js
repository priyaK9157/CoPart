import React from 'react';
import { View, Button, StyleSheet ,TouchableOpacity,Text, Image} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateSelectedId } from '../../reducers/ButtonSlices';
import { useNavigation } from '@react-navigation/native';
import { FooterArray ,navigateArray} from '../../ArrayUsable/FooterArray';
import { Entypo ,Ionicons,Feather} from '@expo/vector-icons';
import tw from "twrnc"

const MainFooter = () => {
  const {selectedId} = useSelector((state) => state.buttonSlices);
  const navigate=useNavigation()
  const dispatch = useDispatch();
  console.log(selectedId)
  const handleButtonClick = (id) => {
    dispatch(updateSelectedId(id));
    const selectedItemData = navigateArray.find(item => item.index === id);
    if (selectedItemData) {
        navigate.navigate(selectedItemData.navigate);
    }
  };

  return (
    <View style={tw`justify-end `}>
    <View style={[tw`w-full py-1 border border-gray-300 rounded-[1rem] `,]}>
        <View style={tw`w-10/12 mx-auto flex flex-row justify-between items-center`}>
            {FooterArray.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={tw`flex items-center`}
                    onPress={() => handleButtonClick(item.index)}
                >
                    <View style={index === selectedId ? tw`-mt-1 h-[5px] w-8 bg-green-700 rounded-xl` : tw`hidden`} />
                     
                    

                    {item.iconise ? (
                        <Ionicons
                            name={item.icon}
                            size={24}
                            color={index === selectedId ? "green" : "black"}
                        />
                    ) : item.feather ? (
                        <Feather
                            name={item.icon}
                            size={24}
                            color={index === selectedId ? "green" : "black"}
                        />
                    ) : (
                        <Entypo
                            name={item.icon}
                            size={24}
                            color={index === selectedId ? "green" : "black"}
                        />
                    )}
                 
                    <Text style={[tw`text-md`, { fontFamily: "MadimiOne", color: index === selectedId ? "green" : "black" }]}>{item.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
</View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 20,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderRadius: 5,
      backgroundColor: 'lightgray',
    },
    selectedItem: {
      backgroundColor: 'green',
    },
    itemText: {
      marginLeft: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  

export default MainFooter;