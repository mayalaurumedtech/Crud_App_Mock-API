import axios from "axios";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();

    const history = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Submitted');
        axios.post('https://66a1e9a6967c89168f1e00a0.mockapi.io/crud-app', {
            name: name,
            email: email
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            })

            .then(() => {
                history("/read");
            })
    };

    return (
        <>
            <Container className="py-5">
                <div className="d-flex justify-content-between my-3">
                    <h2>Create User</h2>
                    <Link to={"/read"} ><Button className="btn-secondary">User List</Button></Link>
                </div>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label> Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter Name"
                            onChange={(event) => setName(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter email"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleSubmit}> Submit </Button>
                </Form>
            </Container>
        </>
    );
};

export default Create;
