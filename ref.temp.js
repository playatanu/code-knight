const headers = { token: "token" };
const data = { username: "atanu", age: 20 };

const GET = await axios.get(url);
const POST = await axios.post(url, data);
const PATCH = await axios.patch(url, data, { headers });
const DELETE = await axios.delete(url, { headers, data });
