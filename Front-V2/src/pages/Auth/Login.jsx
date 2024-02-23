import { useState } from "react";

const Login = () => {
  const [USER_NAME, setUSER_NAME] = useState("");
  const [PASSWORD, setPASSWORD] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can add your login logic here
  };

  return (
    <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
      <form onSubmit={handleSubmit}>
        <div className="my-5 pt-16 md:pt-0 md:mt-20">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            Nombre Usuario:
          </label>
          <input
            type="text"
            placeholder="Tu Nombre de Usuario"
            className="border w-full p-3 rounded-xl mt-3 bg-gray-100"
            value={USER_NAME}
            onChange={(e) => setUSER_NAME(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            Contraseña:
          </label>
          <input
            type="password"
            placeholder="Tu Contraseña"
            className="border w-full p-3 rounded-xl mt-3 bg-gray-100"
            value={PASSWORD}
            onChange={(e) => setPASSWORD(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-teal-600 w-full py-3 px-10 rounded-xl mt-6 text-white uppercase font-bold hover:cursor-pointer hover:bg-teal-700 md:w-auto"
        />
      </form>
    </div>
  );
};

export default Login;
