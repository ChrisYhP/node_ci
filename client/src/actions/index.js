import axios from '../util/fetch';
import { FETCH_USER, FETCH_BLOGS, FETCH_BLOG, LOGIN } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  if (res.data.state === 0) {
    dispatch({ type: FETCH_USER, payload: true });
  } else {
    dispatch({ type: FETCH_USER, payload: false });
  }
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitBlog = (values, history) => async dispatch => {
  const res = await axios.post('/api/blogs', values);

  history.push('/blogs');
  dispatch({ type: FETCH_BLOG, payload: res.data });
};

export const fetchBlogs = () => async dispatch => {
  const res = await axios.get('/api/blogs');

  dispatch({ type: FETCH_BLOGS, payload: res.data });
};

export const fetchBlog = id => async dispatch => {
  const res = await axios.get(`/api/blogs/${id}`);

  dispatch({ type: FETCH_BLOG, payload: res.data });
};

export const login = (params) => async dispatch => {
  const res = await axios.post(`/api/login`, params);
  if (res.data.state === 0) {
    alert('登录成功!')
    dispatch({type: LOGIN, payload: true});
  } else {
    alert(res.data.msg)
    dispatch({type: LOGIN, payload: false});    
  }
}

export const register = (params) => async dispatch => {
  const res = await axios.post(`/api/register`, params);
  return res;
}