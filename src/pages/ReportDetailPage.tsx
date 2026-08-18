import { Download, Share2, AlertTriangle, ClipboardList, User } from 'lucide-react'
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
    { label: '躯干偏移', value: `${report.trunkShift} mm`, hint: '中线偏离距离' },
  ]

  const quality = [
    { label: '光照条件', value: report.quality.light },
    { label: '无遮挡', value: report.quality.occlusion },
    { label: '姿态规范', value: report.quality.posture },
  ]

  return (
    <Page>
      <NavBar title="筛查报告" onBack={onBack} />

      {/* 头部摘要 */}
      <Card className="!p-0 overflow-hidden">
        <div className="p-4" style={{ background: `linear-gradient(135deg, ${risk.bg}, #ffffff 85%)` }}>
          <div className="flex items-center justify-between text-[12px] text-gray-500">
            <span>{report.date} {report.time}</span>
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
              <div className="mt-2 text-[13px] text-gray-600">
                {report.type} · 顶椎 {report.apex}
              </div>
              <div className="text-[11px] text-gray-400">AI 置信度 {Math.round(report.confidence * 100)}%</div>
            </div>
          </div>
        </div>
      </Card>

      {/* 受检者身体信息 */}
      <Card>
        <SectionTitle>受检者信息</SectionTitle>
        <div className="grid grid-cols-4 divide-x divide-gray-50 text-center">
          {[
            { label: '身高', value: `${child.height} cm` },
            { label: '体重', value: `${child.weight} kg` },
            { label: '骨龄', value: child.boneAge },
            { label: 'Risser 征', value: child.risser.replace('Risser ', '') },
          ].map((i) => (
            <div key={i.label} className="flex flex-col items-center gap-0.5">
              <span className="text-[14px] font-bold text-gray-900">{i.value}</span>
              <span className="text-[10px] text-gray-400">{i.label}</span>
            </div>
          ))}
        </div>
        {child.heightGainYear >= 6 && (
          <p className="mt-3 rounded-xl bg-[#FDF3E7] p-2.5 text-[11px] leading-4.5 text-[#B26A00]">
            近一年身高增长 {child.heightGainYear} cm，处于生长高峰期，侧弯进展风险较高，请严格遵守随访间隔。
          </p>
        )}
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

      {/* 随访建议 */}
      <Card>
        <SectionTitle>随访建议</SectionTitle>
        <div className="space-y-2">
          {report.advice.map((a, i) => (
            <div key={i} className="flex gap-2.5 text-[13px] leading-5 text-gray-700">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8F8EF] text-[11px] font-bold text-[#07C160]">{i + 1}</span>
              {a}
            </div>
          ))}
        </div>
      </Card>

      {/* 医生意见 */}
      {report.doctorNote && (
        <Card>
          <SectionTitle>医生意见</SectionTitle>
          <p className="rounded-xl bg-[#F6F7F9] p-3 text-[13px] leading-6 text-gray-700">{report.doctorNote}</p>
          {report.doctorSign && (
            <div className="mt-2 text-right text-[12px] text-gray-400">{report.doctorSign}</div>
          )}
        </Card>
      )}

      {/* 检查信息 */}
      <Card>
        <SectionTitle>
          <span className="flex items-center gap-1.5"><ClipboardList size={15} className="text-gray-400" /> 检查信息</span>
        </SectionTitle>
        <div className="space-y-2 text-[12px]">
          {[
            ['报告编号', report.reportNo],
            ['检查方法', report.method],
            ['检查设备', report.device],
            ['操作人员', report.operator],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span className="text-gray-400">{k}</span>
              <span className="text-gray-700">{v}</span>
            </div>
          ))}
        </div>
        {/* 采集质量 */}
        <div className="mt-3 border-t border-gray-50 pt-3">
          <div className="mb-2 text-[12px] text-gray-400">采集质量评分</div>
          <div className="space-y-1.5">
            {quality.map((q) => (
              <div key={q.label} className="flex items-center gap-2">
                <span className="w-14 text-[11px] text-gray-500">{q.label}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full rounded-full bg-[#07C160]" style={{ width: `${q.value}%` }} />
                </div>
                <span className="w-7 text-right text-[11px] text-gray-500">{q.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* 转诊警示 */}
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
      <p className="mx-5 mt-4 flex gap-1.5 text-[11px] leading-5 text-gray-400">
        <User size={12} className="mt-0.5 shrink-0" /> {disclaimer}
      </p>

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
