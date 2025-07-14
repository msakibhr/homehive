import { useLoaderData, useParams } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import useTitle from "../../hooks/useTitle";

const PropertyDetails = () => {
    const properties = useLoaderData();
    const { id } = useParams();
    const idInt = parseInt(id);
    const property = properties.find(p => p.id === idInt);
    console.log(property);

    const { image, estate_title, segment_name, description, price, status, area, location, facilities } = property;

    // useTitle(`${estate_title || "Property Details"} - HomeHive`);
    // Set dynamic title safely
    useTitle(property?.estate_title ? `${property.estate_title} - HomeHive` : "Property Details - HomeHive");

    return (
        <div>
            <Navbar></Navbar>
            <div className="mt-5 mb-20 lg:mx-40">
                <h1 className="text-3xl font-bold text-center">Property Details</h1>
                <div className="mt-10">
                    <img src={image} alt="" className="w-full" />
                </div>
                <div className="mt-5 mx-2 lg:mx-0 space-y-2 text-lg sm:text-2xl font-bold">
                    <div className="flex items-center"><span className="w-36 sm:w-44">Property ID</span>: <span className="ml-2 font-normal">{id}</span></div>
                    <div className="flex items-center"><span className="w-36 sm:w-44 shrink-0">Estate Title</span>: <span className="ml-2 font-normal">{estate_title}</span></div>
                    <div className="flex items-center"><span className="w-36 sm:w-44 shrink-0">Segment Name</span>: <span className="ml-2 font-normal">{segment_name}</span></div>
                    <div className="flex items-center"><span className="w-36 sm:w-44 shrink-0">Description</span>: <span className="ml-2 font-normal">{description}</span></div>
                    <div className="flex items-center"><span className="w-36 sm:w-44 shrink-0">Price</span>: <span className="ml-2 font-normal">{price}</span></div>
                    <div className="flex items-center"><span className="w-36 sm:w-44 shrink-0">Status</span>: <span className="ml-2 font-normal">For {status}</span></div>
                    <div className="flex items-center"><span className="w-36 sm:w-44 shrink-0">Area</span>: <span className="ml-2 font-normal">{area}</span></div>
                    <div className="flex items-center"><span className="w-36 sm:w-44 shrink-0">Location</span>: <span className="ml-2 font-normal">{location}</span></div>
                    <div className="flex items-center"><span className="w-36 sm:w-44 shrink-0">Facilities</span>: <span className="ml-2 font-normal">{facilities.join(", ")}</span></div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;