import React from 'react';
import TextField from 'material-ui/TextField';import {connect} from 'react-redux';
import * as actionCreators from "./../../data/articleActionsCreators";
import {bindActionCreators} from 'redux';



class Title extends React.Component {

    constructor(props) {
        super(props);
        this.handleTitle = this.handleTitle.bind(this);
        this.state=({
            title: ""
        })
    }

    handleTitle(e, title) {
        const {
            action,
        } = this.props;

        this.setState({
            title:title
        });

        action.articleTitle(title);
    };

    handleCurrentTitle(title) {
        const {
            action,
        } = this.props;

        this.setState({
            title:title
        });

        action.articleTitle(title);
    };

    componentWillMount(){
        setTimeout(()=>{
            this.setState({
                title:this.props.title
            })
            this.handleCurrentTitle(this.state.title)
        }, 400)
    }

    render() {

        return (
            <TextField
                floatingLabelText="Titre"
                name="title"
                id="articleTitle"
                floatingLabelFixed={true}
                fullWidth={true}
                onChange={this.handleTitle}
                value={this.state.title}
            />
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {action: bindActionCreators(actionCreators, dispatch)}
};

export default connect(null, mapDispatchToProps)(Title)