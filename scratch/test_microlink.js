async function test() {
  const url = "https://api.microlink.io?url=https://rheva-fe.vercel.app";
  const res = await fetch(url);
  const json = await res.json();
  console.log(JSON.stringify(json, null, 2));
}
test();
