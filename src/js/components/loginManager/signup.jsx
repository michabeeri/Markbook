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
                    <header className='header'>
                        <img src={Constants.APP_LOGO_SRC} alt='Markbook logo' width='150px'/>
                        <h1 className='title title-large'>{Constants.APP_NAME}</h1>
                        <h2 className='title title-normal'>Sign-Up</h2>
                    </header>
                );
            }
        });

        var SignupFooter = React.createClass({
            displayName: 'LoginFooter',
            render: function () {
                return (
                    <footer className='footer'>
                        <h4 className='title-small'>Already have an account? <LoginLink {...this.props}/></h4>
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
                    <a className='btn btn-inline' href='#' onClick={this.clickHandler}>Login</a>
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
                this.props.dispatch(ActionProvider.login(username, uid, token));
                this.props.dispatch(
                    ActionProvider.addBookmark(Constants.ROOT_GROUP_ID, 'My First Bookmark', 'http://www.memebucket.com/mb/2012/09/Javascript-535.png', []));
                this.props.dispatch(ReduxSimpleRouter.routeActions.push('/'));
                this.props.dispatch(ActionProvider.turnOnFlag(Constants.FIRST_VISIT_FLAG));
            },
            failureSignup: function (errorValue) {
                this.setState({errorMessage: errorValue});
            },
            onSignup: function (event) {
                event.preventDefault();
                console.log('onSignup!');
                var validationResult = LoginManager.validateSignUpInfo(this.refs.pass.getValue(),
                    this.refs.passConfirm.getValue(), this.refs.email.getValue());
                if (validationResult === LoginManager.RESULT_VALUES.success) {
                    LoginManager.createUserOnDataBase(this.refs.email.getValue(), this.refs.pass.getValue(),
                        this.successSignup, this.failureSignup);
                } else {
                    this.setState({errorMessage: validationResult});
                }
            },
            render: function () {
                return (
                    <form onSubmit={this.onSignup} className='form'>
                        <ErrorMessage errorMessage={this.state.errorMessage}/>
                        <ul className='style-less-list'>
                            <li><EmailInput ref='email'/></li>
                            <li>
                                <PasswordInput ref='pass'/>
                                <span className='tooltip title-small'>min 6 characters</span>
                            </li>
                            <li><PasswordInput ref='passConfirm' placeholder='Confirm Password'/></li>
                        </ul>
                        <button className='btn' type='submit'>Signup</button>
                    </form>
                );
            }
        });

        var signUpComp = React.createClass({
            displayName: 'Signup',
            render: function () {
                return (
                    <section className='main signup'>
                        <div className='form-container sign-up-container'>
                            <SignupHeader />
                            <SignupForm {...this.props}/>
                            <SignupFooter {...this.props}/>
                        </div>
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
