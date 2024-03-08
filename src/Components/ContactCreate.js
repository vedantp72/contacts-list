import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function ContactCreate() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [validate, setValidate] = useState(false);
    const [error, setError] = useState("");
    const [style , setStyle] = useState("");

    const navigate = useNavigate();
    
    
    const HandleSubmit = (e) => {
        e.preventDefault();
        const contdata = { name, email, phone, isActive };
        // console.log(id, name, email, phone, isActive);

        fetch("https://contactapi-cqjo.onrender.com/contacts-list-api/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contdata),
        })
            .then((res) => {
                alert("Contact Saved Successfully");
                navigate("/");
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    const VerifyId = () => {
        fetch("https://contactapi-cqjo.onrender.com/contacts-list-api/" + id)
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                if (resp.id) {
                    setError("ID already exist Try another");
                    setStyle("text-danger mt-2");
                    
                }else {
                    setError("ID available");
                    setStyle("text-success mt-2");
                }
            })
            .catch((err) => {
                // console.log(err.message);
            }); 
    }

    return (
        <div className="container mt-1">
                <h4 className="text-center">Create New Contact</h4>
            <form className="form-control" action="" onSubmit={HandleSubmit}>
                <dl className="">
                    <dt>ID</dt>
                    <dd>
                        <input
                            className="form-control mt-2"
                            type="text"
                            value={id}
                            disabled="disabled"
                            onChange={(e) => setId(e.target.value)}
                            onKeyUp={VerifyId}
                        />
                        <dd className={style}>{error}</dd>
                    </dd>
                    <dt>Name</dt>
                    <dd>
                        <input
                            required
                            className="form-control mt-2"
                            type="text"
                            onBlur={(e) => setValidate(true)}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </dd>
                    {name.length == 0 && validate && (
                        <dd className="text-danger mt-2">Name Required</dd>
                    )}
                    <dt>Email</dt>
                    <dd>
                        <input
                            required
                            className="form-control mt-2"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </dd>
                    <dt>Mobile</dt>
                    <dd>
                        <input
                            required
                            className="form-control mt-2 "
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </dd>
                    <dt>Is Active</dt>
                    <dd className="form-switch">
                        <input
                            className="form-check-input mt-2"
                            checked={isActive}
                            type="checkbox"
                            role="switch"
                            value={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                        />
                    </dd>
                    <button className="mt-2 btn btn-primary" type="submit">Submit</button>
                    <Link to="/" className="mt-2 mx-2 btn btn-danger">
                        Cancel
                    </Link>
                </dl>
            </form>
        </div>
    );
}

export default ContactCreate;
