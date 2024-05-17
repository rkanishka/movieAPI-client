import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export const SignupView = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        }

        fetch("https://moviedb-fdeb4b5f0aa4.herokuapp.com/users", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert('Signup successful');
                window.location.reload();
            } else {
                alert('Signup failed');
            }
        });
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="mb-4">Sign Up</h2>
                    <Form onSubmit={handleSignup}>
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

                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBirthday" className="mb-3">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
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