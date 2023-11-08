import {
    Create,
    TextInput,
    NumberInput,
    SimpleForm,
    required,
    BooleanInput,
} from 'react-admin';
import {Box, Typography} from '@mui/material';
import Schedule from './Schedule';

const RoutineCreate = () => {
    return <Create>
        <SimpleForm>
            <Box display="flex" alignItems={"center"} width="100%">
                <Box flex={1} ml={{xs: 0, sm: '0.5em'}} mr={{xs: 0, sm: '0.5em'}}>
                    <Typography variant="h6" gutterBottom align='left' ml="0.5em" mb={"-0.5em"} fontWeight={"bold"}>
                        Faculty
                    </Typography>
                    <TextInput
                        label=""
                        source="faculty"
                        isRequired
                        fullWidth
                        validate={required()}
                    />
                </Box>
                <Box flex={1} ml={{xs: 0, sm: '0.5em'}} mr={{xs: 0, sm: '0.5em'}}>
                    <Typography variant="h6" gutterBottom align='left' ml="0.5em" mb={"-0.5em"} fontWeight={"bold"}>
                        Batch
                    </Typography>
                    <NumberInput
                        max={3000}
                        min={2000}
                        label=""
                        source="batch"
                        validate={required()}
                        fullWidth
                    />
                </Box>

            </Box>

            <Box flex={1} ml={{xs: 0, sm: '0.5em'}} mr={{xs: 0, sm: '0.5em'}}>
                <BooleanInput label="Is Draft?" source="isDraft" />
            </Box>
            <Typography variant="h6" gutterBottom align='left' ml="0.5em" mb={"-0.05em"} fontWeight={"bold"}>
                Schedule
            </Typography>
            <Schedule source={"schedule"}></Schedule>

        </SimpleForm>
    </Create>
}

export default RoutineCreate;

