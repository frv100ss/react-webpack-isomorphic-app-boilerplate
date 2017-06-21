import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';
import {connect} from 'react-redux';
import * as actionCreators from "./../../data/articleActionsCreators";
import {bindActionCreators} from 'redux';
/**
 * `DatePicker` can be implemented as a controlled input,
 * where `value` is handled by state in the parent component.
 */
class DatePickerArticle extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, date) {
        const {
            action,
        } = this.props;
        action.articleDate(date);
    };

    render() {
        let DateTimeFormat;
        /**
         * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
         */
        if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
            DateTimeFormat = global.Intl.DateTimeFormat;
        }

        const {
            date
        } = this.props;

        return (
            <DatePicker
                value={date}
                onChange={this.handleChange}
                floatingLabelText="Date de publication"
                floatingLabelFixed={true}
                autoOk={true}
                DateTimeFormat={DateTimeFormat}
                okLabel="OK"
                cancelLabel="Annuler"
                locale="fr"
                fullWidth={true}
            />
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return {action: bindActionCreators(actionCreators, dispatch)}
};

const mapStateToProps = (state) => {
    return {
        date:state.CreateArticle.date
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DatePickerArticle)