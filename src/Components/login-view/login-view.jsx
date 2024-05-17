import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        const accessData = {
            username: username,
            password: password
        }

        fetch("https://moviedb-fdeb4b5f0aa4.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(accessData)
        })
            .then((response) => response.json())
            .then((userLogged) => {
                if (userLogged) {
                    localStorage.setItem("user", userLogged.user.username);
                    localStorage.setItem("token", userLogged.token);
                    onLoggedIn(userLogged.user.username, userLogged.token);
                } else {
                    alert('Username or password invalid.');
                }
            })
            .catch((err) => {
                alert('Username or password invalid.');
                console.error(err);
            })
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="mb-4">Login</h2>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formUsername" className="mb-3">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                minLength={5}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={8}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}