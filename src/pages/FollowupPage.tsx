import { BellRing, Check, Circle, GitCompareArrows } from 'lucide-react'
import { Card, Page, SectionTitle } from '@/components/common'
import { children, followupPlan } from '@/data/mock'

export default function FollowupPage({ childIndex, onOpenCompare }: { childIndex: number; onOpenCompare: () => void }) {
  const child = children[childIndex]
  const plan = followupPlan

  return (
    <Page>
      <div className="px-4 pt-4">
        <h1 className="text-[20px] font-bold text-gray-900">随访计划</h1>
        <p className="mt-0.5 text-[12px] text-gray-400">
          {child.name} · 每 {plan.intervalMonths} 个月复查一次
        </p>
      </div>

      {/* 倒计时卡 */}
      <Card className="!p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-[#07C160] to-[#0ABF6B] p-5 text-white">
          <div className="text-[13px] opacity-80">距离下次复查还有</div>
          <div className="mt-1 flex items-end gap-2">
            <span className="text-[44px] font-bold leading-none">{plan.daysLeft}</span>
            <span className="pb-1.5 text-[15px]">天</span>
          </div>
          <div className="mt-2 text-[13px] opacity-90">计划日期：{plan.nextDate}（第 4 次随访）</div>
        </div>
        <div className="flex items-center gap-3 p-4">
          <BellRing size={18} color="#07C160" className="shrink-0" />
          <div className="flex-1 text-[12px] leading-4.5 text-gray-500">
            已开启微信订阅消息提醒，将于到期前 7 天和前 1 天通知您
          </div>
          <span className="rounded-full bg-[#E8F8EF] px-2.5 py-1 text-[11px] font-medium text-[#07C160]">已开启</span>
        </div>
      </Card>

      {/* 随访时间轴 */}
      <Card>
        <SectionTitle
          extra={
            <button onClick={onOpenCompare} className="flex items-center gap-1 text-[13px] font-medium text-[#07C160]">
              <GitCompareArrows size={15} /> 结果对比
            </button>
          }
        >
          随访记录
        </SectionTitle>
        <div className="mt-1">
          {plan.history.map((h, i) => {
            const done = h.status === 'done'
            return (
              <div key={h.date} className="relative flex gap-3 pb-5 last:pb-0">
                {/* 竖线 */}
                {i < plan.history.length - 1 && (
                  <div className="absolute left-[9px] top-6 h-full w-px bg-gray-200" />
                )}
                <div className="z-10 mt-1 shrink-0">
                  {done ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#07C160]">
                      <Check size={12} color="#fff" strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#07C160] bg-white">
                      <Circle size={6} className="fill-[#07C160] text-[#07C160]" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-[14px] ${done ? 'text-gray-900' : 'font-medium text-[#07C160]'}`}>{h.title}</span>
                    {h.cobb !== undefined && <span className="text-[13px] font-semibold text-gray-500">{h.cobb}°</span>}
                  </div>
                  <div className="mt-0.5 text-[12px] text-gray-400">{h.date}</div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* 复查方式 */}
      <Card>
        <SectionTitle>到期后如何复查</SectionTitle>
        <div className="space-y-2.5 text-[13px] leading-5 text-gray-600">
          <div className="flex gap-2"><span className="font-bold text-[#07C160]">1</span>前往学校医务室或社区卫生服务中心的一体机复查（推荐，数据自动同步）</div>
          <div className="flex gap-2"><span className="font-bold text-[#07C160]">2</span>使用筛查 APP 在家完成四视图采集复查</div>
          <div className="flex gap-2"><span className="font-bold text-[#07C160]">3</span>如已就诊，可将医院 X 光结果拍照上传，纳入随访档案</div>
        </div>
      </Card>
    </Page>
  )
}
