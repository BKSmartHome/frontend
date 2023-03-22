import { cx } from "@utils/tools";

import Dashboard from "./Dashboard";
import styles from "./styles.module.scss";

export const AppScreen: IComponent = () => {
  return (
    <main
      className={cx(
        "min-h-[80vh] dark:text-white my-20 mx-40 p-20 rounded-[40px]",
        styles.main
      )}
    >
      <Dashboard />
    </main>
  );
};
