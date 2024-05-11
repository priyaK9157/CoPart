import React, { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { UpdateProfile } from "../../../services/operations/ProfileHandler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DecodedTokenHandler } from '../../../services/operations/generate&verifyOTP';
import { FindByEmail } from "../../../services/operations/ProfileHandler";
import { TouchableOpacity } from 'react-native-gesture-handler';
import tw from 'twrnc';
import { Feather } from '@expo/vector-icons';

const GitHubPage = () => {
    const [github, setGithub] = useState('');
    const [userData, setUserData] = useState(null);

    async function fetchUserData(username) {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            } else {
                console.error('Failed to fetch GitHub user data');
            }
        } catch (error) {
            console.error('Error fetching GitHub user data:', error);
        }
    }

   

    return (
        <View style={tw`m-5 mt-18`}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
            <Text>Update GitHub URL:</Text>
            <TextInput
                value={github}
                onChangeText={setGithub}
                placeholder="Enter GitHub username"
                style={tw`m-4 text-lg border border-gray-300 px-2 py-1 rounded-full`}
                onBlur={() => fetchUserData(github)} // Fetch user data onBlur
            />
            {userData && (
                <View style={tw`flex items-center`}>
                    <Image
                        source={{ uri: userData.avatar_url }}
                        style={{ width: 100, height: 100, borderRadius: 50, marginVertical: 10 }}
                    />
                    <Text>{userData.login}</Text>
                    {/* Render additional user data as needed */}
                </View>
            )}
            <View style={tw`mt-4 mx-auto mt-20 mb-8 border-t border-gray-300 w-full`}>
                <TouchableOpacity onPress={fetchUserData}>
                    <Text style={tw`bg-green-600 p-3 px-6 rounded-full text-white font-bold text-center`}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default GitHubPage;
