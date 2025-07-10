import React from 'react'
import { 
    Stack,
    Box,
    Divider
  } from '@material-ui/core';

function HSeparator() {
    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
            <Box display="flex" flexDirection="column" textAlign="center" width={1}>
                <Divider variant="fullWidth" />
            </Box>
        </Stack>
    )
}

export default HSeparator
