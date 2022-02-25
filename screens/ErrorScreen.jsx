import styles from "../styles/ErrorScreen.module.css";

import Head from "next/head";

const imageUrl =
  "https://digitalagencynetwork.com/wp-content/uploads/2019/08/best-digital-agency-404-pages-for-your-inspiration.jpg";

const ErrorScreen = () => {
  return (
    <>
      <Head>
        <title>404 | Not Found!</title>
      </Head>
      <div>
        <img className={styles.image} src={imageUrl} />
      </div>
    </>
  );
};

export default ErrorScreen;
