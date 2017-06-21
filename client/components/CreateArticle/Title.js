import React from 'react';
import TextField from 'material-ui/TextField';import {connect} from 'react-redux';
import * as actionCreators from "./../../data/articleActionsCreators";
import {bindActionCreators} from 'redux';


class Title extends React.Component {

    constructor(props) {
        super(props);
        this.handleTitle = this.handleTitle.bind(this);

    }

    handleTitle(e, title) {
        const {
            action,
        } = this.props;
        action.articleTitle(title);
    };

    render() {

        const {
            title
        } = this.props;

        return (
            <TextField
                floatingLabelText="Titre"
                name="title"
                id="articleTitle"
                floatingLabelFixed={true}
                fullWidth={true}
                onChange={this.handleTitle}
                value={title}
            />
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {action: bindActionCreators(actionCreators, dispatch)}
};

export default connect(null, mapDispatchToProps)(Title)