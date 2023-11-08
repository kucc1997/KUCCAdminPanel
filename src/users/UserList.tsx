import {List, TextField, Datagrid} from 'react-admin';
import {Box} from '@mui/material';
import React from 'react';

const UserList = () => {
    return <Box width={"100%"}>
        <List>
            <Datagrid>
                <TextField source="fullName" />
                <TextField source="primaryEmail" />
            </Datagrid>
        </List>
    </Box>
}


export default UserList;

