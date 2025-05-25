const cities=[
  {n:"London",lat:51.5074,lon:-0.1278,i:"fa-cloud"},
  {n:"New York",lat:40.7128,lon:-74.006,i:"fa-cloud-sun"},
  {n:"Tokyo",lat:35.6895,lon:139.6917,i:"fa-sun"},
  {n:"Sydney",lat:-33.8688,lon:151.2093,i:"fa-cloud-sun-rain"},
  {n:"Paris",lat:48.8566,lon:2.3522,i:"fa-cloud-showers-heavy"},
  {n:"Moscow",lat:55.7558,lon:37.6173,i:"fa-snowflake"},
  {n:"Mumbai",lat:19.076,lon:72.8777,i:"fa-bolt"},
  {n:"Sao Paulo",lat:-23.5505,lon:-46.6333,i:"fa-cloud"},
  {n:"Beijing",lat:39.9042,lon:116.4074,i:"fa-smog"},
  {n:"Lagos",lat:6.5244,lon:3.3792,i:"fa-wind"},
  {n:"Dubai",lat:25.2048,lon:55.2708,i:"fa-fire-flame-curved"},
  {n:"Los Angeles",lat:34.0522,lon:-118.2437,i:"fa-cloud"},
  {n:"Berlin",lat:52.52,lon:13.405,i:"fa-cloud"},
  {n:"Singapore",lat:1.3521,lon:103.8198,i:"fa-cloud-sun"},
  {n:"Rome",lat:41.9028,lon:12.4964,i:"fa-cloud"},
  {n:"San Francisco",lat:37.7749,lon:-122.4194,i:"fa-cloud-fog"},
  {n:"Seoul",lat:35.9078,lon:127.7669,i:"fa-sun"},
  {n:"Barcelona",lat:41.3851,lon:2.1734,i:"fa-cloud-sun"},
  {n:"Bangkok",lat:13.7563,lon:100.5018,i:"fa-cloud-showers-heavy"},
  {n:"Istanbul",lat:41.0082,lon:28.9784,i:"fa-cloud-sun-rain"},
]
const api=(c)=>`https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current_weather=true`;
const wc2fa=(w)=>{
  if([0,1].includes(w))return"fa-sun";if([2].includes(w))return"fa-cloud-sun";if([3].includes(w))return"fa-cloud";if([45,48].includes(w))return"fa-smog";if([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(w))return"fa-cloud-showers-heavy";if([71,73,75,77,85,86].includes(w))return"fa-snowflake";if([95,96,99].includes(w))return"fa-bolt";return"fa-wind";
};
const wl=document.getElementById('weather-list');
const enterAnim=(el)=>{el.classList.add('fade-in')};
const update=async()=>{
  wl.innerHTML='';
  await Promise.all(cities.map(async c=>{
    let d;
    try{d=await fetch(api(c)).then(r=>r.json());}catch(_){return;}
    const w=d.current_weather;
    if(!w)return;
    const fa=wc2fa(w.weathercode)||c.i;
    const ct=document.createElement('section');
    ct.className='city fade-in';
    ct.innerHTML=`<div class='city-name'><i class='fa-solid city-icon ${fa}'></i>${c.n}</div><span class='city-temp'>${Math.round(w.temperature)}°C</span>`;
    wl.appendChild(ct);
    setTimeout(()=>{ct.classList.add('wiggle');setTimeout(()=>ct.classList.remove('wiggle'),700)},500);
  }))
};
update();
