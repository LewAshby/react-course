import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, ListGroup, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish({dish}) {
    if (dish){
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }
}

function RenderComments({comments}) {
    if (comments.length !== 0) {
        const formatter = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' });
        const commentsAll = comments.map(comment => {
            return (
                <ul className="list-unstyled" key={comment.id}>
                    <li>{comment.comment}</li>
                    <li>-- {comment.author}, {formatter.format(new Date(comment.date))} </li>
                    <br></br>
                </ul>
            );
        });
        
        return (
            <div>
                <h4>Comments</h4>
                {commentsAll}
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}

const DishDetail = (props) => {
    return props.dish != null ?
        <div className="container">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <ListGroup className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                </ListGroup>
            </div>
        </div>
        : ''
}

export default DishDetail;