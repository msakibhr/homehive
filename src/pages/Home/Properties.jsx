import Property from "./Property";

const Properties = ({ properties }) => {
    return (
        <div className="my-20 mx-4 sm:mx-20">
            <h1 className="text-center text-3xl font-bold">Discover Our Featured Listings</h1>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    properties.map(property => <Property key={property.id} property={property}></Property>)
                }
            </div>
        </div>
    );
};

export default Properties;