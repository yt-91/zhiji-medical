import { Bell, CalendarClock, Camera, ChevronRight, FileText, Flame, GitCompareArrows, BookOpen, Hospital, QrCode, Watch, ChevronDown } from 'lucide-react'
import { Card, Page, RiskBadge, SectionTitle } from '@/components/common'
import { children, followupPlan, messages, reports, riskMeta } from '@/data/mock'

interface Props {
  childIndex: number
  onSwitchChild: () => void
  onOpenReport: (id: string) => void
  onGoFollowup: () => void
  onGoReports: () => void
  onGoMessages: () => void
  onGoSelfCheck: () => void
  onGoAppointment: () => void
  onGoRehab: () => void
  onGoArticles: () => void
  onGoWearable: () => void
}

export default function HomePage({ childIndex, onSwitchChild, onOpenReport, onGoFollowup, onGoReports, onGoMessages, onGoSelfCheck, onGoAppointment, onGoRehab, onGoArticles, onGoWearable }: Props) {
  const child = children[childIndex]
  const childReports = reports.filter((r) => r.childId === child.id).sort((a, b) => b.date.localeCompare(a.date))
  const latest = childReports[0]
  const unread = messages.filter((m) => m.unread).length
  const risk = riskMeta[latest.risk]

  return (
    <Page>
      {/* 顶部：孩子切换 + 消息 */}
      <div className="flex items-center justify-between px-4 pt-4">
        <button onClick={onSwitchChild} className="flex items-center gap-2.5">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-full text-[16px] font-bold text-white"
            style={{ backgroundColor: child.avatarColor }}
          >
            {child.name[0]}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1 text-[16px] font-semibold text-gray-900">
              {child.name} <ChevronDown size={15} className="text-gray-400" />
            </div>
            <div className="text-[11px] text-gray-400">{child.school}</div>
          </div>
        </button>
        <button onClick={onGoMessages} className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
          <Bell size={18} className="text-gray-600" />
          {unread > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FA5151] px-1 text-[10px] text-white">
              {unread}
            </span>
          )}
        </button>
      </div>

      {/* 最新风险状态卡 */}
      <Card className="!p-0 overflow-hidden">
        <div className="p-4" style={{ background: `linear-gradient(135deg, ${risk.bg}, #ffffff 80%)` }}>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-gray-500">最新筛查结果 · {latest.date}</span>
            <RiskBadge risk={latest.risk} />
          </div>
          <div className="mt-3 flex items-end gap-6">
            <div>
              <div className="text-[40px] font-bold leading-none" style={{ color: risk.color }}>
                {latest.cobb}°
              </div>
              <div className="mt-1 text-[12px] text-gray-400">Cobb 角估算值</div>
            </div>
            {latest.cobbDelta !== null && (
              <div className="pb-1">
                <div className="text-[18px] font-semibold text-[#FA5151]">↑ {latest.cobbDelta}°</div>
                <div className="text-[12px] text-gray-400">较上次变化</div>
              </div>
            )}
          </div>
          <p className="mt-3 rounded-xl bg-white/70 p-2.5 text-[12px] leading-5 text-gray-600">{risk.desc}</p>
        </div>
        <button onClick={() => onOpenReport(latest.id)} className="flex w-full items-center justify-center gap-1 border-t border-gray-50 py-3 text-[14px] font-medium text-[#07C160]">
          查看完整报告 <ChevronRight size={16} />
        </button>
      </Card>

      {/* 下次复查倒计时 */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F8EF]">
              <CalendarClock size={22} color="#07C160" />
            </div>
            <div>
              <div className="text-[14px] font-medium text-gray-900">下次随访复查</div>
              <div className="text-[12px] text-gray-400">{followupPlan.nextDate} · 每 {followupPlan.intervalMonths} 个月一次</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[24px] font-bold leading-none text-[#07C160]">{followupPlan.daysLeft}</div>
            <div className="mt-0.5 text-[11px] text-gray-400">天后到期</div>
          </div>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-[#07C160]" style={{ width: `${100 - (followupPlan.daysLeft / 90) * 100}%` }} />
        </div>
        <button onClick={onGoFollowup} className="mt-3 w-full rounded-full border border-[#07C160] py-2 text-[13px] font-medium text-[#07C160]">
          查看随访计划
        </button>
      </Card>

      {/* 快捷入口 */}
      <Card>
        <SectionTitle>常用功能</SectionTitle>
        <div className="grid grid-cols-4 gap-2 pt-1">
          {[
            { icon: FileText, label: '全部报告', color: '#4C8DFF', onClick: onGoReports },
            { icon: GitCompareArrows, label: '随访对比', color: '#07C160', onClick: onGoFollowup },
            { icon: Camera, label: '居家自查', color: '#FA5151', onClick: onGoSelfCheck },
            { icon: Hospital, label: '预约就诊', color: '#FA9D3B', onClick: onGoAppointment },
            { icon: Flame, label: '康复打卡', color: '#E8632C', onClick: onGoRehab },
            { icon: Watch, label: '智能穿戴', color: '#0ABF9E', onClick: onGoWearable },
            { icon: BookOpen, label: '健康科普', color: '#8A63D2', onClick: onGoArticles },
            { icon: QrCode, label: '绑定机构', color: '#576B95', onClick: () => {} },
          ].map(({ icon: Icon, label, color, onClick }) => (
            <button key={label} onClick={onClick} className="flex flex-col items-center gap-1.5 py-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: `${color}18` }}>
                <Icon size={21} color={color} />
              </div>
              <span className="text-[12px] text-gray-600">{label}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* 订阅消息授权引导 */}
      <Card className="border border-[#07C16033] bg-[#F4FBF7]">
        <div className="flex items-center gap-3">
          <Bell size={20} color="#07C160" className="shrink-0" />
          <div className="flex-1">
            <div className="text-[13px] font-medium text-gray-900">开启复查提醒</div>
            <div className="text-[11px] text-gray-500">授权微信订阅消息，复查到期自动通知，不再错过随访</div>
          </div>
          <button className="rounded-full bg-[#07C160] px-3.5 py-1.5 text-[12px] font-medium text-white">去开启</button>
        </div>
      </Card>
    </Page>
  )
}
