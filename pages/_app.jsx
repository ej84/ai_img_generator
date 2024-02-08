// pages/_app.js
import "@/app/firebase/initFirebase";
import "@/app/globals.css"; // 경로는 실제 CSS 파일의 위치에 따라 달라질 수 있습니다.

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
