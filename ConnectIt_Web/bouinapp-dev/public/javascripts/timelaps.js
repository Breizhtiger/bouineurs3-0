var day = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
var fullDomain = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');

// $.ajax({
//     url:'http://54.93.53.233:3000/static/daily/1102/videos/video.mp4',
//     type:'HEAD',
//     crossDomain: true,
//     error: function()
//     {
//     	console.log("KO");
//         //file not exists
//     },
//     success: function()
//     {
//     	console.log("OK");
//         //file exists
//     }
// });