'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock } from 'lucide-react';
import { useMarketplaceLang } from '@/lib/useMarketplaceLang';
import { customerAuth } from '@/lib/customerAuth';

function ResetPasswordInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { lang } = useMarketplaceLang();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setMsg(lang === 'vi' ? 'Mật khẩu phải có ít nhất 8 ký tự' : 'Password must be at least 8 characters');
      return;
    }
    if (password !== confirm) {
      setMsg(lang === 'vi' ? 'Mật khẩu xác nhận không khớp' : 'Passwords do not match');
      return;
    }
    if (!token) {
      setMsg(lang === 'vi' ? 'Liên kết không hợp lệ.' : 'Invalid link.');
      return;
    }
    setLoading(true);
    setMsg('');
    try {
      await customerAuth.resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => router.push('/login'), 3000);
    } catch (err: any) {
      const code = err?.message || '';
      if (code === 'invalid_token') {
        setMsg(lang === 'vi'
          ? 'Liên kết không hợp lệ hoặc đã được sử dụng.'
          : 'Invalid or already-used reset link.');
      } else if (code === 'token_expired') {
        setMsg(lang === 'vi'
          ? 'Liên kết đã hết hạn. Vui lòng yêu cầu đặt lại mật khẩu mới.'
          : 'Link expired. Please request a new password reset.');
      } else if (code === 'password_too_short') {
        setMsg(lang === 'vi'
          ? 'Mật khẩu phải có ít nhất 8 ký tự.'
          : 'Password must be at least 8 characters.');
      } else if (code === 'account_disabled') {
        setMsg(lang === 'vi'
          ? 'Tài khoản đã bị vô hiệu hóa.'
          : 'Account has been disabled.');
      } else {
        setMsg(lang === 'vi'
          ? 'Có lỗi xảy ra. Vui lòng thử lại.'
          : 'An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!token) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow p-8 text-center max-w-sm w-full">
        <p className="text-red-600 font-semibold mb-4">
          {lang === 'vi' ? 'Liên kết không hợp lệ.' : 'Invalid link.'}
        </p>
        <Link href="/login" className="text-primary font-semibold hover:underline text-sm">
          {lang === 'vi' ? 'Quay lại đăng nhập' : 'Back to login'}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <Link href="/" className="font-heading font-black text-primary text-xl block mb-6">LÒ ĐỒ ĂN</Link>
        <h1 className="font-heading text-2xl font-bold text-gray-900 mb-2">
          {lang === 'vi' ? 'Đặt lại mật khẩu' : 'Reset Password'}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          {lang === 'vi' ? 'Nhập mật khẩu mới của bạn bên dưới.' : 'Enter your new password below.'}
        </p>

        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-green-700 font-semibold mb-1">
              {lang === 'vi' ? '✅ Mật khẩu đã được cập nhật!' : '✅ Password updated!'}
            </p>
            <p className="text-sm text-green-600">
              {lang === 'vi' ? 'Đang chuyển đến trang đăng nhập...' : 'Redirecting to login...'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                {lang === 'vi' ? 'Mật khẩu mới' : 'New Password'} *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input required type="password" value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                {lang === 'vi' ? 'Xác nhận mật khẩu' : 'Confirm Password'} *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input required type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
            </div>
            {msg && <p className="text-sm text-red-600 font-medium">{msg}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-primary hover:opacity-90 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-sm transition-colors">
              {loading
                ? (lang === 'vi' ? 'Đang cập nhật...' : 'Updating...')
                : (lang === 'vi' ? 'Cập nhật mật khẩu' : 'Update Password')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    }>
      <ResetPasswordInner />
    </Suspense>
  );
}