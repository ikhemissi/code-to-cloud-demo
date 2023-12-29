import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function NewItem({label, onCreate}) {
    const [content, setContent] = useState('');
    
    function handleChange(event) {
        setContent(event.target.value);
    }

    function handleEnter(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleCreation();
        }
    }

    function handleCreation() {
        onCreate(content);
        setContent('');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Grid item xs={10}>
                    <TextField
                        label={label}
                        value={content}
                        onChange={handleChange}
                        onKeyDown={handleEnter}
                        fullWidth
                        size="small"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={1} textAlign="right" marginLeft={2}>
                    <Button onClick={handleCreation} variant="outlined">
                        Add
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
