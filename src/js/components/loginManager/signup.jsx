define(['lodash',
        'react',
        'router',
        'components/loginManager/login-fields/email',
        'components/loginManager/login-fields/password',
        'components/loginManager/loginManager',
        'ReduxSimpleRouter',
        'reactRedux',
        'actionProviders/actions',
        'components/loginManager/errorMessage',
        'constants'],
    function (_,
        React,
        ReactRouter,
        EmailInput,
        PasswordInput,
        LoginManager,
        ReduxSimpleRouter,
        ReactRedux,
        ActionProvider,
        ErrorMessage,
        Constants) {

        'use strict';

        var SignupHeader = React.createClass({
            displayName: 'LoginHeader',
            render: function () {
                return (
                    <header>
                        <img src='img/logo.png' alt='Markbook logo' width='150px'/>
                        <h1>{Constants.APP_NAME}</h1>
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

            getInitialState: function () {
                return {errorMessage: ''};
            },
            successSignup: function (username, uid, token) {
                this.props.dispatch(ActionProvider.addBookmark(Constants.ROOT_GROUP_ID, 'My First Bookmark', 'www.google.com', []));
                this.props.dispatch(ActionProvider.login(username, uid, token));
                this.props.dispatch(ReduxSimpleRouter.routeActions.push('/'));
                this.props.dispatch(ActionProvider.turnOnFlag(Constants.FIRST_VISIT_FLAG));
            },
            failureLogin: function (errorValue) {
                this.setState({errorMessage: errorValue});
            },
            onSignup: function (event) {
                event.preventDefault();
                console.log('onSignup!');
                var validationResult = LoginManager.validateSignUpInfo(this.refs.pass.getValue(), this.refs.passConfirm.getValue(), this.refs.email.getValue());
                if (validationResult === LoginManager.RESULT_VALUES.success) {
                    LoginManager.createUserOnDataBase(this.refs.email.getValue(), this.refs.pass.getValue(), this.successSignup, this.failureSignup);
                } else {
                    this.setState({errorMessage: validationResult});
                }
            },
            render: function () {
                return (
                    <form onSubmit={this.onSignup} className='signup-form'>
                        <ErrorMessage errorMessage={this.state.errorMessage} />
                        <ul className='style-less-list'>
                            <li><EmailInput ref='email'/></li>
                            <li><PasswordInput ref='pass'/></li> <span>min 6 characters</span>
                            <li><PasswordInput ref='passConfirm' placeholder='Confirm Password'/></li>
                        </ul>
                        <button className='signup' type='submit'>Signup</button>
                    </form>
                );
            }
        });

        var signUpComp = React.createClass({
            displayName: 'Signup',
            render: function () {
                return (
                    <section className='main'>
                        <SignupHeader />
                        <SignupForm {...this.props}/>
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
