define(['lodash',
        'react',
        'router',
        'components/loginManager/login-fields/email',
        'components/loginManager/login-fields/password',
        'components/loginManager/loginManager',
        'ReduxSimpleRouter',
        'reactRedux'],
    function (_,
        React,
        ReactRouter,
        EmailInput,
        PasswordInput,
        LoginManager,
        ReduxSimpleRouter,
        ReactRedux) {
        'use strict';

        var SignupHeader = React.createClass({
            displayName: 'LoginHeader',
            render: function () {
                return (
                    <header>
                        <img src='img/logo.jpg' alt='Markbook logo' width='150px'/>
                        <h1>Kick-Mark</h1>
                        <h2>Sign-Up</h2>
                    </header>
                );
            }
        });

        var SignupFooter = React.createClass({
            displayName: 'LoginFooter',
            render: function () {
                return (
                    <footer>
                        <h4>Already have an account? <LoginLink {...this.props}/></h4>
                    </footer>
                );
            }
        });

        var LoginLink = React.createClass({
            displayName: 'LoginLink',
            clickHandler: function (event) {
                event.preventDefault();
                this.props.dispatch(ReduxSimpleRouter.routeActions.push('/login'));
            },
            render: function () {
                return (
                    <a href='#' onClick={this.clickHandler}>Login</a>
                );
            }
        });

        var SignupForm = React.createClass({
            mixins: [ReactRouter.History],
            displayName: 'SignUpForm',
            onSignup: function (event) {
                event.preventDefault();

                console.log('onSignup!');
                LoginManager.createUserOnDataBase(this.refs.email.getValue(), this.refs.pass.getValue(), this.refs.passConfirm.getValue());

            },
            render: function () {
                return (
                    <form onSubmit={this.onSignup} className='signup-form'>
                        <ul className='style-less-list'>
                            <li><EmailInput ref='email'/></li>
                            <li><PasswordInput ref='pass'/></li>
                            <li><PasswordInput ref='passConfirm' placeholder='Confirm Password'/></li>
                        </ul>
                        <button className='signup' type='submit'>Signup</button>
                        <p ref='alert' className='hide'>Passwords don't match</p>
                    </form>
                );
            }
        });

        var signUpComp = React.createClass({
            displayName: 'Signup',
            render: function () {
                return (
                    <section>
                        <SignupHeader />
                        <SignupForm />
                        <SignupFooter {...this.props}/>
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
        )(signUpComp);


    });
