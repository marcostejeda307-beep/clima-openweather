(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(e){if(e.ep)return;e.ep=!0;const n=s(e);fetch(e.href,n)}})();const d="1a88e90a36c74a9d1f919266d787facc",l=document.getElementById("searchBtn"),c=document.getElementById("cityInput"),u=document.getElementById("weatherContainer");async function a(t){if(!t)return;const r=`https://api.openweathermap.org/data/2.5/weather?q=${t}&appid=${d}&units=metric&lang=es`;try{const s=await fetch(r);if(!s.ok)throw new Error("Ciudad no encontrada");const o=await s.json();m(o),c.value=""}catch(s){alert(s.message)}}function m(t){const r=document.createElement("div");r.className="col-md-4 mb-4",r.innerHTML=`
        <div class="weather-card mx-auto">
            <button class="close-btn" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times-circle"></i>
            </button>
            <h3 class="text-neon">${t.name}, ${t.sys.country}</h3>
            <p class="text-uppercase mb-0">${t.weather[0].description}</p>
            <img src="https://openweathermap.org/img/wn/${t.weather[0].icon}@4x.png" alt="icon" class="img-fluid">
            <div class="temp-main">${Math.round(t.main.temp)}°C</div>
            <div class="mt-3">
                <span>💧 Humedad: ${t.main.humidity}%</span><br>
                <span>💨 Viento: ${t.wind.speed} m/s</span>
            </div>
        </div>
    `,u.prepend(r)}l.addEventListener("click",()=>a(c.value));c.addEventListener("keypress",t=>{t.key==="Enter"&&a(c.value)});
