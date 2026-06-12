import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../services/auth_api';
import './auth.css';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không trùng khớp.');
            return;
        }

        setSubmitting(true);

        try {
            await authApi.register({ username, email, password });
            alert('Đăng ký tài khoản thành công!');
            navigate('/login');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Đăng ký thất bại. Tên tài khoản hoặc Email có thể đã tồn tại.');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Đăng ký tài khoản</h2>
                    <p>Điền đầy đủ thông tin để tham gia hệ thống</p>
                </div>

                {error && (
                    <div className="error-message">
                        <i className='bx bx-error-circle'></i>
                        <span>{error}</span>
                    </div>
                )}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Tên tài khoản</label>
                        <div className="input-group">
                            <input id="username" type="text" placeholder="Nhập username mong muốn..."
                                value={username} onChange={(e) => setUsername(e.target.value)} required disabled={submitting}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Địa chỉ Email</label>
                        <div className="input-group">
                            <input id="email" type="email" placeholder="example@gmail.com" value={email}
                                onChange={(e) => setEmail(e.target.value)} required disabled={submitting} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <div className="input-group">
                            <input id="password" type="password" placeholder="Tối thiểu 6 ký tự..." value={password}
                                onChange={(e) => setPassword(e.target.value)} required disabled={submitting} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                        <div className="input-group">
                            <input id="confirmPassword" type="password" placeholder="Nhập lại mật khẩu..." value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} required disabled={submitting}/>
                        </div>
                    </div>

                    <button type="submit" className="auth-btn" disabled={submitting}>
                        {submitting ? 'Đang xử lý...' : 'Đăng ký'}
                    </button>
                </form>

                <div className="auth-footer">
                    Đã có tài khoản?{' '}
                    <Link to="/login" className="auth-link">
                        Đăng nhập ngay
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;