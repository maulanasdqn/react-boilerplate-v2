import { PublicRoutes } from "@middleware/ProtectedRoutes";
import { FC, ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useLogin from "@hooks/Auth/useLogin";

type Inputs = {
  username: string;
  password: string;
};

const Index: FC = (): ReactElement => {
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { mutate } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data, {
      onError: (err) => {
        setErrorMsg(err as string);
      },

      onSuccess: () => {
        location.reload();
      },
    });
  };

  return (
    <PublicRoutes>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center h-full justify-center overflow-hidden w-full"
      >
        <div className="flex items-center justify-center min-h-screen bg-gray-100 rounded-xl">
          <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
            <span className="text-red-500">{errorMsg}</span>
            <div className="flex flex-col gap-y-4">
              <input
                {...register("username")}
                type="text"
                name="username"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Username"
                required
              />
              <input
                {...register("password")}
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Password"
                required
              />
              <button
                type="submit"
                className="w-full border-2 border-blue-400 text-blue-400 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Masuk
              </button>
            </div>
          </div>
        </div>
      </form>
    </PublicRoutes>
  );
};

export default Index;
