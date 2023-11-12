import * as React from 'react';

import {
    TabbedForm,
    TextInput,
    DateTimeInput,
    ArrayInput,
    SimpleFormIterator,
    BooleanInput,
    Create,
} from 'react-admin';
import {Box, Typography} from '@mui/material';
import Chip from '@mui/material/Chip';
import MDEditor from '@uiw/react-md-editor';

const EventCreate = () => {
    const transformData = (data: any) => {
        data.categories = data.categories.map((d: any) => d.category);
    }
    return <Create transform={transformData}>
        <EventCreateForm />
    </Create>
}


const EventCreateForm = () => {
    let registrants = [];

    console.log(registrants);
    return <Box pt={"1em"} pl={"0.4em"} display="flex" width={"100%"}>
        <TabbedForm warnWhenUnsavedChanges={true} style={{"width": "100%"}}>
            <TabbedForm.Tab label="summary">
                <Box flex={1} width="100%">
                    <TextInput
                        variant='outlined'
                        label="Title"
                        source="title"
                        isRequired
                        fullWidth
                    />
                </Box>
                <Box flex={1} width="100%">
                    <TextInput
                        variant='outlined'
                        label="Location"
                        source="location"
                        isRequired
                        fullWidth
                    />
                </Box>
                <Box flex={1}>
                    <BooleanInput label="Is Draft?" source="isDraft" />
                </Box>
                <Box display={{xs: 'block', sm: 'flex'}}>
                    <Box flex={1} >
                        <Typography variant="h6" gutterBottom align='left' ml="0.2em" mb={"-0.3em"} fontWeight={"bold"}>
                            Date and Time
                        </Typography>
                        <DateTimeInput source='date' fullWidth isRequired label="" />
                    </Box>
                </Box>

                <Box display={{xs: 'block', sm: 'flex'}}>
                    <Box flex={5}>
                        <Typography variant="h6" gutterBottom align='left' ml="0.2em" mb={"-0.3em"} fontWeight={"bold"}>
                            Categories
                        </Typography>
                        <ArrayInput source='categories' label="">
                            <SimpleFormIterator>
                                <TextInput variant='outlined' source="category" />
                            </SimpleFormIterator>
                        </ArrayInput>
                    </Box>
                </Box>
                <Box></Box>
            </TabbedForm.Tab >
            <TabbedForm.Tab label="description">
                <MarkdownDescription />
            </TabbedForm.Tab>
            <TabbedForm.Tab label="Registrants" >
                {registrants.map((d, i) => {
                    return <Box p={"0.4em"}>
                        <Chip label={`${i + 1} - ${d}`} key={i} />
                    </Box>
                })}
                <Typography variant="h6" gutterBottom align='left' ml="0.5em" fontWeight={"bold"} textAlign={"center"}>
                    {registrants.length} registrants
                </Typography>
            </TabbedForm.Tab>
        </TabbedForm >
    </Box>
}

const MarkdownDescription = () => {
    const [value, setValue] = React.useState("## About Event");
    const editorStyle = {
        width: "100%",
        height: "700px",
        backgroundColor: "#f0f0f0", // Set your desired background color here
    };
    const onValueChange = (e: any) => {
        setValue(e);
    }

    return (<div className="container" style={editorStyle}>
        <MDEditor value={value} onChange={onValueChange} height="100%" hideToolbar={true} />
    </div>)
}

export default EventCreate;

