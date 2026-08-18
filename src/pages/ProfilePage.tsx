import { ChevronRight, FileSignature, Headset, Info, Plus, ShieldCheck, Trash2, Users } from 'lucide-react'
import { Card, Page } from '@/components/common'
import { children } from '@/data/mock'

export default function ProfilePage({ childIndex, onSwitchChild }: { childIndex: number; onSwitchChild: () => void }) {
  const groups = [
    {
      title: '家庭与授权',
      items: [
        { icon: FileSignature, color: '#4C8DFF', label: '知情同意书', extra: '已签署 v1.2' },
        { icon: ShieldCheck, color: '#07C160', label: '隐私与数据授权', extra: '' },
        { icon: Trash2, color: '#FA5151', label: '删除我的数据', extra: '' },
      ],
    },
    {
      title: '其他',
      items: [
        { icon: Headset, color: '#FA9D3B', label: '客服与反馈', extra: '' },
        { icon: Info, color: '#8A63D2', label: '关于', extra: '算法 v1.3' },
      ],
    },
  ]

  return (
    <Page>
      <div className="px-4 pt-4">
        <h1 className="text-[20px] font-bold text-gray-900">我的</h1>
      </div>

      {/* 家长信息 */}
      <Card>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#07C160] text-[16px] font-bold text-white">李</div>
          <div>
            <div className="text-[16px] font-semibold text-gray-900">李女士（家长）</div>
            <div className="text-[12px] text-gray-400">微信已绑定 · 138****6677</div>
          </div>
        </div>
      </Card>

      {/* 家庭成员 */}
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[15px] font-semibold text-gray-900">
            <Users size={16} className="text-gray-400" /> 家庭成员
          </span>
          <button className="flex items-center gap-0.5 text-[13px] text-[#07C160]">
            <Plus size={14} /> 添加孩子
          </button>
        </div>
        <div className="flex gap-3">
          {children.map((c, i) => (
            <button
              key={c.id}
              onClick={onSwitchChild}
              className={`flex flex-col items-center gap-1.5 rounded-2xl border p-3 ${
                i === childIndex ? 'border-[#07C160] bg-[#F4FBF7]' : 'border-gray-100'
              }`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full text-[15px] font-bold text-white" style={{ backgroundColor: c.avatarColor }}>
                {c.name[0]}
              </div>
              <span className="text-[12px] text-gray-700">{c.name}</span>
              <span className="text-[10px] text-gray-400">{c.age} 岁</span>
            </button>
          ))}
        </div>
      </Card>

      {/* 功能组 */}
      {groups.map((g) => (
        <Card key={g.title} className="!p-0">
          <div className="px-4 pt-3 text-[12px] text-gray-400">{g.title}</div>
          {g.items.map((item, i) => (
            <button key={item.label} className={`flex w-full items-center gap-3 p-4 active:bg-gray-50 ${i > 0 ? 'border-t border-gray-50' : ''}`}>
              <item.icon size={18} color={item.color} />
              <span className="flex-1 text-left text-[14px] text-gray-800">{item.label}</span>
              {item.extra && <span className="text-[12px] text-gray-300">{item.extra}</span>}
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          ))}
        </Card>
      ))}

      <p className="px-6 pt-5 text-center text-[11px] leading-5 text-gray-300">
        数据加密存储 · 通过信息安全等级保护三级认证
        <br />
        本产品为筛查辅助工具，不能替代临床诊断
      </p>
    </Page>
  )
}
