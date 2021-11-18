import { useState, useEffect } from 'react';
import { login } from '../../ApiService';

function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(()=> {
    login(code)
    // TODO: #22 remove cons log
    .then(res => console.log(res))
      // TODO: #21 remove dead code
      // .catch(() => {window.location = '/'})
  },[code])

}

export default useAuth;