document.addEventListener("DOMContentLoaded",function(e){document.querySelectorAll('a[href^="#"].scrollable').forEach(e=>{e.addEventListener("click",function(e){e.preventDefault(),document.querySelector(this.getAttribute("href")).scrollIntoView({behavior:"smooth",block:"center"})})})});