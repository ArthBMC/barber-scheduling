function Login() {
  return (
    <>
      <input
        type="text"
        placeholder="Username"
        className="border p-2 mb-4 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-4 w-full"
      />
      <button className="bg-blue-500 text-white p-2 rounded w-full">
        Login
      </button>
    </>
  );
}

export default Login;
