import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

class Header extends Component {
  state = {
    inputShow: false,
    name: '',
    password: '',
    isLogin: false,
    isRegister: false
  }
  onLogin = () => {
    this.setState({
      inputShow: true,
      isLogin: true,
      isRegister:false
    })
  }
  onRegister = () => {
    this.setState({
      inputShow: true,
      isRegister:true,
      isLogin: false
    })
  }
  onConfirm = () => {
    if (this.state.isLogin) {
      this.props.login({ name: this.state.name, password: this.state.password })
    } else {
      this.props.register({ name: this.state.name, password: this.state.password });
    }
  }
  onAccountChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {
              this.state.inputShow ? (
                <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <div><input placeholder="account" onChange={(e) => this.onAccountChange(e)}/></div>
                  <div><input placeholder="password" type="password" onChange={(e) => this.onPasswordChange(e)}/></div>
                  <a onClick={() => this.onConfirm()}>确定</a>
                </div>
              ) : (
                <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <p onClick={() => this.onLogin()}>登录</p>
                  /
                  <p onClick={() => this.onRegister()}>注册</p>
                </div> 
              )
            }
          </li>
        );
      default:
        return [
          <li key="3" style={{ margin: '0 10px' }}>
            <Link to="/blogs">My Blogs</Link>
          </li>,
          <li key="2">
            <a href={'/auth/logout'}>Logout</a>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav className="indigo">
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/blogs' : '/'}
            className="left brand-logo"
            style={{ marginLeft: '10px' }}
          >
            Blogster
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(Header);
