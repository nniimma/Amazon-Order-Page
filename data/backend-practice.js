// URL: Uniform Resource Locator
//! to send http requests we use XMLHttpRequest class which in built in
const xhr = new XMLHttpRequest();

// load here is the response that we are waiting for
xhr.addEventListener('load', () => {
    console.log(xhr.response); 
});
xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();
