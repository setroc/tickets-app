import { useState } from 'react'

const useSelectForm = (initialState) => {
    const [select, setSelect] = useState(initialState);
    const handleSelect = (e) => {
        setSelect(e.target.value);
    }

    return [
        select,
        handleSelect
    ]
};

export default useSelectForm;