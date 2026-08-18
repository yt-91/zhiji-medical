import { useState } from 'react'
import { Check, ChevronDown, Flame, Play, TriangleAlert } from 'lucide-react'
import { Card, NavBar, Page, SectionTitle } from '@/components/common'
import { badges, rehabTasks, weekCheckins } from '@/data/mock'

// 康复打卡
export default function RehabPage({ onBack }: { onBack: () => void }) {
  const [tasks, setTasks] = useState(rehabTasks)
  const [expanded, setExpanded] = useState<string | null>(null)
  const doneCount = tasks.filter((t) => t.done).length
  const allDone = doneCount === tasks.length

  const toggle = (id: string) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  return (
    <Page>
      <NavBar title="康复训练" onBack={onBack} />

      {/* 连续打卡 */}
      <Card className="!p-0 overflow-hidden">
        <div className="flex items-center justify-between bg-gradient-to-br from-[#FA9D3B] to-[#F7B267] p-5 text-white">
          <div>
            <div className="flex items-center gap-1.5 text-[13px] opacity-90"><Flame size={15} /> 连续打卡</div>
            <div className="mt-1 flex items-end gap-1.5">
              <span className="text-[40px] font-bold leading-none">12</span>
              <span className="pb-1 text-[14px]">天</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[13px] opacity-90">今日任务</div>
            <div className="mt-1 text-[24px] font-bold">{doneCount}/{tasks.length}</div>
          </div>
        </div>
        {/* 本周打卡 */}
        <div className="flex justify-between px-5 py-3.5">
          {weekCheckins.map((done, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-gray-400">{['一', '二', '三', '四', '五', '六', '日'][i]}</span>
              <div className={`flex h-6 w-6 items-center justify-center rounded-full ${done ? 'bg-[#07C160]' : 'bg-gray-100'}`}>
                {done && <Check size={13} color="#fff" strokeWidth={3} />}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 今日训练 */}
      <Card>
        <SectionTitle extra={<span className="text-[12px] text-gray-400">按「胸腰弯」分型推荐 · 点击动作看要领</span>}>今日训练计划</SectionTitle>
        <div className="space-y-2.5">
          {tasks.map((t) => (
            <div key={t.id} className={`rounded-xl border ${t.done ? 'border-[#07C16033] bg-[#F4FBF7]' : 'border-gray-100'}`}>
              <div className="flex items-center gap-3 p-3">
                <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F8EF]">
                  <Play size={16} color="#07C160" />
                </button>
                <button onClick={() => setExpanded(expanded === t.id ? null : t.id)} className="min-w-0 flex-1 text-left">
                  <div className={`flex items-center gap-1 text-[14px] font-medium ${t.done ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                    {t.name}
                    <ChevronDown size={14} className={`text-gray-300 transition-transform ${expanded === t.id ? 'rotate-180' : ''}`} />
                  </div>
                  <div className="text-[11px] text-gray-400">{t.duration} · {t.target}</div>
                </button>
                <button
                  onClick={() => toggle(t.id)}
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
                    t.done ? 'border-[#07C160] bg-[#07C160]' : 'border-gray-300'
                  }`}
                >
                  {t.done && <Check size={15} color="#fff" strokeWidth={3} />}
                </button>
              </div>
              {expanded === t.id && (
                <div className="border-t border-gray-50 px-3 pb-3 pt-2.5">
                  <div className="text-[12px] font-medium text-gray-700">动作要领</div>
                  <div className="mt-1.5 space-y-1">
                    {t.points.map((p, i) => (
                      <div key={i} className="flex gap-2 text-[12px] leading-5 text-gray-500">
                        <span className="font-bold text-[#07C160]">{i + 1}.</span> {p}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-1.5 rounded-lg bg-[#FFFBF5] p-2 text-[11px] leading-4.5 text-[#B26A00]">
                    <TriangleAlert size={12} className="mt-0.5 shrink-0" /> {t.caution}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* 完成打卡按钮 */}
      <button
        disabled={!allDone}
        className={`mx-3 mt-1 flex w-[calc(100%-24px)] items-center justify-center rounded-full py-3.5 text-[15px] font-medium ${
          allDone ? 'bg-[#07C160] text-white' : 'bg-gray-200 text-gray-400'
        }`}
      >
        {allDone ? '完成今日打卡 🎉' : `完成全部训练后可打卡（${doneCount}/${tasks.length}）`}
      </button>

      {/* 徽章 */}
      <Card>
        <SectionTitle>我的徽章</SectionTitle>
        <div className="grid grid-cols-4 gap-2">
          {badges.map((b) => (
            <div key={b.name} className={`flex flex-col items-center gap-1 rounded-xl p-2.5 ${b.got ? 'bg-[#FFFBF5]' : 'opacity-40'}`}>
              <span className="text-[26px]">{b.icon}</span>
              <span className="text-[10px] text-gray-500">{b.name}</span>
              <span className="text-center text-[9px] leading-3 text-gray-300">{b.desc}</span>
            </div>
          ))}
        </div>
      </Card>

      <p className="px-6 pt-3 text-center text-[11px] leading-5 text-gray-300">
        训练方案由康复治疗师赵敏制定，每 4-6 周复诊调整
      </p>
    </Page>
  )
}
