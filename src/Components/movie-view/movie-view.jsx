import "./movie-view.scss";
import React from "react";
import { Col, Row, Figure, Button } from "react-bootstrap";
import { ArrowReturnLeft } from "react-bootstrap-icons";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div className="movie-view">
            <Button variant="outline-light" onClick={onBackClick}>
                <ArrowReturnLeft />
            </Button>

            <Row className="justify-content-md-center">
                <Col xs={6} md={11}>
                    <h2>{movie.title}</h2>
                    <span>Genre: {movie.genre}</span>
                    <p>Description: {movie.description}</p>
                </Col>
                <Col md={1}>
                    <h5>Director</h5>
                    <Figure className="figure-director">
                        {movie.director && (
                            <>
                                <Figure.Image
                                    title={movie.director}
                                    className="rounded"
                                    width={50}
                                    height={50}
                                    alt="director image"
                                />
                                <Figure.Caption className="text-light text-center">
                                    {movie.director.split(" ").map((word, index) => (
                                        <React.Fragment key={index}>
                                            {word}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </Figure.Caption>
                            </>
                        )}
                    </Figure>
                </Col>
            </Row>
        </div>
    );
};