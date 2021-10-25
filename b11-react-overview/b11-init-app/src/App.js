import React, { useState, useEffect } from "react";
import styled from "styled-components";


const Select = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [msg, setMsg] = useState({});


  const _handleSubmit = () => {

    setMsg({});
    if (!email) {
      setMsg({
        email: 'Email is required',
      });
      return 1;
    }
    if (!name) {
      setMsg({
        name: 'Name is required',
      });
      return 1;
    }
    if (!phone) {
      setMsg({
        phone: 'Phone is required',
      });
      return 1;
    }
    const isValidate = validateEmail(email);
    if (!isValidate) {
      setMsg({
        email: 'Email is invalid',
      });
      return 1;
    }

    // call api
    setMsg({
      email: 'Email is in used',
    });




    // b1 validate from
  }

  return (
    <div>
      <p >
        email: <input value={email} onChange={e => setEmail(e.target.value)} />
      </p>
      {(msg.email) ?
        <p style={{ color: 'red' }}>{msg.email}</p> :
        null}
      <p >
        name: <input value={name} onChange={e => setName(e.target.value)} />
      </p>
      {msg.name ? <p style={{ color: 'red' }}>{msg.name}</p> : null}
      <p >
        phone: <input value={phone} onChange={e => setPhone(e.target.value)} />
      </p>
      {msg.phone ? <p style={{ color: 'red' }}>{msg.phone}</p> : null}
      <button onClick={_handleSubmit}>Submit</button>
    </div>
  );

}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


export default Select;