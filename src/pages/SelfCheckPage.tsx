import { useEffect, useState } from 'react'
import { Camera, Check, Info, Loader2, RefreshCw, TriangleAlert } from 'lucide-react'
import { Card, NavBar, Page, RiskBadge } from '@/components/common'
import { captureViews } from '@/data/mock'

type Step = 'intro' | 'capture' | 'analyzing' | 'result'

// 拍摄引导人形轮廓（按视角切换）
function PoseGuide({ viewKey }: { viewKey: string }) {
  const isBend = viewKey === 'adam'
  return (
    <svg viewBox="0 0 200 260" className="h-full w-full">
      {/* 取景对齐框 */}
      <rect x="30" y="10" width="140" height="240" rx="16" fill="none" stroke="#07C16055" strokeWidth="1.5" strokeDasharray="6 6" />
      {isBend ? (
        // 前屈位轮廓
        <g stroke="#07C160" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.9">
          <circle cx="150" cy="105" r="14" />
          <path d="M 138 110 Q 100 95 62 105" />
          <path d="M 62 105 L 60 175" />
          <path d="M 60 175 L 52 235 M 60 175 L 72 235" />
          <path d="M 100 100 L 92 160" />
        </g>
      ) : (
        // 直立位轮廓
        <g stroke="#07C160" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.9">
          <circle cx="100" cy="45" r="15" />
          <path d="M 100 62 L 100 150" />
          <path d="M 100 78 L 72 128 M 100 78 L 128 128" />
          <path d="M 100 150 L 84 235 M 100 150 L 116 235" />
        </g>
      )}
      <text x="100" y="255" fontSize="10" fill="#07C160" textAnchor="middle">将身体对准绿色引导线</text>
    </svg>
  )
}

