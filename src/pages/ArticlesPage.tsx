import { BookOpen, ChevronRight, Clock } from 'lucide-react'
import { Card, NavBar, Page } from '@/components/common'
import { articles } from '@/data/mock'

// 科普列表
export function ArticlesPage({ onBack, onOpen }: { onBack: () => void; onOpen: (id: string) => void }) {
  return (
    <Page>
      <NavBar title="健康科普" onBack={onBack} />
      {articles.map((a) => (
        <Card key={a.id}>
          <button onClick={() => onOpen(a.id)} className="flex w-full items-center gap-3 text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#8A63D218]">
              <BookOpen size={24} color="#8A63D2" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="line-clamp-2 text-[14px] font-medium leading-5 text-gray-900">{a.title}</div>
              <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-400">
                <span className="rounded-full bg-[#F6F7F9] px-2 py-0.5">{a.category}</span>
                <span className="flex items-center gap-0.5"><Clock size={11} /> {a.readTime}</span>
              </div>
            </div>
            <ChevronRight size={16} className="shrink-0 text-gray-300" />
          </button>
        </Card>
      ))}
      <p className="pt-4 text-center text-[11px] text-gray-300">内容均由骨科医学顾问审核</p>
    </Page>
  )
}

// 文章详情
export function ArticleDetailPage({ id, onBack }: { id: string; onBack: () => void }) {
  const a = articles.find((x) => x.id === id)!
  return (
    <Page>
      <NavBar title={a.category} onBack={onBack} />
      <Card>
        <h1 className="text-[18px] font-bold leading-7 text-gray-900">{a.title}</h1>
        <div className="mt-2 flex items-center gap-2 text-[11px] text-gray-400">
          <span className="rounded-full bg-[#F6F7F9] px-2 py-0.5">{a.category}</span>
          <span>{a.readTime}</span>
          <span>医学顾问审核</span>
        </div>
        <p className="mt-4 rounded-xl bg-[#F6F7F9] p-3 text-[13px] leading-6 text-gray-500">{a.summary}</p>
        <div className="mt-4 space-y-4">
          {a.content.map((p, i) => (
            <p key={i} className="text-[14px] leading-7 text-gray-700">{p}</p>
          ))}
        </div>
        <p className="mt-6 border-t border-gray-50 pt-3 text-[11px] leading-5 text-gray-300">
          本文仅作健康科普，不构成诊疗建议。具体治疗方案请遵医嘱。
        </p>
      </Card>
    </Page>
  )
}
