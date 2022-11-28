import React, { useCallback, useEffect, useState } from 'react';
import TextField from "@mui/material/TextField"
import InputAdornment from '@mui/material/InputAdornment';
import CloseButton from 'react-bootstrap/CloseButton';
// import debounce from 'lodash.debounce';


const SearchBar = ({ onSearch }) => {
    const [qSerch, setSearch] = useState('');
    const [debounced, setDebounced] = useState(qSerch);

    const Icon = () => (
        debounced === '' ? <img alt='img' src="/searchIcon.png" />
            : <CloseButton onClick={() => setDebounced('')} />
    )

    useEffect(() => {
        const timer = setTimeout(() => setSearch(debounced), 1500);
        return () => clearTimeout(timer);
    }, [debounced])

    // useEffect(() => {
    //     const timer = setTimeout(() => setSearch(debounced), 1500);
    //     return () => clearTimeout(timer);
    // }, [debounced]);

    useEffect(() => {
        onSearch(qSerch);
    }, [qSerch]);

    // const debouncedSave = useCallback(
	// 	debounce(val => onSearch(val), 1000),
	// 	[], // will be created only once initially
	// );

    // const handleChange = (e) => {
    //     const newVal = e.target.value;
    //     setSearch(newVal);
    //     debouncedSave(newVal);
    // }


    return (
        <TextField
            id="outlined-basic"
            onChange={(e) => setDebounced(e.target.value)}
            variant="standard"
            fullWidth
            value={debounced}
            label="Recherche ..."
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                        <Icon />
                    </InputAdornment>
                )
            }}
        />
    );
};

export default SearchBar;