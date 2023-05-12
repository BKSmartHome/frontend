import { cx } from "@utils/tools";

import styles from "./styles.module.scss";

const SwitchButton: IComponent<{
  status: string;
  onToggle: () => void;
}> = ({ onToggle, status }) => {
  return (
    <div
      className={`${styles.toggleThemeWrapper} active:scale-75 ease-in-out duration-500 p-2 cursor-pointer z-30`}
    >
      <label className={styles.toggleTheme} htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          onClick={() => onToggle()}
          defaultChecked={status === "ON"}
        />
        <div
          className={`${
            status === "ON" ? cx(styles.active, "!bg-[#8796A5]") : ""
          } ${styles.slider} `}
        ></div>
      </label>
    </div>
  );
};

export default SwitchButton;
