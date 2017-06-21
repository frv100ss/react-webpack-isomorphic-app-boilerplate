import React from 'react';
import TextField from 'material-ui/TextField';import {connect} from 'react-redux';
import * as actionCreators from "./../../data/articleActionsCreators";
import {bindActionCreators} from 'redux';

class Title extends React.Component {

    constructor(props) {
        super(props);
        this.handleCorpus = this.handleCorpus.bind(this);
        this.state=({
            corpus: ""
        })
    }

    handleCorpus(e, corpus) {
        const {
            action,
        } = this.props;

        this.setState({
            corpus:corpus
        });

        action.articleCorpus(corpus);
    };

    handleCurrentCorpus(corpus) {
        const {
            action,
        } = this.props;

        this.setState({
            corpus:corpus
        });

        action.articleCorpus(corpus);
    };

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                corpus:this.props.corpus
            })
            this.handleCurrentCorpus(this.state.corpus)
        }, 200)
    }

    render() {

        return (
            <TextField
                style={{fontSize:"14px"}}
                floatingLabelText="Corps de l'article"
                name="title"
                id="articleTitle"
                floatingLabelFixed={true}
                fullWidth={true}
                onChange={this.handleCorpus}
                value={this.state.corpus}
                multiLine={true}
                rows={7}
            />
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {action: bindActionCreators(actionCreators, dispatch)}
};

export default connect(null, mapDispatchToProps)(Title)