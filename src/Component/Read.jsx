import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Read = () => {

    const [data, setData] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    const [tableDark, setTableDark] = useState("");

    function getData() {
        axios.get("https://66a1e9a6967c89168f1e00a0.mockapi.io/crud-app")
            .then(response => {
                console.log(response.data);
                setData(response.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }


    function handleDelete(id) {
        axios.delete(`https://66a1e9a6967c89168f1e00a0.mockapi.io/crud-app/${id}`)
            .then(() => {
                getData();
            })
            .then(response => {
                console.log('User deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting data:', error);
            });
    }

    const setToLocalStorage = (id, name, email) => {
        localStorage.setItem("id", id);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
    }

    useEffect(() => {
        getData();
    }, []);

    const handleInputSearch = (e) => {
        setInputSearch(e.target.value.toLowerCase())
    }


    return (
        <>
            <Container className="py-5">
                <Form>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        onClick={() => {
                            if (tableDark === 'table-dark') setTableDark("");
                            else setTableDark("table-dark")
                        }}
                    />
                </Form>
                <div className="d-flex justify-content-between my-3">
                    <h2>User List</h2>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control type="search" placeholder="Search here" onChange={handleInputSearch} />
                        </Form.Group>
                    </Form>
                    <Link to={"/"} ><Button className="btn-secondary">Create User</Button></Link>
                </div>
                <Table className={`table ${tableDark}`}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.filter((el) => {
                            if (el === "") {
                                return el
                            }
                            else {
                                return (
                                    el.name.toLowerCase().includes(inputSearch) ||
                                    el.email.toLowerCase().includes(inputSearch)
                                )
                            }
                        }).map((eatchData, index) => {
                            return (
                                <>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{eatchData.name}</td>
                                        <td>{eatchData.email}</td>
                                        <td>
                                            <Link to={"/update"}>
                                                <Button
                                                    className="btn-success"
                                                    onClick={() => setToLocalStorage(eatchData.id, eatchData.name, eatchData.email)}>
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button className="btn-danger ms-4" onClick={() => handleDelete(eatchData.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default Read