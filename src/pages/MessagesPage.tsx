import { Bell, FileText, Stethoscope, BookOpen } from 'lucide-react'
import { NavBar, Page } from '@/components/common'
import { messages, type Message } from '@/data/mock'

const typeMeta: Record<Message['type'], { icon: typeof Bell; color: string; label: string }> = {
  report: { icon: FileText, color: '#4C8DFF', label: '报告' },
  reminder: { icon: Bell, color: '#07C160', label: '提醒' },
  doctor: { icon: Stethoscope, color: '#FA5151', label: '医生' },
  article: { icon: BookOpen, color: '#8A63D2', label: '科普' },
}

export default function MessagesPage({ onBack }: { onBack: () => void }) {
  return (
    <Page>
      <NavBar title="消息中心" onBack={onBack} />
      <div className="mx-3 mt-3 overflow-hidden rounded-2xl bg-white shadow-sm">
        {messages.map((m, i) => {
          const meta = typeMeta[m.type]
          const Icon = meta.icon
          return (
            <div key={m.id} className={`flex gap-3 p-4 active:bg-gray-50 ${i > 0 ? 'border-t border-gray-50' : ''}`}>
              <div className="relative shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: `${meta.color}18` }}>
                  <Icon size={18} color={meta.color} />
                </div>
                {m.unread && <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-[#FA5151]" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-medium text-gray-900">{m.title}</span>
                  <span className="text-[11px] text-gray-300">{m.time.slice(5, 10)}</span>
                </div>
                <p className="mt-0.5 line-clamp-2 text-[12px] leading-5 text-gray-500">{m.body}</p>
              </div>
            </div>
          )
        })}
      </div>
      <p className="pt-4 text-center text-[11px] text-gray-300">消息保留最近 90 天</p>
    </Page>
  )
}
