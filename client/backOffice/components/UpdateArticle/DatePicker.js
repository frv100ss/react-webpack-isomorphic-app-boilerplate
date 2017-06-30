import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';
import {connect} from 'react-redux';
import * as actionCreators from "./../../../data/articleActionsCreators";
import {bindActionCreators} from 'redux';

class DatePickerArticle extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        const defaultDate= new Date();
        defaultDate.setFullYear(defaultDate.getFullYear());
        defaultDate.setHours(0, 0, 0, 0);
        this.state = ({
            date: {},
            defaultDate:defaultDate
        })
    }

    handleChange(event, date) {
        const {
            action,
        } = this.props;

        this.setState({
            date: date
        });
        action.articleUpdateDate(date);
    };

    handleCurrentDate(date) {
        const {
            action,
        } = this.props;

        this.setState({
            date: date
        });
        action.articleUpdateDate(date);
    };

    componentDidMount(){
        const defaultDate= new Date();
        defaultDate.setFullYear(defaultDate.getFullYear());
        defaultDate.setHours(0, 0, 0, 0);
        this.handleCurrentDate(defaultDate)
    }

    render() {

        let DateTimeFormat;
        /**
         * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
         */
        if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
            DateTimeFormat = global.Intl.DateTimeFormat;
        }

        return (
            <DatePicker
                defaultDate={this.state.defaultDate}
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


export default connect(null, mapDispatchToProps)(DatePickerArticle)