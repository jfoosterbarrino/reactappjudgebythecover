import React, {useEffect} from 'react';
import {getUser} from '../api/apiBasicAuth';
import {CancelToken} from 'apisauce';

export default function useLogin(loginCreds, setLoginCreds, setError, setUser){

    const login = async(cancelToken)=>{
        const response = await getUser(loginCreds.email, loginCreds.password, cancelToken)
        if(response.user?.token){
            console.log('logged in');
            setUser(response.user);
            setLoginCreds({})
            // navigate to homepage
        }
        setError(response.error);
    }

    useEffect(
        ()=>{
            const source = CancelToken.source()
            if(loginCreds.email && loginCreds.password)
                login(source.token)
                return ()=>{source.cancel()}
        },
        [loginCreds, setLoginCreds, setError, setUser]
    )
}