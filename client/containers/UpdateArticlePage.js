import React from 'react';
import Auth from '../modules/Auth';
import UpdateArticle from '../components/UpdateArticle.js';
import {connect} from 'react-redux';
import axios from "axios";

class UpdateArticlePage extends React.Component {
    /**
     * Class constructor.
     */
    constructor(props, context) {
        super(props, context);
        this.processForm = this.processForm.bind(this);
        this.state = {
            errors: {},
            article: []
        };

    }

    componentDidMount() {
        const key = this.props.match.params._id;
        axios.defaults.headers.common['Authorization'] = `bearer ${Auth.getToken()}`;
        axios.post('/api/getArticle', {
            params: {
                _id: key
            }
        })
            .then(function (response) {
                this.setState({
                    article: response.data
                });
            }
                .bind(this));
    }

    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();
        console.log('key', this.props.match.params._id)

        // create a string for an HTTP body message
        const {
            date,
            hour,
            title,
            corpus,
            tags,
            mainImg
        } = this.props;

        const formData = `date=${date}&hour=${hour}&title=${title}&corpus=${corpus}&tags=${tags}&mainImg=${mainImg}`;
        const key = this.props.match.params._id;

        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/updateArticle');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.setRequestHeader('key', `${key}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                // success
                // change the component-container state
                this.setState({
                    errors: {}
                });

                window.location = "/";

            }
            else {
                // failure
                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;
                this.setState({
                    errors
                });
            }
        });

        xhr.send(formData);
    }

    /**
     * Render the component.
     */
    render() {
        return (<UpdateArticle
            props={this.state.article}
            errors={this.state.errors}
            onSubmit={this.processForm}
        />);
    }

}


const mapStateToProps = (state) => {
    return {
        date: state.CreateArticle.date,
        title: state.CreateArticle.title,
        corpus: state.CreateArticle.corpus,
        hour: state.CreateArticle.hour,
        tags: state.CreateArticle.tags,
        mainImg: state.CreateArticle.mainImg
    }
};

export default connect(mapStateToProps)(UpdateArticlePage)