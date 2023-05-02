import { PublicLayout } from "@layouts/PublicLayout";
import { LoginScreen } from "@screens/login";

const Login: IPageComponent = () => {
  return (
    <PublicLayout>
      <LoginScreen />
    </PublicLayout>
  );
};

export default Login;
