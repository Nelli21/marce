import React, {Component} from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            log: '',
            password: '',
            success: false,
        }
    }

    onChangeLogin = (ev) => {
        this.setState({
            log: ev.target.value,
        })
    }
    onChangePassword = (ev) => {
        this.setState({
            password: ev.target.value,
        })
    }
    onLogin = () => {
        const {log, password} = this.state;

        const login = /^\w+@\w+\.[a-z]{2,5}$/g;
        const pass = /^\w{8,16}/g;

        if(login.test(log) && pass.test(password)){
            this.setState({
                success: true,
                log: '',
                password: '',
            })
        }else{
            alert('Invalid Login or Password')
        }

    }

    onCloseModal = () => {
        this.setState({
            success: false,
        })
    }

    render() {
        const {log,success, password} = this.state;
        return (
            <div>
                <form id='form-login' action="#" method='GET'>
                    <input onChange={this.onChangeLogin} value={log} type="email" placeholder='Email'/>
                    <input onChange={this.onChangePassword} value={password} type="password" placeholder='Password'/>
                    <button onClick={this.onLogin}>Login</button>

                </form>
                {
                    success ? <div className="modal-login">
                        <div className="login">Login is successful</div>
                        <button onClick={this.onCloseModal}>Ok</button>
                    </div>:null
                }


            </div>
        );
    }
}

export default Login;
