import { LoadableButton } from "@components/LoadableButton";
import { ROUTER } from "@configs/router";
import { btn } from "@configs/styles";
import Button from "@material-tailwind/react/components/Button";
import Input from "@material-tailwind/react/components/Input";
import { useAccountStore } from "@states/account";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type TLoginForm = {
  username: string;
  password: string;
};

export const LoginScreen: IComponent = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<TLoginForm>();
  const { handleLogin, loading } = useAccountStore();

  const handleForgotPass = () => router.push(ROUTER.forget.url);
  const handlePressLogin = handleSubmit((data) => {
    handleLogin(data.username, data.password, router);
  });

  return (
    <main className="mt-48 flex w-full h-full justify-center items-center flex-col gap-2 pb-40">
      <h1 className="text-2xl font-bold text-gray-800">Welcome back!</h1>
      <span className="text-gray-500 font-bold">
        Log in to access your dashboard.
      </span>
      <form
        onSubmit={handlePressLogin}
        className="flex flex-col gap-3 my-4 py-6 border-t border-b border-gray-300"
      >
        <Input
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          type="text"
          label="Username"
          className="w-72"
          containerProps={{ className: "bg-white rounded" }}
          {...register("username", { required: true })}
        />
        <Input
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          type="password"
          autoComplete="password"
          label="Password"
          className="w-72"
          containerProps={{ className: "bg-white rounded" }}
          {...register("password", { required: true })}
        />
        <button type="submit" hidden />
      </form>
      <span className="text-sm">
        Dont have an account?{" "}
        <Link href={ROUTER.signup.url}>
          <span className="text-indigo-500 font-bold">Sign up</span>
        </Link>
      </span>
      <div className="flex gap-2 mt-2">
        <LoadableButton
          loading={loading}
          onClick={handlePressLogin}
          color="indigo"
          size="sm"
          className={btn}
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
        >
          Log in
        </LoadableButton>
        <Button
          disabled={loading}
          onClick={handleForgotPass}
          color="gray"
          size="sm"
          className={btn}
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
        >
          Forgot password?
        </Button>
      </div>
    </main>
  );
};
