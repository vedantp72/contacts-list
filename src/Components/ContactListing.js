import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import ContactCreate from './ContactCreate';
function ContactListing() {
    const [empdata, setEmpData] = useState(null);
    const navigate = useNavigate();

    const LoadDetails = (id) => {
        navigate("/contacts/details/" + id);
    };
    const EditDetails = (id) => {
        navigate("/contacts/edit/" + id);
    };
    const DeleteDetails = (id) => {
        if (window.confirm("Are you sure?\n you want to delete this record!")) {
            fetch("https://contactapi-cqjo.onrender.com/contacts-list-api/" + id, {
                method: "DELETE",
            })
                .then((res) => {
                    alert("Deleted successfully.");
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    };

    useEffect(() => {
        fetch("http://localhost:8000/contacts")
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                setEmpData(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-title App">
                    <h3>Employee Listing</h3>
                </div>
                <div className="card-body">
                    <div>
                        <Link
                            to="contacts/create"
                            className="btn btn-success bi bi-plus-circle mb-2"
                        >
                            {" "}
                            Add New
                        </Link>
                    </div>
                    <table className="table table-bordered table-hover">
                        <thead className="bg-dark text-white">
                            <tr className="text-center text-danger">
                                <td>ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody className="App">
                            {empdata &&
                                empdata.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>
                                            <a
                                                onClick={() => {
                                                    LoadDetails(item.id);
                                                }}
                                                className="btn btn-sm btn-primary bi bi-eye me-2"
                                            ></a>
                                            <a
                                                onClick={() => {
                                                    EditDetails(item.id);
                                                }}
                                                className="btn btn-sm btn-warning bi bi-pen me-2"
                                            ></a>
                                            <a
                                                onClick={() => {
                                                    DeleteDetails(item.id);
                                                }}
                                                className="btn btn-sm btn-danger bi bi-trash "
                                            ></a>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ContactListing;
