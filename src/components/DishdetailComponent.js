import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);
    }

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
            const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
            const commentsAll = comments.map(comment => {
                const date = new Date(comment.date);
                const month = formatter.format(new Date(comment.date));
                return (
                    <ul className="list-unstyled" key={comment.id}>
                        <li>{comment.comment}</li>
                        <li>-- {comment.author}, {month} {date.getDate()}, {date.getFullYear()}</li>
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
        const {selectedDish} = this.props;
        console.log(selectedDish)
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(selectedDish)}
                </div>
                <ListGroup className="col-12 col-md-5 m-1">
                    {selectedDish ? this.renderComments(selectedDish.comments) : ''}
                </ListGroup>
            </div>
        )
    }
}

export default DishDetail;