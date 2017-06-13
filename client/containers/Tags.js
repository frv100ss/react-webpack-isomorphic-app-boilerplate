import React from 'react';
import Chip from 'material-ui/Chip';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';


export default class Tags extends React.Component {

    constructor(props) {
        super(props);
        this.state = {chipData: [
        ]};
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
        let inputValue =  this.input.getValue();

        if(inputValue !==""){
            this.chipData.push({key:this.chipData.length, label:inputValue});
            console.log('legnth', this.chipData.length)
            this.setState({chipData: this.chipData});
            console.log('addTags', this.chipData)

        }
    };

    handleRequestDelete(key) {
        this.chipData = this.state.chipData;
        const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
        this.chipData.splice(chipToDelete, 1);
        this.setState({chipData: this.chipData});
        console.log('handlerequest', this.chipData)
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
                    ref={(input) => this.input = input}
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