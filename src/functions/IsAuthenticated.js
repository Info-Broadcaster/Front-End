import Cookies from 'js-cookie';

function isAuthenticated() {
    const token = Cookies.get('token'); 
    return token !== undefined;
  }

export default isAuthenticated;