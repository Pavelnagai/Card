import React, {ChangeEvent, useState} from 'react';

const Search = () => {
    const [value, setValue] = useState("")
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onSearch = () => {
        setValue('')
    }
    return (
        <div>
            <input onChange={onChangeInput} value={value} type="text"/>
            <button onClick={()=>{onSearch()}}>Search</button>
        </div>
    );
};

export default Search;