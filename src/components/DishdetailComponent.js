import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, 
        ListGroup, Breadcrumb, BreadcrumbItem, Modal, 
        ModalHeader, ModalBody, Label, Button, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form'

const minLength = (len) => (value) => (value) && (value.length >= len);
const maxLength = (len) => (value) => !(value) || (value.length <= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    handleSubmit(values) {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
        this.setState({
            isModalOpen: false
        })
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return(            
            <>
                <Button outline onClick={this.toggleModal}>
                    <span class="fa fa-pencil fa-lg" aria-hidden="true"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating"
                                    placeholder="First Name"
                                    className="form-control">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="fullname">Your Name</Label>
                                <Control.text model=".fullname" id="fullname" name="fullname"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{minLength: minLength(3), maxLength: maxLength(15)}} />
                                <Errors className="text-danger" model=".fullname" show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    className="form-control" rows="6"/>
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" color="primary">Submit</Button>
                            </FormGroup>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

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
                <CommentForm/>
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