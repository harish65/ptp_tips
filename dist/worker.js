console.log("Service Worker Loaded...");
const CACHE_NAME = "version-0.0.2";
const urlsToCache = ["index.html", "offline.html"];


// Install SW
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests
this.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

// Activate the SW
this.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

this.addEventListener("push", e => {
  const data = e.data.json();
  //console.log("Push Received...", data);
  e.waitUntil(
    this.registration.showNotification(data.title, {
      body: `Hey ${data.name},\n ${data.venue} ${data.race} is about to begin.`,
      icon: './favicon.png',
      vibrate: [200, 100, 200, 100, 200, 100, 200],
      tag:  "push-notification-tag",
      data: data.link,
    })
  )
});

this.addEventListener('notificationclick', function(event) {
  //console.log(event)
  let link = event.notification.data
  event.notification.close();
  // clients.openWindow(link);
});





//let cacheData = "appV1";
//// The Following event listener is for caching data for PWA
//this.addEventListener("install", (event) => {
//    event.waitUntil(
//        caches.open(cacheData).then((cache) => {
//            cache.addAll([
//                '/static/js/main.chunk.js',
//                '/static/js/0.chunk.js',
//                '/static/js/bundle.js',
//                '/static/css/main.chunk.css',
//                '/bootstrap.min.css',
//                '/index.html',
//                '/',
//                "/users"
//            ])
//        })
//    )
//})

//this.addEventListener("fetch", (event) => {
  // console.warn("url",event.request.url)
  //if (!navigator.onLine) {
  //    if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
  //        event.waitUntil(
  //            this.registration.showNotification("Internet", {
  //                body: "internet not working",
  //            })
  //        )
  //    }
  //    event.respondWith( //offline mode files
  //        caches.match(event.request).then((resp) => {
  //            if (resp) {
  //                return resp
  //            }
  //            let requestUrl = event.request.clone();
  //            fetch(requestUrl)
  //        })
  //    )
  //}
//}) 

