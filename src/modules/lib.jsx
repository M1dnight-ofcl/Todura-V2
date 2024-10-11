export const generateId=(length=10)=>{
    let result='';
    const characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter=0;
    while (counter<length) {
        result+=characters.charAt(Math.floor(Math.random() * charactersLength));
        counter+=1;
    }
    return btoa(result);
}
export const timeout=(ms)=>{
    return new Promise(resolve => setTimeout(resolve, ms));
}
export function getQueryParams(qs) {
    qs = qs.split('+').join(' ');
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
}
export const queryParams=getQueryParams(window.location.search);
export const $with=(value)=>{
    return new Promise((resolve,reject)=>{resolve(value)});
}