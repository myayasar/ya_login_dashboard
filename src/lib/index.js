const factory = {
    hasClass : (elem, className) => {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
},
addClass : (elem, className)=>{
    if (!factory.hasClass(elem, className)) {
        elem.className += ' ' + className;
    }
},
removeClass:(elem, className) => {
    var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
    if (factory.hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
},
toggleClass:(elem, className) => {
    var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ' ) + ' ';
    if (factory.hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
            newClass = newClass.replace( ' ' + className + ' ' , ' ' );
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    } else {
        elem.className += ' ' + className;
    }
}
}
export default factory;