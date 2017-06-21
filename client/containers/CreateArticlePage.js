import React from 'react';
import Auth from '../modules/Auth';
import CreateArticle from '../components/CreateArticle.js';
import {connect} from 'react-redux';

class CreateArticlePage extends React.Component {
    /**
     * Class constructor.
     */
    constructor(props, context) {
        super(props, context);
        this.processForm = this.processForm.bind(this);
        this.state = {
            errors:{}
        };

    }

    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

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

        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/createArticle');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);

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
        return (<CreateArticle
            errors={this.state.errors}
            onSubmit={this.processForm}
        />);
    }

}


const mapStateToProps = (state) => {
    return {
        date:state.CreateArticle.date,
        title: state.CreateArticle.title,
        corpus: state.CreateArticle.corpus,
        hour: state.CreateArticle.hour,
        tags: state.CreateArticle.tags,
        mainImg : state.CreateArticle.mainImg
    }
};

export default connect(mapStateToProps)(CreateArticlePage)