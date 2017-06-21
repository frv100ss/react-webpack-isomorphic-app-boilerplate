import React from 'react';
import TextField from 'material-ui/TextField';import {connect} from 'react-redux';
import * as actionCreators from "./../../data/articleActionsCreators";
import {bindActionCreators} from 'redux';


class Corpus extends React.Component {

    constructor(props) {
        super(props);
        this.handleTitle = this.handleTitle.bind(this);
    }

    handleTitle(e, corpus) {
        const {
            action,
        } = this.props;
        action.articleCorpus(corpus);
    };

    render() {

        const {
            corpus
        } = this.props;

        return (
            <TextField
                style={{fontSize: "14px"}}
                floatingLabelText="Corps de l'article"
                floatingLabelFixed={true}
                fullWidth={true}
                multiLine={true}
                rows={7}
                onChange={this.handleTitle}
                value={corpus}
                name="corpus"
            />
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {action: bindActionCreators(actionCreators, dispatch)}
};

export default connect(null, mapDispatchToProps)(Corpus)