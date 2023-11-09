import {List, TextInput, Datagrid, Create, SimpleForm, required, RadioButtonGroupInput, useNotify} from 'react-admin';
import {SelectInput} from 'react-admin';
import {Box} from '@mui/material';
import {ImageInput, ImageField} from 'react-admin';
import React, {useEffect, useState} from 'react';

const UserCreate = () => {
    const validateUserCreation = (values: any) => {
        const errors = {};
        if (!values.fullName) {
            errors["fullName"] = "Missing Full Name";
        }

        if (!values.primaryEmail) {
            errors["primaryEmail"] = "Missing Primary Email!";
        }

        if (!values.password) {
            errors["password"] = "Missing Password!";
        }

        if (!values.phoneNumber) {
            errors["phoneNumber"] = "Missing Phone Number!";
        }

        if (!values.gender) {
            errors["gender"] = "Missing Gender!";
        }


        if (!values.userType) {
            errors["userType"] = "Missing User Role!";
        }

        if (!values.userRole) {
            errors["userRole"] = "Missing User Role!";
        } else if (values.userRole === "Verified User" || values.userRole === "Manager" || values.userRole === "Admin") {
            if (!values.batch) {
                errors["batch"] = "Missing User Role!";
            }

            if (!values.faculty) {
                errors["faculty"] = "Missing faculty!";
            }

            if (!values.secondaryEmail) {
                errors["secondaryEmail"] = "Missing Secondary Email!";
            }

            if (!values.profilePicture) {
                errors["profilePicture"] = "Missing Profile Picture";
            }
        }
        return errors
    };
    return <Box width={"100%"}>
        <Create>
            <SimpleForm validate={validateUserCreation}>
                <Box display="flex" flexDirection="column" width="100%">
                    <Box flex={1} ml={{xs: 0, sm: '0.5em'}} mr={{xs: 0, sm: '0.5em'}}>
                        <TextInput
                            variant='outlined'
                            label="Full Name"
                            source="fullName"
                            isRequired
                            fullWidth
                            validate={required()}
                        />
                        <TextInput
                            variant='outlined'
                            label="Phone Number"
                            source="phoneNumber"
                            fullWidth
                        />
                        <Box flex={1} display={"flex"} flexDirection="row">
                            <Box mr="0.2em" flex={1}>
                                <TextInput
                                    variant='outlined'
                                    label="Primary Email"
                                    source="primaryEmail"
                                    isRequired
                                    fullWidth
                                    validate={required()}
                                />
                            </Box>
                            <Box ml="0.2em" flex={1}>
                                <TextInput
                                    variant='outlined'
                                    label="Secondary Email"
                                    source="secondaryEmail"
                                    fullWidth
                                />
                            </Box>
                        </Box>
                        <Box flex={1} display={"flex"} flexDirection="row">
                            <TextInput
                                variant='outlined'
                                label="Password"
                                source="password"
                                isRequired
                                fullWidth
                                validate={required()}
                            />
                        </Box>
                    </Box>
                    <Box flex={1} display={"flex"} flexDirection="row">
                        <Box pr="0.2em" flex={1}>
                            <TextInput
                                variant='outlined'
                                label="Batch"
                                source="batch"
                                fullWidth
                            />
                        </Box>
                        <Box pl="0.2em" flex={1}>
                            <SelectInput source="faculty" label="Faculty" choices={[
                                {id: 'ComputerScience', name: 'Computer Science'},
                                {id: 'ComputerEngineer', name: 'Computer Engineering'},
                                {id: 'ArtificialIntelligence', name: 'Artificial Intelligence'},
                            ]} fullWidth />
                        </Box>
                        <Box pl="0.2em" flex={1}>
                            <SelectInput source="userType" label="User Type" choices={[
                                {id: 'KUStudent', name: 'KU Student'},
                                {id: 'DOCSEAlumni', name: 'DOCSE Alumni'},
                                {id: 'DOCSEStudent', name: 'DOCSE Student'},
                                {id: 'KUCCGeneral Member', name: 'KUCC General Member'},
                                {id: 'KUCCPresident', name: 'KUCC President'},
                                {id: 'KUCCMember', name: 'KUCC General Secretary'},
                                {id: 'KUCCTreasurer', name: 'KUCC Treasurer'},
                                {id: 'KUCCVice President', name: 'KUCC Vice President'},
                                {id: 'KUCCClubSecretary', name: 'KUCC Club Secretary'},
                                {id: 'KUCCExecutive Member', name: 'KUCC Executive Member'},
                            ]} fullWidth />
                        </Box>
                    </Box>
                    <Box display={"flex"} flexDirection="column" alignSelf={"start"} flex={1}>
                        <Box flex={1}>
                            <RadioButtonGroupInput source="gender" choices={[
                                {id: 'Male', name: 'Male'},
                                {id: 'Female', name: 'Female'},
                                {id: 'Non Binary', name: 'Non Binary'},
                            ]} validate={required()} fullWidth />
                        </Box>
                        <Box flex={1}>
                            <RadioButtonGroupInput source="userRole" label="User Role" choices={[
                                {id: 'Admin', name: 'Admin'},// IF Admin clicks on this then he would need a secondary email too
                                {id: 'Manager', name: 'Manager'},// IF Admin clicks on this then he would need a secondary email too
                                {id: 'Verified User', name: 'Verified User'}, // IF Admin clicks on this then he would need a secondary email too
                                {id: 'Unverified User', name: 'Unverified User'},
                            ]} validate={required()} fullWidth />
                        </Box>
                    </Box>

                    <ImageInput source="profilePicture" label="Profile Picture">
                        <ImageField source="src" title="title" />
                    </ImageInput>
                </Box>
            </SimpleForm>
        </Create>
    </Box >
}


export default UserCreate;

