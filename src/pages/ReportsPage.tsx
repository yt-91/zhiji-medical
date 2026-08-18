import { ChevronRight } from 'lucide-react'
import { Page, RiskBadge } from '@/components/common'
import { children, reports } from '@/data/mock'

export default function ReportsPage({ childIndex, onOpenReport }: { childIndex: number; onOpenReport: (id: string) => void }) {
  const child = children[childIndex]
  const list = reports.filter((r) => r.childId === child.id).sort((a, b) => b.date.localeCompare(a.date))

  // 按年份分组
  const byYear = new Map<string, typeof list>()
  list.forEach((r) => {
    const y = r.date.slice(0, 4)
    byYear.set(y, [...(byYear.get(y) ?? []), r])
  })

  return (
    <Page>
      <div className="px-4 pt-4">
        <h1 className="text-[20px] font-bold text-gray-900">筛查报告</h1>
        <p className="mt-0.5 text-[12px] text-gray-400">
          {child.name} · 共 {list.length} 份报告
        </p>
      </div>

      {[...byYear.entries()].map(([year, items]) => (
        <div key={year} className="mt-4">
          <div className="px-4 text-[13px] font-medium text-gray-400">{year} 年</div>
          <div className="mx-3 mt-2 overflow-hidden rounded-2xl bg-white shadow-sm">
            {items.map((r, i) => (
              <button
                key={r.id}
                onClick={() => onOpenReport(r.id)}
                className={`flex w-full items-center gap-3 p-4 text-left active:bg-gray-50 ${i > 0 ? 'border-t border-gray-50' : ''}`}
              >
                {/* 日期块 */}
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-[#F6F7F9]">
                  <span className="text-[16px] font-bold leading-none text-gray-800">{r.date.slice(8)}</span>
                  <span className="mt-0.5 text-[10px] text-gray-400">{r.date.slice(5, 7)}月</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-gray-900">Cobb {r.cobb}°</span>
                    <RiskBadge risk={r.risk} />
                  </div>
                  <div className="mt-0.5 truncate text-[12px] text-gray-400">{r.source}</div>
                </div>
                <ChevronRight size={17} className="shrink-0 text-gray-300" />
              </button>
            ))}
          </div>
        </div>
      ))}

      <p className="px-6 pt-6 text-center text-[11px] leading-5 text-gray-300">
        报告数据经加密存储，仅您本人及授权医生可见
      </p>
    </Page>
  )
}
