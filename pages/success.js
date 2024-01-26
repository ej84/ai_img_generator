import { useEffect } from "react";

const SuccessPage = () => {
  useEffect(() => {
    const verifySession = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get("session_id");

      if (sessionId) {
        // verify-checkout-session API 호출
        const response = await fetch("/api/complete_stripe_checkout/route", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        });
        const result = await response.json();

        // 추가적인 처리 (예: 사용자 UI 업데이트)
      }
    };

    verifySession();
  }, []);

  return <div>결제가 완료되었습니다!</div>;
};

export default SuccessPage;
