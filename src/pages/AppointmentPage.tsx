import { useState } from 'react'
import { CalendarCheck, CheckCircle2, MapPin } from 'lucide-react'
import { Card, NavBar, Page, SectionTitle } from '@/components/common'
import { hospitals } from '@/data/mock'

// 预约就诊：医院列表 → 选医生/号源 → 预约成功
export default function AppointmentPage({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [picked, setPicked] = useState<{ doctor: string; date: string; time: string } | null>(null)
  const [booked, setBooked] = useState(false)

  const hospital = hospitals.find((h) => h.id === selected)

  return (
    <Page>
      <NavBar title="预约就诊" onBack={onBack} />

      {booked && picked ? (
        <div className="flex flex-col items-center px-8 pt-20">
          <CheckCircle2 size={56} color="#07C160" />
          <div className="mt-4 text-[18px] font-bold text-gray-900">预约成功</div>
          <Card className="!mx-0 mt-5 w-full">
            <div className="space-y-2.5 text-[13px] text-gray-600">
              <div className="flex justify-between"><span className="text-gray-400">就诊人</span><span>李明轩</span></div>
              <div className="flex justify-between"><span className="text-gray-400">医院</span><span>{hospital?.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">科室/医生</span><span>{hospital?.dept} · {picked.doctor}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">时间</span><span>2026-{picked.date.split(' ')[0]} {picked.time}</span></div>
            </div>
            <p className="mt-3 rounded-xl bg-[#F6F7F9] p-3 text-[12px] leading-5 text-gray-500">
              就诊时请携带近期筛查报告（可在"报告"页保存 PDF）。预约信息已同步至消息中心，就诊前一天将提醒您。
            </p>
          </Card>
          <button onClick={onBack} className="mt-5 w-full rounded-full bg-[#07C160] py-3 text-[14px] font-medium text-white">完成</button>
        </div>
      ) : !hospital ? (
        <>
          <div className="px-4 pt-4 text-[13px] text-gray-400">
            已按当前位置排序，带「合作机构」标签的医院可互认筛查报告
          </div>
          {hospitals.map((h) => (
            <Card key={h.id}>
              <button onClick={() => setSelected(h.id)} className="w-full text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-semibold text-gray-900">{h.name}</span>
                  <span className="flex items-center gap-0.5 text-[12px] text-gray-400">
                    <MapPin size={12} /> {h.distance}
                  </span>
                </div>
                <div className="mt-1 text-[12px] text-gray-500">{h.level} · {h.dept}</div>
                <div className="mt-2 flex gap-1.5">
                  {h.tags.map((t) => (
                    <span key={t} className="rounded-full bg-[#E8F8EF] px-2 py-0.5 text-[11px] text-[#07C160]">{t}</span>
                  ))}
                </div>
              </button>
            </Card>
          ))}
        </>
      ) : (
        <>
          <Card>
            <button onClick={() => setSelected(null)} className="text-[12px] text-[#07C160]">‹ 返回医院列表</button>
            <div className="mt-2 text-[16px] font-bold text-gray-900">{hospital.name}</div>
            <div className="mt-0.5 text-[12px] text-gray-400">{hospital.level} · {hospital.dept} · {hospital.distance}</div>
          </Card>
          {hospital.doctors.map((d) => (
            <Card key={d.name}>
              <SectionTitle extra={<span className="text-[12px] text-gray-400">{d.title}</span>}>{d.name}</SectionTitle>
              {d.slots.map((s) => (
                <div key={s.date} className="mt-2">
                  <div className="text-[12px] text-gray-400">{s.date}</div>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {s.periods.map((p) => {
                      const active = picked?.doctor === d.name && picked?.date === s.date && picked?.time === p.time
                      return (
                        <button
                          key={p.time}
                          onClick={() => setPicked({ doctor: d.name, date: s.date, time: p.time })}
                          className={`rounded-full border px-3 py-1.5 text-[12px] ${
                            active ? 'border-[#07C160] bg-[#07C160] text-white' : 'border-gray-200 text-gray-600'
                          }`}
                        >
                          {p.time} · 余 {p.left}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </Card>
          ))}
          <button
            disabled={!picked}
            onClick={() => setBooked(true)}
            className={`mx-3 mt-4 flex w-[calc(100%-24px)] items-center justify-center gap-2 rounded-full py-3.5 text-[15px] font-medium ${
              picked ? 'bg-[#07C160] text-white' : 'bg-gray-200 text-gray-400'
            }`}
          >
            <CalendarCheck size={17} /> 确认预约
          </button>
        </>
      )}
    </Page>
  )
}
