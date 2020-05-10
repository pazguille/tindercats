const self = this;
const logger = (...params) => console.log('FROM WORKER', ...params);

self.addEventListener('message', (e) => {
  if (e.data.topic === 'meow') {
    fetchCats(e.data.value);
  }
});

function fetchCats(n) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    const res = JSON.parse(xhr.response);
    const data = res.map((pic) => ({ id: pic.id, url: pic.url }));
    self.postMessage(JSON.stringify(data));
  });
  xhr.open('GET', 'https://api.thecatapi.com/v1/images/search?limit='+n+'&size=small');
  // Ups, maldito gh-pages por ser tán estático
  xhr.setRequestHeader('x-api-key', '3fe716a0-1161-4025-a571-9312b7e89f3b');
  xhr.send();
}