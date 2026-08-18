import { Download, Share2, AlertTriangle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { Card, NavBar, Page, RiskBadge, SectionTitle, SpineCurve } from '@/components/common'
import { children, disclaimer, reports, riskMeta } from '@/data/mock'

export default function ReportDetailPage({ reportId, onBack }: { reportId: string; onBack: () => void }) {
  const report = reports.find((r) => r.id === reportId)!
  const child = children.find((c) => c.id === report.childId)!
  const risk = riskMeta[report.risk]
  const trend = reports
    .filter((r) => r.childId === report.childId)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((r) => ({ date: r.date.slice(2, 7).replace('-', '/'), cobb: r.cobb }))

  const metrics = [
    { label: '肩高差', value: `${report.shoulderDiff} mm`, hint: '双肩水平差' },
    { label: '骨盆倾斜', value: `${report.pelvisTilt}°`, hint: '骨盆水平倾角' },
    { label: '躯干旋转 ATR', value: `${report.atr}°`, hint: '前屈位旋转角' },
    { label: 'AI 置信度', value: `${Math.round(report.confidence * 100)}%`, hint: '结果可信程度' },
  ]

  return (
    <Page>
      <NavBar title="筛查报告" onBack={onBack} />

      {/* 头部摘要 */}
      <Card className="!p-0 overflow-hidden">
        <div className="p-4" style={{ background: `linear-gradient(135deg, ${risk.bg}, #ffffff 85%)` }}>
          <div className="flex items-center justify-between text-[12px] text-gray-500">
            <span>{report.date}</span>
            <span>{report.source}</span>
          </div>
          <div className="mt-1 text-[15px] font-medium text-gray-900">
            {child.name} · {child.gender} · {child.age} 岁
          </div>
          <div className="mt-4 flex items-center gap-6">
            <div className="h-36 w-28 shrink-0 rounded-xl bg-white p-1 shadow-sm">
              <SpineCurve cobb={report.cobb} color={risk.color} />
            </div>
            <div className="flex-1">
              <RiskBadge risk={report.risk} size="lg" />
              <div className="mt-2 text-[36px] font-bold leading-none" style={{ color: risk.color }}>
                {report.cobb}°
              </div>
              <div className="mt-1 text-[12px] text-gray-400">Cobb 角估算值（±5°）</div>
              <div className="mt-2 text-[13px] text-gray-600">{report.type}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* 姿态指标 */}
      <Card>
        <SectionTitle>姿态分析指标</SectionTitle>
        <div className="grid grid-cols-2 gap-2.5">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-xl bg-[#F6F7F9] p-3">
              <div className="text-[12px] text-gray-400">{m.label}</div>
              <div className="mt-0.5 text-[18px] font-bold text-gray-900">{m.value}</div>
              <div className="text-[10px] text-gray-300">{m.hint}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* 趋势图 */}
      <Card>
        <SectionTitle>Cobb 角变化趋势</SectionTitle>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend} margin={{ top: 8, right: 12, bottom: 0, left: -18 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} domain={[0, 30]} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #eee' }} formatter={(v) => [`${v}°`, 'Cobb 角']} />
              <ReferenceLine y={20} stroke="#FA5151" strokeDasharray="4 4" label={{ value: '转诊参考线 20°', fontSize: 10, fill: '#FA5151', position: 'insideTopRight' }} />
              <Line type="monotone" dataKey="cobb" stroke={risk.color} strokeWidth={2.5} dot={{ r: 4, fill: risk.color }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-1 text-[11px] text-gray-400">* 20° 为临床建议进一步检查的常用参考阈值</p>
      </Card>

      {/* 医生建议 */}
      {report.doctorNote && (
        <Card>
          <SectionTitle>医生建议</SectionTitle>
          <p className="rounded-xl bg-[#F6F7F9] p-3 text-[13px] leading-6 text-gray-700">{report.doctorNote}</p>
        </Card>
      )}

      {/* 低置信度 / 转诊警示 */}
      {report.risk === 'referral' && (
        <Card className="border border-[#FA515133] bg-[#FFF7F7]">
          <div className="flex gap-2.5">
            <AlertTriangle size={18} color="#FA5151" className="mt-0.5 shrink-0" />
            <div className="text-[12px] leading-5 text-gray-600">
              <span className="font-medium text-[#FA5151]">重要提示：</span>
              本次结果提示侧弯风险较高。体表光学筛查存在 ±5° 误差，请务必至正规医院骨科行站立位全脊柱 X 光检查以明确诊断。
            </div>
          </div>
        </Card>
      )}

      {/* 免责声明 */}
      <p className="mx-5 mt-4 text-[11px] leading-5 text-gray-400">{disclaimer}</p>

      {/* 底部操作 */}
      <div className="mx-3 mt-4 flex gap-3">
        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-gray-200 bg-white py-3 text-[14px] font-medium text-gray-700">
          <Download size={16} /> 保存 PDF
        </button>
        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#07C160] py-3 text-[14px] font-medium text-white">
          <Share2 size={16} /> 转发给医生
        </button>
      </div>
    </Page>
  )
}
