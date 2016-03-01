define(['lodash',
        'react',
        'router',
        'components/loginManager/login-fields/email',
        'components/loginManager/login-fields/password',
        'components/loginManager/loginManager',
        'constants'],
    function (_,
        React,
        ReactRouter,
        EmailInput,
        PasswordInput,
        LoginManager,
        Constants) {
        'use strict';

        //var Link = ReactRouter.Link;

        var LoginHeader = React.createClass({
            displayName: 'LoginHeader',
            render: function () {
                return (
                    <header>
                        <img src='images/wix-icon.png' alt='markbook logo' width='150px'/>
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
                        <h4>Don't have an account? <SignupLink /></h4>
                    </footer>
                );
            }
        });

        var SignupLink = React.createClass({
            displayName: 'SignupLink',
            contextTypes: {
                router: React.PropTypes.object.isRequired
            },
            clickHandler: function (event) {
                event.preventDefault();
                this.context.router.push('/signup');
            },
            render: function () {
                return (
                    <a href='#' onclick={this.clickHandler}>Sign Up</a>
                );
            }
        });

        var LoginForm = React.createClass({
            displayName: 'LoginForm',
            onLogin: function (event) {
                console.info('onLogin');
                event.preventDefault();

                LoginManager.authenticateUser(this.refs.email.getValue(), this.refs.password.getValue());
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

        return React.createClass({
            displayName: 'Login',
            render: function () {
                return (
                    <section>
                        <LoginHeader />
                        <LoginForm className='login-form' />
                        <LoginFooter />
                    </section>
                );
            }
        });

    });
