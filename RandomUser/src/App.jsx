import {useEffect, useRef, useState} from 'react'
import './App.css'
import api from "./services/api.js";

function App() {
    const [user, setUser] = useState();
    const fetched = useRef(false);
    const fetchUser = async () => {
        try {
            const response = await api.get("/api");
            setUser(response.data.results[0]);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (!fetched.current) {
            fetched.current = true;
            fetchUser();
        }
    }, []);

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div
                    className="text-center w-80 md:w-96 lg:w-1/3 bg-gray-800 shadow-lg p-6 rounded-lg text-white text-lg">
                    {!user ? (
                        <div className="flex justify-center items-center">
                            <div
                                className="loader border-t-4 border-b-4 border-indigo-500 w-12 h-12 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="mb-4">
                            <img
                                className="mx-auto mb-4 h-32 md:w-40 md:h-40 border-indigo-500 shadow-lg border-4 rounded-full"
                                src={user.picture.large}/>
                            <p><b>Name:</b> {user.name.title}. {user.name.first} {user.name.last}</p>
                            <p><b>Age:</b> {user.dob.age}</p>
                            <p><b>Gender:</b> {user.gender}</p>
                            <p><b>Nationality</b>: {user.nat}</p>
                            <p><b>E-mail:</b> {user.email}</p>
                            <p><b>Phone:</b> {user.phone}</p>
                            <p><b>Cell:</b> {user.cell}</p>
                            <p><b>Country:</b> {user.location.country}</p>
                            <p><b>City & State:</b> {user.location.city} - {user.location.state}</p>
                            <p><b>Address:</b> {user.location.street.name} {user.location.street.number}</p>
                        </div>
                    )}

                    <button onClick={fetchUser}
                            className="mt-5 cursor-pointer px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-300">
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default App
