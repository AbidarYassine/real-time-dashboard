import {useEffect, useState} from "react";

const useSSE = (path, eventName, onOpen = null) => {

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const source = new EventSource(path);

        source.addEventListener('open', onOpen);
        source.addEventListener(eventName, (e) => {
            setLoading(false);
            const parsedData = JSON.parse(e.data);
            console.log('new event', parsedData);
            setData(parsedData);
        });
        source.addEventListener('error', (e) => {
            console.error('Error: ', e);
        });
        return () => source.close();
    }, [eventName, path]);

    return {data,loading};

}

export default useSSE;
