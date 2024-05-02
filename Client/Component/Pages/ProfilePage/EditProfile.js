import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const EditProfile = ({ profile, onSave, onCancel }) => {
    const [name, setName] = useState(profile.name);
    const [professionalRole, setProfessionalRole] = useState(profile.Professional_Role);
    const [userBio, setUserBio] = useState(profile.User_Bio);

    const handleSave = () => {
        // Prepare the updated profile object
        const updatedProfile = {
            ...profile,
            name,
            Professional_Role: professionalRole,
            User_Bio: userBio,
            Skill: skill,
            projectName : projectName,
            projectDescription: projectDescription

        };

        // Call onSave callback with the updated profile
        onSave(updatedProfile);
    };

    return (
        <View>
            <Text>Name:</Text>
            <TextInput value={name} onChangeText={setName} />

            <Text>Professional Role:</Text>
            <TextInput value={professionalRole} onChangeText={setProfessionalRole} />

            <Text>User Bio:</Text>
            <TextInput value={userBio} onChangeText={setUserBio} multiline />

            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={onCancel} />
        </View>
    );
};

export default EditProfile;
