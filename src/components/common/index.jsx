var encryptor = require('simple-encryptor')("DEMO_LOGIN_YASAR");
export const encript = (o) => {
    return encryptor.encrypt(o);
};
export const decript = (o) => {
    o = encryptor.decrypt(o);
    return o;
};
export const clearCookies = () => { 
    var res = document.cookie;
    var multiple = res.split(";");
    for(var i = 0; i < multiple.length; i++) {
       var key = multiple[i].split("=");
       document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC;path=/";
    }
};
export const getCurrentDate = () => {
    return new Date().toISOString();
}
export const accessCookie = (cookieName) => {
        var name = cookieName + "=";
        var allCookieArray = document.cookie.split(';');
        for(var i=0; i<allCookieArray.length; i++)
        {
        var temp = allCookieArray[i].trim();
        if (temp.indexOf(name)==0)
        return decript(temp.substring(name.length,temp.length));
        }
        return "";
};
export const setCookies = data =>{
    let date = new Date();
    date.setTime(date.getTime()+(1*24*60*60*1000));
    let cookieValue = encript(data)
    document.cookie = "MEST" + "=" + cookieValue + "; expires=" + date.toGMTString() + ";path=/";
}