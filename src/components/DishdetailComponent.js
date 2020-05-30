import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';

class DishDetail extends Component {

   renderDish(dish) {
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

    renderComments(comments) {
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

    render() {
        const {dish} = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(dish)}
                    </div>
                    <ListGroup className="col-12 col-md-5 m-1">
                        {dish ? this.renderComments(dish.comments) : ''}
                    </ListGroup>
                </div>
            </div>
        )
    }
}

export default DishDetail;