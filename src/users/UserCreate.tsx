import {List, TextInput, Datagrid, Create, SimpleForm, required, RadioButtonGroupInput} from 'react-admin';
import {SelectInput} from 'react-admin';
import {Box} from '@mui/material';
import React from 'react';

const UserCreate = () => {
    return <Box width={"100%"}>
        <Create>
            <SimpleForm>
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
                            ]} fullWidth />
                        </Box>
                    </Box>
                    <Box display={"flex"} flexDirection="column" alignSelf={"start"} flex={1}>
                        <Box flex={1}>
                            <RadioButtonGroupInput source="genders" choices={[
                                {id: 'Male', name: 'Male'},
                                {id: 'Female', name: 'Female'},
                                {id: 'Non Binary', name: 'Non Binary'},
                            ]} validate={required()} fullWidth />
                        </Box>
                        <Box flex={1}>
                            <RadioButtonGroupInput source="roles" choices={[
                                {id: 'Admin', name: 'Admin'},// IF Admin clicks on this then he would need a secondary email too
                                {id: 'Manager', name: 'Manager'},// IF Admin clicks on this then he would need a secondary email too
                                {id: 'Verified User', name: 'Verified User'}, // IF Admin clicks on this then he would need a secondary email too
                                {id: 'Unverified User', name: 'Unverified User'},
                            ]} validate={required()} fullWidth />
                        </Box>
                    </Box>
                </Box>
            </SimpleForm>
        </Create>
    </Box >
}


export default UserCreate;

