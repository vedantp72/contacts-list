import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
function ContactEdit() {
  const { contid } = useParams();


  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [validate, setValidate] = useState(false);
  const [error, setError] = useState("");
  const [style, setStyle] = useState("");
  const navigate = useNavigate();
  // const [contdata, setcontData] = useState();

  const HandleSubmit = (e) => {
    e.preventDefault();
    const contdata = {id, name, email, phone, isActive };
    fetch("http://localhost:8000/contacts/" + contid, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contdata),
        })
            .then((res) => {
                alert("Contact Saved Successfully");
                console.log(contdata)
                navigate("/");
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
  

  useEffect(() => {
    fetch("http://localhost:8000/contacts/" + contid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setId(resp.id);
        setName(resp.name);
        setEmail(resp.email);
        setPhone(resp.phone);
        setIsActive(resp.isActive);
        // setcontData(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  },[]);

  return (
    <div className="container-fluid mt-1">
      <h4>Update Contact</h4>
      <form  onSubmit={HandleSubmit}>
        <dl className=" w-50">
          <dt>ID</dt>
          <dd>
            <input
              className="form-control mt-2 w-50"
              type="text"
              value={id}
              disabled="disabled"
              onChange={(e) => setId(e.target.value)}
            />
            <dd className={style}>{error}</dd>
          </dd>
          <dt>Name</dt>
          <dd>
            <input
              required
              className="form-control mt-2 w-50"
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
              className="form-control mt-2 w-50"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </dd>
          <dt>Mobile</dt>
          <dd>
            <input
              required
              className="form-control mt-2 w-50"
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
              // value={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </dd>
          <button className="mt-2 w-25 btn btn-primary" type="submit">
            Submit
          </button>
          <Link to="/" className="mt-2 mx-2 btn btn-danger">
            Cancel
          </Link>
        </dl>
      </form>
    </div>
  );
}

export default ContactEdit;
