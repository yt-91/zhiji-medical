import { useState } from 'react'
import { BatteryMedium, Bluetooth, BellRing, Lightbulb, Vibrate } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Card, NavBar, Page, SectionTitle } from '@/components/common'
import { wearable } from '@/data/mock'

// 可穿戴设备（三期）
export default function WearablePage({ onBack }: { onBack: () => void }) {
  const [remind, setRemind] = useState(true)
  const [vibrate, setVibrate] = useState(true)

  const stats = [
    { label: '今日佩戴', value: wearable.todayWear },
    { label: '久坐时长', value: wearable.todaySitting },
    { label: '不良姿势占比', value: `${wearable.badPostureRate}%` },
    { label: '步态对称性', value: `${wearable.gaitSymmetry}%` },
  ]

  const totalHours = wearable.postureMix.reduce((s, p) => s + p.hours, 0)

  return (
    <Page>
      <NavBar title="智能穿戴" onBack={onBack} />

      {/* 设备状态 */}
      <Card className="!p-0 overflow-hidden">
        <div className="flex items-center gap-3 bg-gradient-to-br from-[#4C8DFF] to-[#6FA3FF] p-4 text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
            <Vibrate size={24} />
          </div>
          <div className="flex-1">
            <div className="text-[15px] font-semibold">{wearable.name}</div>
            <div className="text-[11px] opacity-80">{wearable.model}</div>
          </div>
          <div className="text-right text-[11px]">
            <div className="flex items-center justify-end gap-1">
              <Bluetooth size={12} /> {wearable.connected ? '已连接' : '未连接'}
            </div>
            <div className="mt-1 flex items-center justify-end gap-1">
              <BatteryMedium size={13} /> {wearable.battery}%
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 divide-x divide-gray-50 py-3">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5">
              <span className="text-[14px] font-bold text-gray-900">{s.value}</span>
              <span className="text-[10px] text-gray-400">{s.label}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 今日姿态构成 */}
      <Card>
        <SectionTitle>今日姿态构成</SectionTitle>
        <div className="flex h-3.5 overflow-hidden rounded-full">
          {wearable.postureMix.map((p) => (
            <div key={p.label} style={{ width: `${(p.hours / totalHours) * 100}%`, backgroundColor: p.color }} />
          ))}
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-1.5">
          {wearable.postureMix.map((p) => (
            <div key={p.label} className="flex items-center gap-1.5 text-[12px] text-gray-600">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: p.color }} />
              {p.label} <span className="ml-auto font-medium text-gray-800">{p.hours}h</span>
            </div>
          ))}
        </div>
        {/* 时段对比 */}
        <div className="mt-4 border-t border-gray-50 pt-3">
          <div className="mb-2 text-[12px] text-gray-400">各时段不良姿势占比</div>
          <div className="space-y-1.5">
            {wearable.todaySegments.map((s) => (
              <div key={s.period} className="flex items-center gap-2">
                <span className="w-8 text-[11px] text-gray-500">{s.period}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${s.value * 2.5}%`, backgroundColor: s.value >= 28 ? '#FA9D3B' : '#07C160' }}
                  />
                </div>
                <span className={`w-9 text-right text-[11px] ${s.value >= 28 ? 'font-medium text-[#FA9D3B]' : 'text-gray-500'}`}>{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* 近7天姿势趋势 */}
      <Card>
        <SectionTitle>近 7 天不良姿势占比</SectionTitle>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={wearable.weekBadPosture} margin={{ top: 8, right: 8, bottom: 0, left: -24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #eee' }} formatter={(v) => [`${v}%`, '不良姿势']} cursor={{ fill: '#F6F7F9' }} />
              <Bar dataKey="value" radius={[5, 5, 0, 0]} barSize={22}>
                {wearable.weekBadPosture.map((d) => (
                  <Cell key={d.day} fill={d.value >= 28 ? '#FA9D3B' : '#07C160'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex gap-2 rounded-xl bg-[#F6F7F9] p-2.5 text-[12px] leading-5 text-gray-600">
          <Lightbulb size={15} color="#FA9D3B" className="mt-0.5 shrink-0" />
          {wearable.insight}
        </div>
      </Card>

      {/* 提醒设置 */}
      <Card className="!p-0">
        <div className="px-4 pt-3 text-[12px] text-gray-400">监测设置</div>
        {[
          { icon: BellRing, color: '#FA9D3B', label: '久坐提醒', desc: '连续坐姿 45 分钟震动提醒', value: remind, set: setRemind },
          { icon: Vibrate, color: '#4C8DFF', label: '姿势矫正提醒', desc: '检测到持续不良姿势时实时震动', value: vibrate, set: setVibrate },
        ].map((item, i) => (
          <div key={item.label} className={`flex items-center gap-3 p-4 ${i > 0 ? 'border-t border-gray-50' : ''}`}>
            <item.icon size={18} color={item.color} />
            <div className="flex-1">
              <div className="text-[14px] text-gray-800">{item.label}</div>
              <div className="text-[11px] text-gray-400">{item.desc}</div>
            </div>
            <button
              onClick={() => item.set(!item.value)}
              className={`relative h-6 w-11 rounded-full transition-colors ${item.value ? 'bg-[#07C160]' : 'bg-gray-200'}`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${item.value ? 'left-[22px]' : 'left-0.5'}`} />
            </button>
          </div>
        ))}
      </Card>

      <p className="px-6 pt-4 text-center text-[11px] leading-5 text-gray-300">
        穿戴数据仅用于康复参考，已与随访档案自动同步
      </p>
    </Page>
  )
}
