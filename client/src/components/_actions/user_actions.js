import axios from 'axios';

import{
    LOGIN_USER,
    REGISTER_USER
} from './types'

export function loginUser(datatosubmit){
    const request =axios.post('/api/users/login', datatosubmit)
                    .then(response =>response.data)



    return{
        type: LOGIN_USER,
        payload: request
    }
  }

  export function registerUser(datatosubmit){
    const request =axios.post('/api/users/register', datatosubmit)
                    .then(response =>response.data)



    return{
        type: REGISTER_USER,
        payload: request
    }
  }