import { LoadingSVG } from "@components/SVGIcons/LoadingSVG";
import { PrivateLayout as PrivateLayoutStatic } from "@layouts/PrivateLayout";
import { AppScreen } from "@screens/app";
import dynamic from "next/dynamic";

const PrivateLayout = dynamic<React.ComponentProps<typeof PrivateLayoutStatic>>(
  () => import("@layouts/PrivateLayout").then((mod) => mod.PrivateLayout),
  {
    ssr: false,
    loading: () => (
      <div className="xyz-in w-screen h-screen flex justify-center items-center gap-3">
        <LoadingSVG width={32} height={32} />
        <span className="animate-pulse">Loading, please wait...</span>
      </div>
    ),
  }
);

const Home: IPageComponent = () => {
  return (
    <PrivateLayout>
      <AppScreen />
    </PrivateLayout>
  );
};

export default Home;