export default function SelfCheckPage({ onBack, onDone }: { onBack: () => void; onDone: () => void }) {
  const [step, setStep] = useState<Step>('intro')
  const [viewIndex, setViewIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  // 模拟云端分析进度
  useEffect(() => {
    if (step !== 'analyzing') return
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(t)
          setStep('result')
          return 100
        }
        return p + 4
      })
    }, 90)
    return () => clearInterval(t)
  }, [step])

  const view = captureViews[viewIndex]

  const shoot = () => {
    if (viewIndex < captureViews.length - 1) {
      setViewIndex(viewIndex + 1)
    } else {
      setStep('analyzing')
    }
  }

  return (
    <Page>
      <NavBar title="居家自查" onBack={onBack} />

      {/* ① 流程说明 */}
      {step === 'intro' && (
        <>
          <Card>
            <div className="flex items-center gap-2 text-[15px] font-semibold text-gray-900">
              <Camera size={18} color="#07C160" /> 标准四视图自查
            </div>
            <p className="mt-2 text-[13px] leading-6 text-gray-500">
              按引导完成 4 个视角的拍摄，AI 将云端分析脊柱形态并生成自查报告，全程约 2 分钟。
            </p>
            <div className="mt-3 space-y-2.5">
              {captureViews.map((v, i) => (
                <div key={v.key} className="flex items-center gap-3 rounded-xl bg-[#F6F7F9] p-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#07C160] text-[12px] font-bold text-white">{i + 1}</span>
                  <div>
                    <div className="text-[13px] font-medium text-gray-800">{v.name}</div>
                    <div className="text-[11px] text-gray-400">{v.hint}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="border border-[#FA9D3B33] bg-[#FFFBF5]">
            <div className="flex gap-2.5">
              <Info size={16} color="#FA9D3B" className="mt-0.5 shrink-0" />
              <p className="text-[12px] leading-5 text-gray-600">
                拍摄前请准备：裸露背部或穿紧身衣、光线明亮均匀、请家人协助拍摄、手机距离约 2 米。
                自查结果精度低于机构筛查，仅用于日常观察。
              </p>
            </div>
          </Card>
          <button onClick={() => setStep('capture')} className="mx-3 mt-4 flex w-[calc(100%-24px)] items-center justify-center rounded-full bg-[#07C160] py-3.5 text-[15px] font-medium text-white">
            开始拍摄
          </button>
        </>
      )}

      {/* ② 拍摄引导（模拟取景器） */}
      {step === 'capture' && (
        <>
          <Card className="!p-0 overflow-hidden">
            {/* 模拟相机取景区 */}
            <div className="relative h-[340px] bg-gradient-to-b from-gray-800 to-gray-700">
              <div className="absolute inset-x-8 top-4 bottom-4">
                <PoseGuide viewKey={view.key} />
              </div>
              {/* 视角标签 */}
              <div className="absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-[12px] text-white">
                {viewIndex + 1}/4 · {view.name}
              </div>
              {/* 质量指示 */}
              <div className="absolute right-3 top-3 space-y-1.5">
                {['光线良好', '距离合适', '姿态正确'].map((q) => (
                  <div key={q} className="flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[10px] text-[#6EE7A0]">
                    <Check size={10} strokeWidth={3} /> {q}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4">
              <p className="text-center text-[13px] text-gray-600">{view.hint}</p>
              <div className="mt-3 flex items-center justify-center gap-2">
                {captureViews.map((v, i) => (
                  <span key={v.key} className={`h-1.5 rounded-full transition-all ${i < viewIndex ? 'w-4 bg-[#07C160]' : i === viewIndex ? 'w-6 bg-[#07C160]' : 'w-1.5 bg-gray-200'}`} />
                ))}
              </div>
            </div>
          </Card>
          <button onClick={shoot} className="mx-3 mt-4 flex w-[calc(100%-24px)] items-center justify-center gap-2 rounded-full bg-[#07C160] py-3.5 text-[15px] font-medium text-white">
            <Camera size={18} /> {viewIndex < captureViews.length - 1 ? '拍摄并继续' : '拍摄并完成'}
          </button>
        </>
      )}

      {/* ③ 云端分析中 */}
      {step === 'analyzing' && (
        <div className="flex flex-col items-center px-8 pt-24">
          <Loader2 size={44} color="#07C160" className="animate-spin" />
          <div className="mt-5 text-[16px] font-medium text-gray-900">AI 云端分析中…</div>
          <p className="mt-1 text-[12px] text-gray-400">正在进行关键点检测与脊柱曲线拟合</p>
          <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-[#07C160] transition-all" style={{ width: `${progress}%` }} />
          </div>
          <span className="mt-2 text-[12px] text-gray-400">{progress}%</span>
        </div>
      )}

      {/* ④ 自查结果 */}
      {step === 'result' && (
        <>
          <Card>
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-semibold text-gray-900">本次自查结果</span>
              <RiskBadge risk="referral" />
            </div>
            <div className="mt-4 flex items-end gap-6">
              <div>
                <div className="text-[40px] font-bold leading-none text-[#FA5151]">22°</div>
                <div className="mt-1 text-[12px] text-gray-400">Cobb 角估算（±5°）</div>
              </div>
              <div className="pb-1">
                <div className="text-[18px] font-semibold text-[#FA5151]">↑ 1°</div>
                <div className="text-[12px] text-gray-400">较 06-20 机构复查</div>
              </div>
            </div>
            <p className="mt-3 rounded-xl bg-[#F6F7F9] p-3 text-[12px] leading-5 text-gray-600">
              与上次复查结果基本一致，侧弯趋势稳定。请继续按 3 个月周期随访，下次机构复查：2026-09-20。
            </p>
          </Card>
          <Card className="border border-[#FA9D3B33] bg-[#FFFBF5]">
            <div className="flex gap-2.5">
              <TriangleAlert size={16} color="#FA9D3B" className="mt-0.5 shrink-0" />
              <p className="text-[12px] leading-5 text-gray-600">
                居家自查受拍摄条件影响，精度低于机构筛查。本结果不能替代正式复查与临床诊断。
              </p>
            </div>
          </Card>
          <div className="mx-3 mt-4 flex gap-3">
            <button onClick={() => { setStep('intro'); setViewIndex(0); setProgress(0) }} className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-gray-200 bg-white py-3 text-[14px] font-medium text-gray-700">
              <RefreshCw size={15} /> 重新自查
            </button>
            <button onClick={onDone} className="flex flex-1 items-center justify-center rounded-full bg-[#07C160] py-3 text-[14px] font-medium text-white">
              纳入随访档案
            </button>
          </div>
        </>
      )}
    </Page>
  )
}
