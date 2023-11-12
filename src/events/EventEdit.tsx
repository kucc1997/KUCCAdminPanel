import * as React from 'react';
import {
    BooleanInput,
    DateField,
    Edit,
    Form,
    Labeled,
    PrevNextButtons,
    ReferenceField,
    SelectInput,
    TextField,
    Toolbar,
    useRecordContext,
    useTranslate,
    TabbedForm,
    TextInput,
    DateTimeInput,
    ChipField,
    ArrayInput,
    SimpleFormIterator,
    SingleFieldList,
    NumberInput
} from 'react-admin';
import {Box, Typography} from '@mui/material';
import Chip from '@mui/material/Chip';

const EventEdit = () => {
    return <Edit title={<div>Flsajfasljfsaljf</div>}>
        <EventEditForm />
    </Edit>
}

const EventEditForm = () => {
    const record = useRecordContext();
    let registrants = record["registrants"];

    console.log(registrants);
    return <Box pt={"1em"} pl={"0.5em"} display="flex">
        <Box flex={4}>
            <TabbedForm warnWhenUnsavedChanges={true} >
                <TabbedForm.Tab label="summary" >
                    <Box display={{xs: 'block', sm: 'flex'}}>
                        <Box flex={1} ml={{xs: 0, sm: '0.5em'}} mr={{xs: 0, sm: '0.5em'}}>
                            <Typography variant="h6" gutterBottom align='left' ml="0.5em" mb={"-0.5em"} fontWeight={"bold"}>
                                Title
                            </Typography>
                            <TextInput
                                label=""
                                source="title"
                                isRequired
                                fullWidth
                            />
                        </Box>
                    </Box>
                    <Box display={{xs: 'block', sm: 'flex'}}>
                        <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                            <Typography variant="h6" gutterBottom align='left' ml="0.5em" mb={"-0.5em"} fontWeight={"bold"}>
                                Date and Time
                            </Typography>
                            <DateTimeInput source='date' fullWidth isRequired label="" />
                        </Box>
                        <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                            <Typography variant="h6" gutterBottom align='left' ml="0.5em" mb={"-0.5em"} fontWeight={"bold"}>
                                Location
                            </Typography>
                            <NumberInput
                                label=""
                                source="location"
                                isRequired
                                fullWidth
                            />
                        </Box>
                        <Box flex={1} ml={{xs: 0, sm: '0.5em'}} />
                    </Box>
                    <Box display={{xs: 'block', sm: 'flex'}}>
                        <Box flex={5} ml={{xs: 0, sm: '0.5em'}}>
                            <Typography variant="h6" gutterBottom align='left' ml="0.5em" fontWeight={"bold"}>
                                Categories
                            </Typography>
                            <ArrayInput source='categories' label="">
                                <SimpleFormIterator>
                                    <ChipField source="" />
                                </SimpleFormIterator>
                            </ArrayInput>
                        </Box>
                    </Box>
                    <Box></Box>

                </TabbedForm.Tab >
                <TabbedForm.Tab label="Description" >
                    <TextInput
                        label=""
                        source="description"
                        isRequired
                        fullWidth
                    />
                </TabbedForm.Tab>
                <TabbedForm.Tab label="Registrants" >
                    {registrants.map((d: any, i: number) => {
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
    </Box>
}

export default EventEdit;
