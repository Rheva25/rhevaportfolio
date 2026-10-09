async function test() {
  const url = "https://s0.wp.com/mshots/v1/https://rheva-fe.vercel.app?w=1200";
  const res = await fetch(url);
  console.log(res.status, res.headers.get("content-type"));
}
test();
