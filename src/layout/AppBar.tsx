import * as React from 'react';
import {AppBar, TitlePortal} from 'react-admin';
import {Box, useMediaQuery, Theme} from '@mui/material';
import {LoadingIndicator, LocalesMenuButton} from 'react-admin';

const KUCCAppBar = () => {
    const isLargeEnough = useMediaQuery<Theme>(theme => theme.breakpoints.up("sm"));
    return (
        <AppBar color="secondary" toolbar={<AppBarToolbar />}>
            <TitlePortal />
            {isLargeEnough && <Box component="span" sx={{flex: 1}} />}
        </AppBar>
    );
};

const AppBarToolbar = () => (
    <>
        <LocalesMenuButton />
        <LoadingIndicator />
    </>
);




export default KUCCAppBar
