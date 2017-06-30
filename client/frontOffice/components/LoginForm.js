import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Card, CardText} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import FloatingActionButton from 'material-ui/FloatingActionButton';

const styles = {
    btnClose: {
        position: 'absolute',
        top: 100,
        right: "7%"
    }
};

const handleButtonClose = props => {
    props.history.push('/')
};

const LoginForm = ({
    props,
    onSubmit,
    onChange,
    errors,
    successMessage,
    user
}) => (
    <Card className="container">
        <FloatingActionButton className="btnClose" style={styles.btnClose} onClick={() => handleButtonClose(props)}>
            <div>X</div>
        </FloatingActionButton>
        <form action="/" onSubmit={onSubmit}>
            <h2 className="card-heading">Se connecter</h2>

            {successMessage && <p className="success-message">{successMessage}</p>}
            {errors.summary && <p className="error-message">{errors.summary}</p>}

            <div className="field-line">
                <TextField
                    floatingLabelText="Email"
                    name="email"
                    id="userEmail"
                    errorText={errors.email}
                    onChange={onChange}
                    value={user.email}
                />
            </div>

            <div className="field-line">
                <TextField
                    floatingLabelText="Mot de passe"
                    type="password"
                    name="password"
                    id="userPassword"
                    onChange={onChange}
                    errorText={errors.password}
                    value={user.password}
                />
            </div>

            <div className="button-line">
                <RaisedButton type="submit" label="Se connecter" primary/>
            </div>

            <CardText>Pas encore membre ? <Link to={'/signup'}>S'inscrire</Link>.</CardText>
        </form>
    </Card>
);

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default LoginForm;