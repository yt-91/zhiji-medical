import { TrendingUp, AlertTriangle } from 'lucide-react'
import { Card, NavBar, Page, RiskBadge, SectionTitle, SpineCurve } from '@/components/common'
import { reports, riskMeta } from '@/data/mock'

// 随访对比：最近两次并排
export default function ComparePage({ onBack, onGoAppointment }: { onBack: () => void; onGoAppointment: () => void }) {
  const list = reports.filter((r) => r.childId === 'c1').sort((a, b) => a.date.localeCompare(b.date))
  const prev = list[list.length - 2]
  const curr = list[list.length - 1]
  const delta = curr.cobb - prev.cobb
  const worsening = delta >= 5

  const rows = [
    { label: 'Cobb 角', a: `${prev.cobb}°`, b: `${curr.cobb}°`, diff: `${delta > 0 ? '+' : ''}${delta}°` },
    { label: '肩高差', a: `${prev.shoulderDiff} mm`, b: `${curr.shoulderDiff} mm`, diff: `+${curr.shoulderDiff - prev.shoulderDiff} mm` },
    { label: '骨盆倾斜', a: `${prev.pelvisTilt}°`, b: `${curr.pelvisTilt}°`, diff: `+${(curr.pelvisTilt - prev.pelvisTilt).toFixed(1)}°` },
    { label: '躯干旋转 ATR', a: `${prev.atr}°`, b: `${curr.atr}°`, diff: `+${curr.atr - prev.atr}°` },
    { label: '躯干偏移', a: `${prev.trunkShift} mm`, b: `${curr.trunkShift} mm`, diff: `+${curr.trunkShift - prev.trunkShift} mm` },
  ]

  return (
    <Page>
      <NavBar title="随访结果对比" onBack={onBack} />

      {/* 并排曲线 */}
      <Card>
        <SectionTitle>脊柱曲线对比</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          {[
            { r: prev, tag: '上次' },
            { r: curr, tag: '本次' },
          ].map(({ r, tag }) => (
            <div key={r.id} className="rounded-xl bg-[#F6F7F9] p-2">
              <div className="text-center text-[12px] text-gray-500">
                {tag} · {r.date}
              </div>
              <div className="mx-auto h-40 w-full max-w-32">
                <SpineCurve cobb={r.cobb} color={riskMeta[r.risk].color} />
              </div>
              <div className="flex justify-center pb-1">
                <RiskBadge risk={r.risk} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 指标对比表 */}
      <Card>
        <SectionTitle>关键指标变化</SectionTitle>
        <div className="overflow-hidden rounded-xl border border-gray-100">
          <div className="grid grid-cols-4 bg-[#F6F7F9] py-2 text-center text-[11px] text-gray-400">
            <span>指标</span>
            <span>{prev.date.slice(5)}</span>
            <span>{curr.date.slice(5)}</span>
            <span>变化</span>
          </div>
          {rows.map((row, i) => (
            <div key={row.label} className={`grid grid-cols-4 py-2.5 text-center text-[13px] ${i > 0 ? 'border-t border-gray-50' : ''}`}>
              <span className="text-gray-500">{row.label}</span>
              <span className="text-gray-800">{row.a}</span>
              <span className="font-medium text-gray-900">{row.b}</span>
              <span className={`font-semibold ${row.diff.startsWith('+') && row.diff !== '+0°' ? 'text-[#FA5151]' : 'text-gray-400'}`}>{row.diff}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 进展预警 */}
      <Card className={worsening ? 'border border-[#FA515133] bg-[#FFF7F7]' : 'border border-[#07C16033] bg-[#F4FBF7]'}>
        <div className="flex gap-2.5">
          {worsening ? <AlertTriangle size={18} color="#FA5151" className="mt-0.5 shrink-0" /> : <TrendingUp size={18} color="#07C160" className="mt-0.5 shrink-0" />}
          <div className="text-[12px] leading-5 text-gray-600">
            {worsening ? (
              <>
                <span className="font-medium text-[#FA5151]">进展预警：</span>
                近一年 Cobb 角累计增长 {curr.cobb - list[0].cobb}°，超过 5° 的进展参考值。建议尽快携报告至骨科门诊评估干预方案，不要仅等待下次常规复查。
              </>
            ) : (
              <>指标变化在参考范围内，请按计划继续随访观察。</>
            )}
          </div>
        </div>
      </Card>

      <button onClick={onGoAppointment} className="mx-3 mt-4 flex w-[calc(100%-24px)] items-center justify-center rounded-full bg-[#07C160] py-3 text-[14px] font-medium text-white">
        预约骨科门诊
      </button>
    </Page>
  )
}
