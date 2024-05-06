import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import tw from "twrnc";
import CheckBox from "expo-checkbox";
import Navbar from '../../Common/Navbar';
import { useFonts } from 'expo-font';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { updateBasicDetail, updateStep } from '../../../reducers/CreateProject';
import Toast from 'react-native-toast-message';

const ScopeView = () => {
  const [projectLength, setProjectLength] = useState("");
  const [toggle, setToggle] = useState();
  const [spanPeriod, setSpanPeriod] = useState("");
  const [LevelExperience, setLevelExperience] = useState("")
  const [chance, setChance] = useState("");
  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    MadimiOne: require('../../../assets/Fonts/2V0YKIEADpA8U6RygDnZZFQoBoHMd2U.ttf'),
    TwinkleStar: require('../../../assets/Fonts/-W_oXI_oSymQ8Qj-Apx3HGN_Hu1RTCk5FtSDETgf0cK_NOeFgpRt9rN5.ttf'),
  });

  async function setBasicDetailState() {
    if (!projectLength || !spanPeriod || !LevelExperience) {
      Toast.show({
        type: 'error',
        text1: 'Please Fill All The Details To Proceed',
        position: 'bottom',
      });
        return;
    }
    const data = {
      projectLength,
      spanPeriod,
      LevelExperience
    }

    dispatch(updateStep(5));
    dispatch(updateBasicDetail(data))
  }

  return (
    <View style={tw`h-[100%] mt-3`}>
      <Navbar />
      <ScrollView style={tw` max-h-[77%]`}>
        <View style={tw`w-11/12 mx-auto`}>
          <Text style={[tw`mt-7 text-2xl`, { fontFamily: "MadimiOne" }]}>
            Could you please describe the scope of your work?
          </Text>
          <Text style={tw`text-[15px] mx-auto mt-3`}>
            Estimate the size and duration of your project.
          </Text>

          {
            projectLength === "" && (
              <View>
                {/* Large */}
                <View style={tw`flex-row items-center gap-2 mt-3`}>
                  <CheckBox
                    value={projectLength === "large"}
                    onValueChange={() => {
                      setProjectLength("large")
                      setChance(2)
                    }}
                    style={tw`rounded-full px-2`}
                  />
                  <View style={tw`mt-12`}>
                    <Text style={[tw`text-lg`, { fontFamily: "MadimiOne" }]}>Large</Text>
                    <Text style={[tw`ml-2 text-slate-500 max-w-[90%] text-[15px]`, {}]}>Longer-term or complex initiative (e.g., develop and execute a brand strategy)</Text>
                  </View>
                </View>

                {/* Medium */}
                <View style={tw`flex-row items-center gap-2 mt-3`}>
                  <CheckBox
                    value={projectLength === "medium"}
                    onValueChange={() => {
                      setProjectLength("medium")
                      setChance(2)
                    }}
                    style={tw`rounded-full px-2`}
                  />
                  <View style={tw`mt-5`}>
                    <Text style={[tw`text-lg`, { fontFamily: "MadimiOne" }]}>Medium</Text>
                    <Text style={[tw`ml-2 text-slate-500 max-w-[80%] text-[15px]`, {}]}>Span Period of 3 to 5 months (e.g., develop and execute Logos, icons)</Text>
                  </View>
                </View>

                {/* Small */}
                <View style={tw`flex-row items-center gap-2 mt-3`}>
                  <CheckBox
                    value={projectLength === "small"}
                    onValueChange={() => {
                      setProjectLength("small")
                      setChance(2)
                    }}
                    style={tw`rounded-full px-2`}
                  />
                  <View style={tw`mt-5`}>
                    <Text style={[tw`text-lg`, { fontFamily: "MadimiOne" }]}>Small</Text>
                    <Text style={[tw`ml-2 text-slate-500 max-w-[81.7%] text-[15px]`, {}]}>Span Period of 1 to 3 months (e.g., create logos for new Brands)</Text>
                  </View>
                </View>
              </View>
            )
          }
          {/* Display the selected option */}
          {projectLength !== "" && (
            <View style={tw` flex flex-row items-center`}>
              <View style={tw`mt-10`}>
                <Text style={[tw`text-lg`, { fontFamily: "MadimiOne" }]}>
                  {projectLength === "large" ? "Large" : projectLength === "medium" ? "Medium" : "Small"}
                </Text>
                <Text style={[tw`ml-2 text-slate-500 max-w-[90%] text-[17px]`, {}]}>
                  {projectLength === "large" ? "Longer-term or complex initiative (e.g., develop and execute a brand strategy)" :
                    projectLength === "medium" ? "Span Period of 3 to 5 months (e.g., develop and execute Logos, icons)" :
                      "Span Period of 1 to 3 months (e.g., create logos for new Brands)"}
                </Text>
              </View>
              <TouchableOpacity onPress={() => {
                setChance(1),
                setProjectLength("");
                setSpanPeriod("");
              }} style={tw` border-[3px] border-gray-300 rounded-full p-2`}>
                <FontAwesome5 name="pencil-alt" size={17} color="#15803d" />
              </TouchableOpacity>
            </View>
          )}
          {
            (chance == 2 && spanPeriod === "") && (
              <View>
                <Text style={[tw`mt-7 text-xl`, { fontFamily: "MadimiOne" }]}>How Long will your project take?</Text>
                <View style={tw` mt-4 flex flex-row gap-3`}>
                  <CheckBox
                    value={spanPeriod === "7"}
                    onValueChange={() => {
                      setSpanPeriod("7")
                      setChance(3)
                    }}
                    style={tw`rounded-full px-2`}
                  />
                  <Text style={[tw`text-lg`, { fontFamily: "MadimiOne" }]}>More Than 7 Month</Text>
                </View>
                <View style={tw` mt-4 flex flex-row gap-3`}>
                  <CheckBox
                    value={spanPeriod === "3"}
                    onValueChange={() => {
                      setSpanPeriod("3")
                      setChance(3)
                    }}
                    style={tw`rounded-full px-2`}
                  />
                  <Text style={[tw`text-lg`, { fontFamily: "MadimiOne" }]}>3 to 7 Month</Text>
                </View>
                {/* {/2 month/} */}
                <View style={tw` mt-4 flex flex-row gap-3`}>
                  <CheckBox
                    value={spanPeriod === "1"}
                    onValueChange={() => {
                      setSpanPeriod("1")
                      setChance(3)
                    }}
                    style={tw`rounded-full px-2`}
                  />
                  <Text style={[tw`text-lg`, { fontFamily: "MadimiOne" }]}>1 to 3 Month</Text>
                </View>
              </View>
            )
          }
          {
            spanPeriod !== "" && (
              <View style={tw` mt-4 flex flex-row items-center justify-between`}>
                <View>
                  <Text style={[tw`text-lg`, { fontFamily: "MadimiOne" }]}>{spanPeriod === "7" ? "More Than 7 months" : spanPeriod === "3" ? "More Than 3 month" : "More Than 1 Month"}</Text>
                </View>
              <TouchableOpacity onPress={()=>{
                setChance(2)
                setSpanPeriod("")
              }}>
                <View style={tw` border-[3px] border-gray-300 rounded-full p-2  mr-5`}>
                  <FontAwesome5 name="pencil-alt" size={17} color="#15803d" />
                </View>
              </TouchableOpacity>
              </View>
            )
          }
          {
            (chance === 3) && (
              <View style={tw` mt-5`}>
                <Text style={[tw`text-xl`, { fontFamily: "MadimiOne" }]}>What level of experience will it need?</Text>
                <Text style={tw` text-slate-500 text-[17px] mt-2`}>This won't restrict any thing.But helps match expertise level of your projects.</Text>
                <ScrollView>
                  <View>
                    {/* entry */}
                    <View style={tw`flex-row items-center gap-2 `}>
                      <CheckBox
                        value={LevelExperience === "entry"}
                        onValueChange={() => {
                          setLevelExperience("entry")

                        }}
                        style={tw`rounded-full px-2`}
                      />
                      <View style={tw`mt-8`}>
                        <Text style={[tw`text-lg ml-2`, { fontFamily: "MadimiOne" }]}>Entry</Text>
                        <Text style={[tw`ml-2 text-slate-500 max-w-[90%] text-[15px]`, {}]}>Looking For someone relatively new to this field</Text>
                      </View>
                    </View>

                    {/* intermediate */}
                    <View style={tw`flex-row items-center gap-2 mt-3`}>
                      <CheckBox
                        value={LevelExperience === "intermediate"}
                        onValueChange={() => {
                          setLevelExperience("intermediate")

                        }}
                        style={tw`rounded-full px-2`}
                      />
                      <View style={tw`mt-5`}>
                        <Text style={[tw`text-lg ml-2`, { fontFamily: "MadimiOne" }]}>Intermediate</Text>
                        <Text style={[tw`ml-2 text-slate-500 max-w-[80%] text-[15px]`, {}]}>Looking for substantial experience in this field.</Text>
                      </View>
                    </View>

                    {/* Expierence */}
                    <View style={tw`flex-row items-center gap-2 mt-3`}>
                      <CheckBox
                        value={LevelExperience === "Expierence"}
                        onValueChange={() => {
                          setLevelExperience("Expierence")

                        }}
                        style={tw`rounded-full px-2`}
                      />
                      <View style={tw`mt-5`}>
                        <Text style={[tw`text-lg ml-2`, { fontFamily: "MadimiOne" }]}>Expierence</Text>
                        <Text style={[tw`ml-2 text-slate-500 max-w-[81.7%] text-[15px]`, {}]}>Looking For deep Knowledge In This Field</Text>
                      </View>
                    </View>

                  </View>
                </ScrollView>
              </View>
            )
          }
        </View>
      </ScrollView>
      <View style={{ borderTopWidth: 1, borderTopColor: '#E5E7EB', padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity>
          <Text style={tw` border border-gray-300 p-2 rounded-full px-5`}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={setBasicDetailState}>
          <Text style={tw` bg-green-600 p-3 px-6 rounded-full text-white font-bold`}>Next : Description</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScopeView;