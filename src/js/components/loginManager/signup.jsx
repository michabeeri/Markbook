define(['lodash',
        'react',
        'router',
        'components/loginManager/login-fields/email',
        'components/loginManager/login-fields/password',
        'components/loginManager/loginManager'],
    function (_,
        React,
        ReactRouter,
        EmailInput,
        PasswordInput,
        LoginManager) {
        'use strict';

        var Link = ReactRouter.Link;

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
                        <h4>Already have an account? <LoginLink /></h4>
                    </footer>
                );
            }
        });

        var LoginLink = React.createClass({
            displayName: 'LoginLink',
            render: function () {
                return (
                    <Link to='/'>Login</Link>
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

        return React.createClass({
            displayName: 'Signup',
            render: function () {
                return (
                    <section>
                        <SignupHeader />
                        <SignupForm />
                        <SignupFooter />
                    </section>
                );
            }
        });


    });
