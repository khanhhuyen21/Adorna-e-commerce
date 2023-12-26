import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//callback từ Google thành công,  được gọi thông qua đường dẫn (/google/:token/:userId/:status/:fullName) và lưu token vào localStorage
const GoogleSuccess = () => {
  const navigate = useNavigate();
  const { token, userId, status, fullName } = useParams();
  const user = {
    id: userId,
    status: status,
    fullName: fullName,
  };

  useEffect(() => {
    if (token && userId && status) {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("username", JSON.stringify(user));
      navigate("/");
    }
  }, [token, userId, status, fullName, navigate]);

  if (!token || !userId || !status) {
    return (
      <div>
        <h3>Yêu cầu bạn hãy đăng nhập</h3>
      </div>
    );
  }

  return <div></div>;
};

export default GoogleSuccess;
