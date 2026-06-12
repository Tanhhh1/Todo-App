import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { authApi } from "../../services/auth_api";
import { useAuth } from "../../hooks/use_auth";
import "./auth.css";

function LoginPage() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await authApi.login(data);
            if (response && response.data && response.data.token) {
                login(response.data.token);
            }
        } catch (err) {
            console.error(err);
            setError("root", {
                type: "server",
                message: err.response?.data?.message || "Tên đăng nhập hoặc mật khẩu không chính xác."
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>TodoApp System</h2>
                    <p>Manage your tasks with elegance and precision.</p>
                </div>

                {errors.root && (
                    <div className="error-message">
                        <i className="bx bx-error-circle" />
                        <span>{errors.root.message}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                    <div className="form-group">
                        <label>Tên tài khoản</label>
                        <div className="input-group">
                            <input
                                {...register("username", { required: "Vui lòng nhập tên đăng nhập" })}
                                type="text"
                                placeholder="Nhập tên đăng nhập..."
                                disabled={isLoading}
                            />
                        </div>
                        {errors.username && <span className="error-message" style={{ background: 'none', padding: '4px 0', margin: 0 }}>{errors.username.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <div className="input-group">
                            <input
                                {...register("password", { required: "Vui lòng nhập mật khẩu" })}
                                type="password"
                                placeholder="Nhập mật khẩu..."
                                disabled={isLoading}
                            />
                        </div>
                        {errors.password && <span className="error-message" style={{ background: 'none', padding: '4px 0', margin: 0 }}>{errors.password.message}</span>}
                    </div>

                    <button type="submit" className="auth-btn" disabled={isLoading}>
                        {isLoading ? <><i className="bx bx-loader-alt bx-spin" /> Đang xử lý...</> : "Đăng nhập"}
                    </button>
                </form>

                <div className="auth-footer">
                    Chưa có tài khoản?{" "}
                    <Link to="/register" className="auth-link">
                        Đăng ký ngay
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;