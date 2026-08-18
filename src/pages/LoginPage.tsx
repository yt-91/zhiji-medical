import { ShieldCheck, Lock, FileCheck } from 'lucide-react'

export default function LoginPage({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="flex min-h-full flex-col bg-white px-8 pt-20">
      {/* Logo */}
      <div className="flex flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#07C160] shadow-lg shadow-green-200">
          <svg viewBox="0 0 48 48" className="h-11 w-11">
            <path d="M24 8 C 18 18, 30 28, 24 40" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
            <line x1="24" y1="8" x2="24" y2="40" stroke="#ffffff66" strokeWidth="2" strokeDasharray="3 4" />
          </svg>
        </div>
        <h1 className="mt-5 text-[22px] font-bold text-gray-900">脊护随行</h1>
        <p className="mt-1 text-[13px] text-gray-400">脊柱侧弯无辐射筛查 · 随访平台</p>
      </div>

      {/* 卖点 */}
      <div className="mt-12 space-y-4">
        {[
          { icon: ShieldCheck, text: '无辐射 AI 筛查报告随时查看' },
          { icon: FileCheck, text: '复查计划自动生成，到期微信提醒' },
          { icon: Lock, text: '医疗级数据加密，隐私全程保护' },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F8EF]">
              <Icon size={17} color="#07C160" />
            </div>
            <span className="text-[14px] text-gray-600">{text}</span>
          </div>
        ))}
      </div>

      {/* 登录按钮 */}
      <div className="mt-auto pb-10">
        <button
          onClick={onLogin}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#07C160] py-3.5 text-[16px] font-medium text-white active:bg-[#06AD56]"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
            <path d="M8.5 4C4.9 4 2 6.5 2 9.6c0 1.8 1 3.4 2.5 4.4l-.6 2 2.2-1.2c.7.2 1.5.4 2.4.4h.4A6 6 0 0 1 8.5 14c0-3.3 3-6 6.8-6h.5C15 5.4 12 4 8.5 4zm-2 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM15.6 9c-3.3 0-6 2.3-6 5s2.7 5 6 5c.6 0 1.2-.1 1.8-.3l1.9 1-.5-1.7A4.8 4.8 0 0 0 21.6 14c0-2.7-2.7-5-6-5zm-2 2.6a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zm4 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z" />
          </svg>
          微信一键登录
        </button>
        <p className="mt-3 text-center text-[11px] leading-5 text-gray-400">
          登录即代表同意
          <span className="text-[#576B95]">《用户协议》</span>、<span className="text-[#576B95]">《隐私政策》</span>及
          <span className="text-[#576B95]">《知情同意书》</span>
          <br />
          未成年人需由监护人代为签署知情同意
        </p>
      </div>
    </div>
  )
}
