import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const onhandleSubmit = (e) => {
        e.preventDefault();

        if (searchTerm) {
            navigate(`/search/${searchTerm}`);

            setSearchTerm('');
        }
    };

    return (
        <Paper style={{ height: "6vh", paddingBottom: "4px", backgroundColor: "#121212" }}
            component='form'
            onSubmit={onhandleSubmit}
            sx={{
                borderRadius: 20, border: '3px solid #222222', pl: 2,
                boxShadow: 'none', mr: { sm: 5 },
            }} >
            <input
                className='search-bar'
                placeholder='Search...'
                style={{ height: "3vh", color: "white", paddingTop: "auto", backgroundColor: "#121212", '::placeholder': { color: "white" } }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IconButton type='submit' sx={{ p: '10px', color: 'red' }} aria-label='search'>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

export default SearchBar;
