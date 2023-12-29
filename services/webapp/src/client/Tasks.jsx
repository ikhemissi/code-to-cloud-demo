
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import NewItem from './NewItem.jsx';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

const emptyCategory = {
    id: 'none',
    label: 'N/A',
};

function TaskCategory({taskId, categoryId, categories, updateTask}) {
    function updateCategory(event) {
        updateTask(taskId, {
            categoryId: event.target.value,
        });
    }

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small" variant='standard'>
            <Select
                value={categoryId || 'none'}
                displayEmpty
                onChange={updateCategory}
            >
                {categories.concat(emptyCategory).map((category) => (
                    <MenuItem
                        key={category.id}
                        value={category.id}
                    >
                        {category.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default function Tasks({todos, categories, createTask, updateTask}) {
    function toggleTask(id, done) {
        updateTask(id, {
            done,
        });
    }

    return (
        <Box borderLeft={1} paddingLeft={5}>
            <Typography variant="h4" component="h5" mb={2}>
                Tasks
            </Typography>
            <NewItem label="New task" onCreate={createTask} />
            <List sx={{ width: '100%' }}>
                {todos.map((todo) => (
                    <ListItem key={todo.id} disablePadding disabled={!!todo.done}>
                        <ListItemButton role={undefined} onClick={() => toggleTask(todo.id, !todo.done)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={!!todo.done}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-label': todo.task }}
                                />
                            </ListItemIcon>
                            <ListItemText primary={todo.task} />
                        </ListItemButton>
                        <TaskCategory
                            taskId={todo.id}
                            categoryId={todo.categoryId}
                            categories={categories}
                            updateTask={updateTask}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
