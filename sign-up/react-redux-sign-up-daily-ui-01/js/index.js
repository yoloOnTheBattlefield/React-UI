'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SIGN_UP = 'SIGN_UP';
var SIGN_IN = 'SIGN_IN';
var EMAIL = 'EMAIL';
var NAME = 'NAME';
var PASSWORD = 'PASSWORD';
var RETYPE = 'RETYPE';
var VALIDATE_PASS = 'VALIDATE_PASS';
var SUBMIT = 'SUBMIT';
var SUBMIT_SIGN_IN = 'SUBMIT_SIGN_IN';

var initialState = {
  signUp: true,
  signIn: false,
  email: false,
  emailAdress: undefined,
  validName: false,
  name: '',
  password: '',
  retype: '',
  validPass: false,
  submit: false,
  submitSignIn: false
};

function reducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case SIGN_UP:
      return Object.assign({}, state, { signUp: true, signIn: false });
    case SIGN_IN:
      return Object.assign({}, state, { signUp: false, signIn: true });
    case EMAIL:
      return Object.assign({}, state, { email: true, emailAdress: action.payload });
    case NAME:
      return Object.assign({}, state, { validName: true, name: action.payload });
    case PASSWORD:
      return Object.assign({}, state, { password: action.payload });
    case RETYPE:
      return Object.assign({}, state, { retype: action.payload });
    case VALIDATE_PASS:
      return Object.assign({}, state, { validPass: true });
    case SUBMIT:
      return Object.assign({}, state, { submit: true });
    case SUBMIT_SIGN_IN:
      return Object.assign({}, state, { submitSignIn: true });
    default:
      return state;
  }
}

var Select = function Select() {
  var signUp = function signUp() {
    store.dispatch({ type: SIGN_UP });
  };
  var signIn = function signIn() {
    store.dispatch({ type: SIGN_IN });
  };
  return React.createElement(
    'div',
    { className: 'select' },
    React.createElement(
      'button',
      { className: store.getState().signUp ? 'btn active' : 'btn', onClick: signUp },
      'Sign Up'
    ),
    React.createElement(
      'button',
      { className: store.getState().signIn ? 'btn active' : 'btn', onClick: signIn },
      'Sign In'
    )
  );
};

var Password = function (_React$Component) {
  _inherits(Password, _React$Component);

  function Password(props) {
    _classCallCheck(this, Password);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    var show = props.label;
    _this.state = {
      label: show
    };
    return _this;
  }

  Password.prototype.enterPass = function enterPass(e) {
    var data = e.target.value;
    var containsDigits = /[0-9]/.test(data);
    var containsUpper = /[A-Z]/.test(data);
    var containsLower = /[a-z]/.test(data);
    this.setState({ label: true });
    if (containsDigits && containsUpper && containsLower && data.length >= 6) {
      this.props.enterPass(data);
      this.setState({ label: false });
    }
  };

  Password.prototype.checkPass = function checkPass(e) {
    var data = e.target.value;
    this.props.checkPass(data);
  };

  Password.prototype.render = function render() {
    var passwordMatch = store.getState().password ? 'Passwords do not match' : 'Retype Password';
    return React.createElement(
      'div',
      { className: 'password' },
      store.getState().signUp && this.state.label ? React.createElement(
        'label',
        null,
        'Password must contain at least one capital letter, one number and one small letter and have a length of minimum 6 characters'
      ) : '',
      React.createElement('input', {
        className: 'form-control',
        placeholder: this.props.retype ? passwordMatch : 'Password',
        type: 'password',
        onChange: this.props.retype ? this.checkPass.bind(this) : this.enterPass.bind(this)
      })
    );
  };

  return Password;
}(React.Component);

var Email = function (_React$Component2) {
  _inherits(Email, _React$Component2);

  function Email() {
    _classCallCheck(this, Email);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Email.prototype.handleChange = function handleChange(e) {
    var data = e.target.value;
    var constraints = {
      from: {
        email: true
      }
    };

    var valid = validate({ from: data }, constraints);
    var passed = false;

    if (valid === undefined) {
      passed = true;
    }

    if (passed) {
      store.dispatch({ type: EMAIL, payload: data });
    }
  };

  Email.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      React.createElement('input', {
        className: 'form-control',
        placeholder: 'Email Adress',
        type: 'email',
        onChange: this.handleChange.bind(this),
        value: store.getState().email ? store.getState().emailAdress : undefined

      })
    );
  };

  return Email;
}(React.Component);

var Name = function (_React$Component3) {
  _inherits(Name, _React$Component3);

  function Name() {
    _classCallCheck(this, Name);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  Name.prototype.handleChange = function handleChange(e) {
    var data = e.target.value;
    var capitalized = data.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    store.dispatch({ type: NAME, payload: capitalized });
  };

  Name.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      React.createElement('input', {
        className: 'form-control',
        placeholder: 'Name',
        type: 'text',
        onChange: this.handleChange.bind(this),
        value: store.getState().name
      })
    );
  };

  return Name;
}(React.Component);

