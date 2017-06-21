import React from 'react';
import Chip from 'material-ui/Chip';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';
import * as actionCreators from "./../../data/articleActionsCreators";
import {bindActionCreators} from 'redux';

class Tags extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chipData: [],
            tagsToAdd:[]
        };
        this.styles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
        };

        this.handleAddTags = this.handleAddTags.bind(this);

    }

    handleAddTags() {
        this.chipData = this.state.chipData;
        this.tagsToAdd = this.state.tagsToAdd;
        let titleValue =  this.title.getValue();

        if(titleValue !==""){
            this.chipData.push({key:this.chipData.length, label:titleValue});
            console.log('legnth', this.chipData.length)
            this.setState({chipData: this.chipData});
            this.tagsToAdd.push(this.chipData[this.chipData.length-1].label);
        }

        const {
            action,
        } = this.props;
        action.articleAddTag(JSON.stringify(this.tagsToAdd));
        console.log('www', this.tagsToAdd);
    };

    handleRequestDelete(key) {
        this.chipData = this.state.chipData;
        const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
        this.chipData.splice(chipToDelete, 1);
        this.setState({chipData: this.chipData});
        console.log('handlerequest', this.chipData.label)

        const {
            action,
        } = this.props;
        action.articleTags(this.chipData.label);



    };

    renderChip(data) {
        return (
                <Chip
                    key={data.key}
                    onRequestDelete={() => this.handleRequestDelete(data.key)}
                    style={this.styles.chip}
                >
                    {data.label}
                </Chip>
        );
    }

    render() {
        return (
            <div>
                <TextField
                    ref={(input) => this.title = input}
                    floatingLabelText="Tags"
                    floatingLabelFixed={true}
                    fullWidth={false}
                />
                <FloatingActionButton mini={true}>
                    <ContentAdd
                        onClick={(this.handleAddTags)}
                    />
                </FloatingActionButton>
                <div style={this.styles.wrapper}>
                    {this.state.chipData.map(this.renderChip, this)}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {action: bindActionCreators(actionCreators, dispatch)}
};



export default connect(null, mapDispatchToProps)(Tags)