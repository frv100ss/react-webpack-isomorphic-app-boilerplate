import React from 'react';
import TimePicker from 'material-ui/TimePicker';
import {connect} from 'react-redux';
import * as actionCreators from "./../../data/articleActionsCreators";
import {bindActionCreators} from 'redux';
/**
 * `DatePicker` can be implemented as a controlled input,
 * where `value` is handled by state in the parent component.
 */
class TimePickerArticle extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        const defaultTime= new Date();
        defaultTime.getTime();
        this.state={
            hour:{},
            defaultTime:defaultTime
        }
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

        console.log('showing', hour)
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
                floatingLabelText="Heure de publication"
                floatingLabelFixed={true}
                okLabel="OK"
                fullWidth={true}
                cancelLabel="Annuler"
                onChange={this.handleChange}
                defaultTime={this.state.defaultTime}
            />
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return {action: bindActionCreators(actionCreators, dispatch)}
};

export default connect(null, mapDispatchToProps)(TimePickerArticle)