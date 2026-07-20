import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {


    const [debounceValue, setDebounceValue] = useState(value)


    useEffect(() => {
        if (!value) { return }
        if (!delay) { return }

        const timer = setTimeout(() => setDebounceValue(value), delay)


        return () => {
            clearTimeout(timer)
        };

    }, [value, delay])

    return debounceValue
}

export default useDebounce