import { useEffect, useState } from "react";
import Banner from "./Banner";
import Properties from "./Properties";

const Home = () => {
    const [properties, setProperties] = useState([]);
    useEffect(() => {
        fetch('properties.json')
            .then(res => res.json())
            .then(data => setProperties(data));
    }, []);

    return (
        <div>
            <Banner></Banner>
            <Properties properties={properties} ></Properties>
        </div>
    );
};

export default Home;