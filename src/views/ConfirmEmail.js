import React from "react";
import styles from "../styles/signup.module.css";
import Svg from "../components/SvgMap";
import translate from "../languages/translate";
import LanguageButtons from "../components/LanguageButtons";
const Confirm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.side}>
        <div className={styles.text_wrap}>
          <h1>Barefoot Nomad</h1>
          <p>{translate("bn-value")}</p>
        </div>
      </div>
      <Svg />
      <div className={styles.forms}>
        <LanguageButtons />
        <div className={styles.text_wrap}>
          <p className={styles.fs_confirm} style={{ marginTop: "360px" }}>
            {translate("confirm-email")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
