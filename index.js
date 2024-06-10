// This endpoint will return a simple response with 'Cache-Control: no-store' in the header.
const cacheControlEndpoint = 'https://no-store-worker.andrew-stegmaier.workers.dev';
// This endpoint will return a response without a Cache-Control header.
const noCacheControlEndpoint = 'https://no-store-worker.andrew-stegmaier.workers.dev/no-cache-control';

// 1. Fetch with basic response (no leak)
document.getElementById("1-fetch-basic").onclick = async () => {
  const result = await fetch(noCacheControlEndpoint);
  console.log('got this response', result.status);
};

// 2. Fetch with no-store header in response (LEAK)
document.getElementById("2-fetch-no-store").onclick = async () => {
  const result = await fetch(cacheControlEndpoint);
  console.log('got this response', result.status);
};

// 3. Fetch with no-store header in response and read body (no leak)
document.getElementById("3-fetch-no-store-and-read-body").onclick = async () => {
  const result = await fetch(cacheControlEndpoint);
  const resultText = await result.text()
  console.log('got this response', resultText);
};

// 4. Fetch with no-store header in response but use AbortController (no leak)
document.getElementById("4-fetch-no-store-with-abort").onclick = async () => {
  const abortController = new AbortController();
  const result = await fetch(cacheControlEndpoint, {signal: abortController.signal});
  abortController.abort();
  console.log('got this response', result.status);
};

// 5. Fetch with no-store header in response but use AbortController, and try to read response after (no leak)
document.getElementById("5-fetch-no-store-with-abort-and-read").onclick = async () => {
  const abortController = new AbortController();
  const result = await fetch(cacheControlEndpoint, {signal: abortController.signal});
  abortController.abort();
  const resultText = await result.text()
  console.log('got this response', resultText);
};

