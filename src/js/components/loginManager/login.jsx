define(['lodash',
        'react',
        'router',
        'components/loginManager/login-fields/email',
        'components/loginManager/login-fields/password',
        'components/loginManager/loginManager',
        'constants',
        'ReduxSimpleRouter',
        'reactRedux',
        'actionProviders/actions'],
    function (_,
        React,
        ReactRouter,
        EmailInput,
        PasswordInput,
        LoginManager,
        Constants,
        ReduxSimpleRouter,
        ReactRedux,
        ActionProvider) {
        'use strict';

        //var Link = ReactRouter.Link;

        var LoginHeader = React.createClass({
            displayName: 'LoginHeader',
            render: function () {
                return (
                    <header>
                        <img src='img/logo.jpg' alt='markbook logo' width='150px'/>
                        <h1>{Constants.APP_NAME}</h1>
                    </header>
                );
            }
        });

        var LoginFooter = React.createClass({
            displayName: 'LoginFooter',
            render: function () {
                return (
                    <footer>
                        <h4>Don't have an account? <SignupLink {...this.props}/></h4>
                    </footer>
                );
            }
        });

        var SignupLink = React.createClass({
            displayName: 'SignupLink',
            clickHandler: function (event) {
                event.preventDefault();
                this.props.dispatch(ReduxSimpleRouter.routeActions.push('/signup'));
            },
            render: function () {
                return (
                    <a href='#' onClick={this.clickHandler}>Sign Up</a>
                );
            }
        });

        var LoginForm = React.createClass({
            displayName: 'LoginForm',
            successLogin: function (username, uid, token) {
                this.props.dispatch(ActionProvider.login(username, uid, token));
                this.props.dispatch(ReduxSimpleRouter.routeActions.push('/'));
            },
            onLogin: function (event) {
                console.info('onLogin');
                event.preventDefault();

                LoginManager.authenticateUser(this.refs.email.getValue(), this.refs.password.getValue(),
                this.successLogin);
            },
            render: function () {
                return (
                    <form onSubmit={this.onLogin} className='login-form'>
                        <ul className='style-less-list'>
                            <li><EmailInput ref='email'/></li>
                            <li><PasswordInput ref='password'/></li>
                        </ul>
                        <button className='login' type='submit' onClick={this.onLogin}>Login</button>
                        <p ref='alert' className='alert hide'>The email and password do not match!</p>
                    </form>
                );
            }
        });

        var loginComponent = React.createClass({
            displayName: 'Login',
            render: function () {
                return (
                    <section>
                        <LoginHeader />
                        <LoginForm className='login-form' {...this.props}/>
                        <LoginFooter {...this.props}/>
                    </section>
                );
            }
        });

        return ReactRedux.connect(
            function (state) {
                return {
                    state: state
                };
            },
            function (dispatch) {
                return {
                    dispatch: dispatch
                };
            }
        )(loginComponent);

    });
