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
    }

    handleChange(event, hour) {
        const {
            action,
        } = this.props;
        action.articleHour(hour);
    };

    render() {
        const {
            hour
        } = this.props;

        return (
            <TimePicker
                format="24hr"
                floatingLabelText="Heure de publication"
                floatingLabelFixed={true}
                okLabel="OK"
                fullWidth={true}
                cancelLabel="Annuler"
                onChange={this.handleChange}
                value={hour}
            />
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return {action: bindActionCreators(actionCreators, dispatch)}
};

const mapStateToProps = (state) => {
    return {
        hour: state.CreateArticle.hour
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TimePickerArticle)