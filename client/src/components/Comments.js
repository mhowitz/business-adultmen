import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const Comments = (comments) => {
    // const comments = product.comments || [];
    console.log(comments);
    return (
        <Card.Text>
            {comments.map((comment) => (
                <Card.Text>{comment}</Card.Text>
            ))}
        </Card.Text>
    )
}

export default Comments;