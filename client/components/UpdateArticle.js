import React from 'react';
import {Card} from 'material-ui/Card';
import areIntlLocalesSupported from 'intl-locales-supported';
import DatePickerArticle from './UpdateArticle/DatePicker'
import TimePickerArticle from './UpdateArticle/TimePicker'
import Title from './UpdateArticle/Title'
import Corpus from './UpdateArticle/Corpus'
import Tags from './UpdateArticle/Tags'
import MainImg from './UpdateArticle/MainImg'
import RaisedButton from "material-ui/RaisedButton";

let DateTimeFormat;
/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
}
const style = {
    fontSize: 14,
    color: "red",
};

const UpdateArticle = ({
                           props,
                           onSubmit,
                           onChange,
                           errors,
                       }) => (

        <div>
            <Card className="article-form">
                <form action="/" onSubmit={onSubmit}>
                    {errors.summary && <p className="error-message">{errors.summary}</p>}

                    <DatePickerArticle {...props} />
                    {errors.date && <p style={style}>{errors.date}</p>}

                    <TimePickerArticle {...props}/>
                    {errors.hour && <p style={style}>{errors.hour}</p>}

                    <MainImg {...props}/>
                    {errors.mainImg && <p style={style}>{errors.mainImg}</p>}

                    <Title {...props}/>
                    {errors.title && <p style={style}>{errors.title}</p>}

                    <Corpus {...props}/>
                    {errors.corpus && <p style={style}>{errors.corpus}</p>}

                    <Tags {...props}/>
                    {errors.tags && <p style={style}>{errors.tags}</p>}

                    <div className="button-line">
                        <RaisedButton type="submit" label="Envoyer" primary/>
                    </div>
                </form>
            </Card>
        </div>
    )
;

export default UpdateArticle;