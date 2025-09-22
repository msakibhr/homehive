import { useEffect, useState } from 'react';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

const PropertyMap = () => {
    useTitle('Property Map - HomeHive');
    const { user } = useAuth();
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    // Custom marker icon
    const customIcon = new Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    useEffect(() => {
        // Fetch properties data
        fetch('/properties.json')
            .then(res => res.json())
            .then(data => {
                setProperties(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching properties:', error);
                setLoading(false);
            });
    }, []);

    const handlePropertyClick = (propertyId) => {
        navigate(`/properties/${propertyId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Property Map</h1>
                            <p className="mt-2 text-gray-600">
                                Explore properties on an interactive map
                            </p>
                        </div>
                        <div className="text-sm text-gray-500">
                            Welcome, {user?.displayName || user?.email}
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Container */}
            <div className="h-[calc(100vh-200px)]">
                <MapContainer
                    center={[23.8041, 90.4152]} // Dhaka, Bangladesh coordinates
                    zoom={6}
                    // scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}
                    className="z-0"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    {properties.map((property) => (
                        <Marker
                            key={property.id}
                            position={[property.latitude, property.longitude]}
                            icon={customIcon}
                        >
                            <Popup>
                                <div className="p-2">
                                    <img 
                                        src={property.image} 
                                        alt={property.title}
                                        className="w-full h-32 object-cover rounded mb-2"
                                    />
                                    <h3 className="font-semibold text-lg">{property.title}</h3>
                                    <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                                    <p className="text-green-600 font-bold">{property.price}</p>
                                    <div className="flex items-center mt-2 text-sm text-gray-500">
                                        <span className="mr-4">🛏️ {property.bedrooms}</span>
                                        <span className="mr-4">🚿 {property.bathrooms}</span>
                                        <span>📐 {property.area}</span>
                                    </div>
                                    <button
                                        onClick={() => handlePropertyClick(property.id)}
                                        className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            {/* Map Info */}
            <div className="bg-white border-t">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <div>
                            <span className="font-medium">{properties.length}</span> properties found
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <img 
                                    src="https://cdn-icons-png.flaticon.com/512/684/684908.png" 
                                    alt="Property marker" 
                                    className="w-4 h-4 mr-1"
                                />
                                <span>Property Location</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyMap;