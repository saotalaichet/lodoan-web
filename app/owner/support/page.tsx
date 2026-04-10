'use client';

import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { ownerAuth } from '@/lib/ownerAuth';

export default function OwnerSupportPage() {
  const [lang, setLang] = useState('vi');
  const [topic, setTopic] = useState('billing');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { setLang(localStorage.getItem('owner_lang') || 'vi'); }, []);

  const topics = {
    billing: lang === 'vi' ? 'Thanh Toán' : 'Billing',
    commission: lang === 'vi' ? 'Hoa Hồng' : 'Commission',
    account: lang === 'vi' ? 'Tài Khoản' : 'Account',
    technical: lang === 'vi' ? 'Kỹ Thuật' : 'Technical',
    other: lang === 'vi' ? 'Khác' : 'Other',
  };

  const t = {
    title: lang === 'vi' ? 'Hỗ Trợ' : 'Support',
    desc: lang === 'vi' ? 'Gửi yêu cầu hỗ trợ cho đội ngũ Ovenly. Chúng tôi sẽ phản hồi trong vòng 24 giờ.' : 'Send a support request to the Ovenly team. We will respond within 24 hours.',
    topic: lang === 'vi' ? 'Chủ Đề' : 'Topic',
    subject: lang === 'vi' ? 'Tiêu Đề' : 'Subject',
    message: lang === 'vi' ? 'Tin Nhắn' : 'Message',
    send: lang === 'vi' ? 'Gửi Yêu Cầu' : 'Send Request',
    sending: lang === 'vi' ? 'Đang gửi...' : 'Sending...',
    sent: lang === 'vi' ? '✅ Yêu cầu đã được gửi! Chúng tôi sẽ liên hệ sớm.' : '✅ Request sent! We will contact you soon.',
    error: lang === 'vi' ? '❌ Không thể gửi. Vui lòng thử lại.' : '❌ Could not send. Please try again.',
    contactDirect: lang === 'vi' ? 'Hoặc liên hệ trực tiếp:' : 'Or contact us directly:',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    setLoading(true);
    setMsg('');
    try {
      await ownerAuth.submitSupport(topic, subject, message);
      setMsg(t.sent);
      setSubject('');
      setMessage('');
    } catch { setMsg(t.error); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="font-bold text-xl text-gray-900">{t.title}</h2>
        <p className="text-sm text-gray-500 mt-1">{t.desc}</p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.topic}</label>
            <select value={topic} onChange={e => setTopic(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/30">
              {Object.entries(topics).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.subject}</label>
            <input value={subject} onChange={e => setSubject(e.target.value)} required
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.message}</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5} required
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
          </div>
          {msg && <p className={`text-sm font-medium ${msg.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>{msg}</p>}
          <button type="submit" disabled={loading}
            className="bg-primary text-white font-bold px-6 py-2.5 rounded-lg text-sm hover:opacity-90 disabled:opacity-50 flex items-center gap-2">
            <Send className="w-4 h-4" />
            {loading ? t.sending : t.send}
          </button>
        </form>
      </div>

      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 text-sm text-gray-600 space-y-1">
        <p className="font-semibold text-gray-900">{t.contactDirect}</p>
        <p>📧 hello@ovenly.io</p>
        <p>🕐 {lang === 'vi' ? 'Phản hồi trong 24 giờ làm việc' : 'Response within 24 business hours'}</p>
      </div>
    </div>
  );
}