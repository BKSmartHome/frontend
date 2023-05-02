import { cx } from "@utils/tools";

import Dashboard from "./Dashboard";
import styles from "./styles.module.scss";

export const AppScreen: IComponent = () => {
  return (
    <main
      className={cx(
        "!bg-black min-h-screen flex flex-col dark:text-white my-20 mx-20 px-12 py-12 rounded-[40px]",
        styles.main
      )}
    >
      <Dashboard className="grow" />
    </main>
  );
};
