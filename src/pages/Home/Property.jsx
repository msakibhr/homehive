import { Link } from "react-router-dom";

const Property = ({ property }) => {
    const { id, image, estate_title, description, status, area, location, price } = property;
    return (
        <div className="card bg-base-100 w-96# shadow-lg">
            <figure>
                <img
                    // src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    src={image}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{estate_title}</h2>
                <p className="font-thin">{location}</p>
                <p>{description}</p>
                <p><span className="font-bold">Status:</span> for {status}</p>
                <p><span className="font-bold">Area:</span> {area}</p>
                <p><span className="font-bold">Price:</span> {price}</p>
                <div className="card-actions justify-end">
                    <Link className="btn btn-primary btn-block" to={`/properties/${id}`}>View Property</Link>
                </div>
            </div>
        </div>
    );
};

export default Property;