var PassSignUp = function (_React$Component4) {
  _inherits(PassSignUp, _React$Component4);

  function PassSignUp() {
    _classCallCheck(this, PassSignUp);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  PassSignUp.prototype.enterPass = function enterPass(data) {
    store.dispatch({ type: PASSWORD, payload: data });
  };

  PassSignUp.prototype.checkPass = function checkPass(data) {
    store.dispatch({ type: RETYPE, payload: data });
    var constraints = {
      confirmPassword: {
        equality: "password"
      }
    };
    var validatePass = validate({ password: store.getState().password, confirmPassword: store.getState().retype }, constraints);

    if (validatePass === undefined) {
      console.log('simillar');
      store.dispatch({ type: VALIDATE_PASS });
    }
  };

  PassSignUp.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(Password, { enterPass: this.enterPass, label: this.props.label }),
      React.createElement(Password, { checkPass: this.checkPass, retype: true })
    );
  };

  return PassSignUp;
}(React.Component);

var SubmitButton = function (_React$Component5) {
  _inherits(SubmitButton, _React$Component5);

  function SubmitButton() {
    _classCallCheck(this, SubmitButton);

    return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
  }

  SubmitButton.prototype.handleClick = function handleClick() {
    var signUp = store.getState().signUp;
    var email = store.getState().email;
    var validName = store.getState().validName;
    var validPass = store.getState().validPass;
    var password = store.getState().password;
    if (signUp && email && validName && validPass) {
      store.dispatch({ type: SUBMIT });
    } else if (email) {
      store.dispatch({ type: SUBMIT_SIGN_IN });
    }
  };

  SubmitButton.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: store.getState().validPass ? 'btn-wrapper active' : 'btn-wrapper' },
      React.createElement(
        'button',
        {
          className: 'btn',
          type: 'submit',
          onClick: this.handleClick.bind(this)
        },
        this.props.text
      )
    );
  };

  return SubmitButton;
}(React.Component);

var SignUpForm = function SignUpForm() {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h2',
      null,
      'Get Started Now'
    ),
    React.createElement(Name, null),
    React.createElement(Email, null),
    React.createElement(PassSignUp, { label: false }),
    React.createElement(SubmitButton, { text: 'Sign Up' }),
    React.createElement(
      'p',
      null,
      'By clicking \'Sign Up\' I agree with the ',
      React.createElement('br', null),
      React.createElement(
        'a',
        { href: '#' },
        'Terms and Conditions'
      )
    )
  );
};

var SignUpSuccess = function (_React$Component6) {
  _inherits(SignUpSuccess, _React$Component6);

  function SignUpSuccess() {
    _classCallCheck(this, SignUpSuccess);

    return _possibleConstructorReturn(this, _React$Component6.apply(this, arguments));
  }

  SignUpSuccess.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'signUp-success' },
      React.createElement(
        'h1',
        null,
        'Thanks For Signing Up ',
        React.createElement('br', null),
        ' ',
        store.getState().name
      )
    );
  };

  return SignUpSuccess;
}(React.Component);

var SignInForm = function SignInForm() {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h2',
      null,
      'Sign In To Continue'
    ),
    React.createElement(Email, null),
    React.createElement(Password, null),
    React.createElement(
      'div',
      { className: 'checkbox' },
      React.createElement(
        'label',
        null,
        React.createElement('input', { type: 'checkbox' }),
        ' Remeber Password?'
      )
    ),
    React.createElement(SubmitButton, { text: 'Sign In' })
  );
};

var SignInSuccess = function SignInSuccess() {
  return React.createElement(
    'div',
    { className: 'signUp-success' },
    React.createElement(
      'h1',
      null,
      'Welcome Back'
    )
  );
};

var SignUp = function SignUp() {
  return React.createElement(
    'div',
    { className: 'signUp-page text-center' },
    store.getState().submit ? React.createElement(SignUpSuccess, null) : React.createElement(SignUpForm, null)
  );
};

var SignIn = function SignIn() {
  return React.createElement(
    'div',
    { className: 'signIn-page text-center' },
    store.getState().submitSignIn ? React.createElement(SignInSuccess, null) : React.createElement(SignInForm, null)
  );
};

var Modal = function (_React$Component7) {
  _inherits(Modal, _React$Component7);

  function Modal() {
    _classCallCheck(this, Modal);

    return _possibleConstructorReturn(this, _React$Component7.apply(this, arguments));
  }

  Modal.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'modal-element' },
      store.getState().submit || store.getState().submitSignIn ? React.createElement('div', null) : React.createElement(Select, null),
      React.createElement(
        'div',
        null,
        store.getState().signUp ? React.createElement(SignUp, null) : React.createElement(SignIn, null)
      )
    );
  };

  return Modal;
}(React.Component);

var App = function (_React$Component8) {
  _inherits(App, _React$Component8);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _React$Component8.apply(this, arguments));
  }

  App.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'container' },
      React.createElement(Modal, null)
    );
  };

  return App;
}(React.Component);

var _Redux = Redux;
var createStore = _Redux.createStore;

var store = createStore(reducer);

var render = function render() {
  ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
};

store.subscribe(render);
render();