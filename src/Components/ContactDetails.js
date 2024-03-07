import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ContactDetails() {
  const { contid } = useParams();
  const [contdata, setContData] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/contacts/" + contid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
          setContData(resp);
        // console.log( resp);

      })
      .catch((err) => {
        // console.log(err.message);
      });
  });
  return (
    <div>
      {contdata && (
        <div>
          <h4> The Contact Details :</h4>
          <h4>ID : {contdata.id}</h4>
          <h4>Name : {contdata.name}</h4>
          <h4>Email : {contdata.email}</h4>
          <h4>Phone : {contdata.phone}</h4>
          <h4>Status : {contdata.isActive ? "Active" : "Inactive"}</h4>
          <Link className="btn btn-primary" to="/" >Contacts</Link>
        </div>
      )}
    </div>
  );
}

export default ContactDetails;
