import React from 'react';
import TimePicker from 'material-ui/TimePicker';
import {connect} from 'react-redux';
import * as actionCreators from "./../../data/articleActionsCreators";
import {bindActionCreators} from 'redux';

class TimePickerArticle extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        const defaultTime= new Date();
        defaultTime.getTime();
        this.state = ({
            hour: {},
            defaultTime:defaultTime
        })
    }

    handleChange(event, hour) {
        const {
            action,
        } = this.props;

        this.setState({
            hour: hour
        });
        action.articleHour(hour);
    };

    handleCurrentTime(hour) {
        const {
            action,
        } = this.props;

        this.setState({
            hour: hour
        });
        action.articleHour(hour);
    };

    componentDidMount(){
        const defaultTime= new Date();
        defaultTime.getTime();
        this.handleCurrentTime(defaultTime)
    }

    render() {
        return (
            <TimePicker
                format="24hr"
                defaultTime={this.state.defaultTime}
                floatingLabelText="Heure de publication"
                floatingLabelFixed={true}
                okLabel="OK"
                fullWidth={true}
                cancelLabel="Annuler"
                onChange={this.handleChange}
                onFocus={this.handleShow}
            />
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return {action: bindActionCreators(actionCreators, dispatch)}
};

export default connect(null, mapDispatchToProps)(TimePickerArticle)