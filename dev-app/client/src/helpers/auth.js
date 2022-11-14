import cookie from "js-cookie";
//Set in Cookie and remove it and deal
// with localstorage
export const setCookie = (key, value) => {
    if (window !== 'undefined') {
        cookie.set(key, value, {
            //1 day expiration date
            expires: 1
        })
    }
}


//Remove from cookie
export const removeCookie = (key, value) => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        })
    }
}


//Get from cookie-- similar to token
export const getCookie = (key) => {
    if (window !== 'undefined') {
        return cookie.get(key)
    }
}


//set in local storage
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

//remove from local storage
export const removeLocalStorage = (key) => {
    if (window !== 'undefined') {
        localStorage.removeItem(key)
    }
}

//Auth user after login
export const authenticate = (res, next) => {
    setCookie('token', res.data.token)
    setLocalStorage('user', res.data.user)
    next()
}



//signout
export const signout = () => {
    removeCookie('token')
    removeLocalStorage('user')
    window.location.replace('/')
}


//get user info from localStorage
export const isAuth = () => {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('token')
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        }
    }
}



//update user data in localstorage
export const updateUser = (res, next) => {
    if (window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'))
        auth = res.data
        localStorage.setItem('user', JSON.stringify(auth))
    }
    next()
}