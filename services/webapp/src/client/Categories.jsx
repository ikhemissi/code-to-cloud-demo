
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NewItem from './NewItem.jsx';

export default function Categories({categories, createCategory}) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" component="h5" mb={2}>
                Categories
            </Typography>
            <NewItem label="New category" onCreate={createCategory} />
            <List sx={{ width: '100%' }}>
                {categories.map((category) => (
                    <ListItem key={category.id}>
                        <ListItemText primary={category.label} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
