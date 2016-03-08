define(['lodash', 'react', 'router', 'components/loginManager/login-fields/email', 'components/loginManager/login-fields/password', 'components/loginManager/loginManager', 'constants', 'ReduxSimpleRouter', 'reactRedux', 'actionProviders/actions', 'components/loginManager/errorMessage'], function (_, React, ReactRouter, EmailInput, PasswordInput, LoginManager, Constants, ReduxSimpleRouter, ReactRedux, ActionProvider, ErrorMessage) {
        'use strict';

        //var Link = ReactRouter.Link;

        var LoginHeader = React.createClass({
            displayName: 'LoginHeader', render: function () {
                return (
                    <header className='header'>
                        <img src='img/logo.png' alt='markbook logo' width='150px'/>

                        <h1>{Constants.APP_NAME}</h1>
                    </header>
                );
            }
        });

        var LoginFooter = React.createClass({
            displayName: 'LoginFooter', render: function () {
                return (
                    <footer>
                        <h4>Don't have an account? <SignupLink {...this.props}/></h4>
                    </footer>
                );
            }
        });

        var SignupLink = React.createClass({
            displayName: 'SignupLink', clickHandler: function (event) {
                event.preventDefault();
                this.props.dispatch(ReduxSimpleRouter.routeActions.push('/signup'));
            }, render: function () {
                return (
                    <a href='#' onClick={this.clickHandler}>Sign Up</a>
                );
            }
        });

        var LoginForm = React.createClass({
            displayName: 'LoginForm',

            getInitialState: function () {
                return {errorMessage: ''};
            }, failureLogin: function (errorValue) {
                this.setState({errorMessage: errorValue});
            }, successLogin: function (username, uid, token) {
                this.props.dispatch(ActionProvider.login(username, uid, token));
                this.props.dispatch(ReduxSimpleRouter.routeActions.push('/'));
            }, onLogin: function (event) {
                console.info('onLogin');
                event.preventDefault();
                LoginManager.authenticateUser(this.refs.email.getValue(), this.refs.password.getValue(), this.successLogin, this.failureLogin);
            }, render: function () {
                return (
                    <form onSubmit={this.onLogin} className='form login-form'>
                        <ErrorMessage errorMessage={this.state.errorMessage}/>
                        <ul className='style-less-list'>
                            <li><EmailInput ref='email'/></li>
                            <li><PasswordInput ref='password'/></li>
                        </ul>
                        <button className='btn login' type='submit' onClick={this.onLogin}>Login</button>
                    </form>
                );
            }
        });

        var loginComponent = React.createClass({
            displayName: 'Login', render: function () {
                return (
                    <section className='main login'>
                        <LoginHeader />
                        <LoginForm className='login-form' {...this.props}/>
                        <LoginFooter {...this.props}/>
                    </section>
                );
            }
        });

        return ReactRedux.connect(function (state) {
                return {
                    state: state
                };
            }, function (dispatch) {
                return {
                    dispatch: dispatch
                };
            })(loginComponent);

    });
