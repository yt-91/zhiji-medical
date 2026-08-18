import type { ReactNode } from 'react'
import { ChevronLeft } from 'lucide-react'
import { riskMeta, type RiskLevel } from '@/data/mock'

// 顶部导航栏（子页面用）
export function NavBar({ title, onBack, right }: { title: string; onBack?: () => void; right?: ReactNode }) {
  return (
    <div className="sticky top-0 z-20 flex h-12 items-center justify-center bg-white/95 backdrop-blur border-b border-gray-100">
      {onBack && (
        <button onClick={onBack} className="absolute left-2 flex h-8 w-8 items-center justify-center text-gray-700">
          <ChevronLeft size={22} />
        </button>
      )}
      <span className="text-[16px] font-medium text-gray-900">{title}</span>
      {right && <div className="absolute right-3">{right}</div>}
    </div>
  )
}

// 风险等级徽标
export function RiskBadge({ risk, size = 'sm' }: { risk: RiskLevel; size?: 'sm' | 'lg' }) {
  const m = riskMeta[risk]
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${size === 'lg' ? 'px-3 py-1 text-[14px]' : 'px-2 py-0.5 text-[12px]'}`}
      style={{ color: m.color, backgroundColor: m.bg }}
    >
      <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: m.color }} />
      {m.label}
    </span>
  )
}

// 脊柱曲线示意图（SVG）
export function SpineCurve({ cobb, color }: { cobb: number; color: string }) {
  // 根据 Cobb 角生成一条 S/C 形曲线
  const bend = Math.min(cobb * 1.6, 40)
  const d = `M 100 15 C ${100 - bend} 70, ${100 + bend} 130, 100 185`
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      {/* 正常参考线 */}
      <line x1="100" y1="15" x2="100" y2="185" stroke="#D8D8D8" strokeWidth="2" strokeDasharray="5 5" />
      {/* 脊柱拟合曲线 */}
      <path d={d} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
      {/* 端椎标记 */}
      <circle cx="100" cy="15" r="4" fill={color} />
      <circle cx="100" cy="185" r="4" fill={color} />
      {/* Cobb 角示意 */}
      <text x="112" y="100" fontSize="13" fill={color} fontWeight="600">
        Cobb ≈ {cobb}°
      </text>
      <text x="100" y="198" fontSize="9" fill="#999" textAnchor="middle">
        示意图 · 非医学影像
      </text>
    </svg>
  )
}

// 页面容器
export function Page({ children }: { children: ReactNode }) {
  return <div className="min-h-full bg-[#F6F7F9] pb-4">{children}</div>
}

// 卡片
export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-3 mt-3 rounded-2xl bg-white p-4 shadow-sm ${className}`}>{children}</div>
}

// 区块标题
export function SectionTitle({ children, extra }: { children: ReactNode; extra?: ReactNode }) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <span className="text-[15px] font-semibold text-gray-900">{children}</span>
      {extra}
    </div>
  )
}
