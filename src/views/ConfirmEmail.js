import React from "react";
import styles from "../styles/signup.module.css";
import Svg from "../components/SvgMap";
const Confirm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.side}>
        <div className={styles.text_wrap}>
          <h1>Barefoot Nomad</h1>
          <p>Making company travel and accommodation easy and convenient.</p>
        </div>
      </div>
      <Svg />
      <div className={styles.forms}>
        <div className={styles.text_wrap}>
          <p className={styles.fs_confirm} style={{ marginTop: "360px" }}>
            An email has been sent to you, use it to verify your account and
            start enjoying Barefoot Nomad services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
