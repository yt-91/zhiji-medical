// 一期 MVP 原型 · 模拟数据
export type RiskLevel = 'normal' | 'watch' | 'referral'

export const riskMeta: Record<RiskLevel, { label: string; color: string; bg: string; desc: string }> = {
  normal: { label: '低风险', color: '#07C160', bg: '#E8F8EF', desc: '暂未见明显异常，建议 12 个月后常规复查' },
  watch: { label: '需关注', color: '#FA9D3B', bg: '#FDF3E7', desc: '存在轻度侧弯迹象，建议 6 个月内复查观察' },
  referral: { label: '建议转诊', color: '#FA5151', bg: '#FDEBEB', desc: '侧弯风险较高，建议尽快至骨科门诊就诊，必要时行 X 光检查确诊' },
}

export interface Child {
  id: string
  name: string
  gender: string
  age: number
  school: string
  avatarColor: string
}

export const children: Child[] = [
  { id: 'c1', name: '李明轩', gender: '男', age: 12, school: '临港第一中学 · 初一(3)班', avatarColor: '#4C8DFF' },
  { id: 'c2', name: '李明悦', gender: '女', age: 9, school: '临港实验小学 · 三(2)班', avatarColor: '#FA9D3B' },
]

export interface Report {
  id: string
  childId: string
  date: string
  source: string
  cobb: number
  cobbDelta: number | null
  risk: RiskLevel
  type: string
  shoulderDiff: number // mm
  pelvisTilt: number // deg
  atr: number // deg 躯干旋转角
  confidence: number
  doctorNote?: string
}

export const reports: Report[] = [
  { id: 'r1', childId: 'c1', date: '2025-09-12', source: '学校集中筛查 · 一体机', cobb: 12, cobbDelta: null, risk: 'watch', type: '胸腰弯（C 型倾向）', shoulderDiff: 6, pelvisTilt: 2.1, atr: 4, confidence: 0.92 },
  { id: 'r2', childId: 'c1', date: '2025-12-10', source: '社区服务中心复查', cobb: 15, cobbDelta: 3, risk: 'watch', type: '胸腰弯（C 型）', shoulderDiff: 8, pelvisTilt: 2.8, atr: 5, confidence: 0.9 },
  { id: 'r3', childId: 'c1', date: '2026-03-15', source: '学校集中筛查 · 一体机', cobb: 18, cobbDelta: 3, risk: 'referral', type: '胸腰弯（C 型）', shoulderDiff: 11, pelvisTilt: 3.5, atr: 7, confidence: 0.88, doctorNote: 'Cobb 角半年增长 6°，处于生长发育高峰期，建议携带本报告至骨科门诊行站立位全脊柱 X 光检查。' },
  { id: 'r4', childId: 'c1', date: '2026-06-20', source: '社区服务中心复查', cobb: 21, cobbDelta: 3, risk: 'referral', type: '胸腰弯（C 型）', shoulderDiff: 13, pelvisTilt: 4.0, atr: 8, confidence: 0.91, doctorNote: '持续增长趋势，建议遵医嘱进行支具评估，并保持每 3 个月随访。' },
  { id: 'r5', childId: 'c2', date: '2026-03-15', source: '学校集中筛查 · 一体机', cobb: 7, cobbDelta: null, risk: 'normal', type: '未见明显侧弯', shoulderDiff: 3, pelvisTilt: 1.2, atr: 2, confidence: 0.95 },
]

export interface FollowupPlan {
  childId: string
  intervalMonths: number
  nextDate: string
  daysLeft: number
  history: { date: string; title: string; status: 'done' | 'overdue' | 'upcoming'; cobb?: number }[]
}

export const followupPlan: FollowupPlan = {
  childId: 'c1',
  intervalMonths: 3,
  nextDate: '2026-09-20',
  daysLeft: 33,
  history: [
    { date: '2025-09-12', title: '首次筛查 · 学校一体机', status: 'done', cobb: 12 },
    { date: '2025-12-10', title: '第 1 次随访复查 · 社区中心', status: 'done', cobb: 15 },
    { date: '2026-03-15', title: '第 2 次随访复查 · 学校一体机', status: 'done', cobb: 18 },
    { date: '2026-06-20', title: '第 3 次随访复查 · 社区中心', status: 'done', cobb: 21 },
    { date: '2026-09-20', title: '第 4 次随访复查（待进行）', status: 'upcoming' },
  ],
}

export interface Message {
  id: string
  type: 'report' | 'reminder' | 'doctor' | 'article'
  title: string
  body: string
  time: string
  unread: boolean
}

export const messages: Message[] = [
  { id: 'm1', type: 'reminder', title: '复查提醒', body: '李明轩的第 4 次随访复查将于 2026-09-20 到期，请提前安排时间。', time: '2026-08-15 09:30', unread: true },
  { id: 'm2', type: 'report', title: '报告出具通知', body: '李明轩 2026-06-20 的筛查报告已生成，风险等级：建议转诊，点击查看详情。', time: '2026-06-20 16:42', unread: true },
  { id: 'm3', type: 'doctor', title: '医生留言', body: '王医生：孩子处于生长高峰期，Cobb 角增长较快，建议尽快门诊评估支具方案。', time: '2026-06-21 10:05', unread: false },
  { id: 'm4', type: 'article', title: '健康科普', body: '《青春期为什么侧弯容易加重？家长要知道的 3 件事》', time: '2026-06-18 20:00', unread: false },
]

export const disclaimer = '本报告由 AI 筛查系统生成，仅为筛查辅助参考，不能替代临床诊断。如有疑问请咨询专业骨科医生。'

// ============ 二期 / 三期 模拟数据 ============

// 四视图采集步骤
export interface CaptureView {
  key: string
  name: string
  hint: string
}

export const captureViews: CaptureView[] = [
  { key: 'back', name: '背面直立位', hint: '背对镜头站立，双臂自然下垂，双脚与肩同宽' },
  { key: 'front', name: '正面直立位', hint: '面对镜头站立，目视前方，双臂自然下垂' },
  { key: 'side', name: '侧面直立位', hint: '侧对镜头站立，身体正对侧方，不要前倾' },
  { key: 'adam', name: 'Adam 前屈位', hint: '双脚并拢，向前弯腰 90°，双臂自然下垂指向地面' },
]

// 医院 / 预约
export interface Hospital {
  id: string
  name: string
  level: string
  dept: string
  distance: string
  tags: string[]
  doctors: { name: string; title: string; slots: { date: string; periods: { time: string; left: number }[] }[] }[]
}

export const hospitals: Hospital[] = [
  {
    id: 'h1', name: '临港第一人民医院', level: '三甲', dept: '骨科 · 脊柱外科', distance: '2.3 km',
    tags: ['合作机构', '儿童脊柱专病门诊'],
    doctors: [
      { name: '王建国', title: '主任医师', slots: [
        { date: '08-20 周四', periods: [{ time: '上午 09:30', left: 3 }, { time: '下午 14:00', left: 5 }] },
        { date: '08-22 周六', periods: [{ time: '上午 10:00', left: 2 }] },
      ] },
      { name: '陈思远', title: '副主任医师', slots: [
        { date: '08-19 周三', periods: [{ time: '下午 15:30', left: 8 }] },
      ] },
    ],
  },
  {
    id: 'h2', name: '浦东新区儿童医院', level: '三乙', dept: '骨科', distance: '6.8 km',
    tags: ['合作机构'],
    doctors: [
      { name: '林芳', title: '主治医师', slots: [
        { date: '08-19 周三', periods: [{ time: '上午 08:30', left: 12 }, { time: '下午 13:30', left: 9 }] },
      ] },
    ],
  },
  {
    id: 'h3', name: '临港社区卫生服务中心', level: '一级', dept: '康复医学科', distance: '800 m',
    tags: ['可复查', '康复训练'],
    doctors: [
      { name: '赵敏', title: '康复治疗师', slots: [
        { date: '08-19 周三', periods: [{ time: '上午 09:00', left: 20 }] },
        { date: '08-20 周四', periods: [{ time: '上午 09:00', left: 20 }] },
      ] },
    ],
  },
]

// 康复训练
export interface RehabTask {
  id: string
  name: string
  duration: string
  target: string
  done: boolean
}

export const rehabTasks: RehabTask[] = [
  { id: 't1', name: '施罗斯呼吸训练', duration: '10 分钟', target: '胸腰弯矫正', done: true },
  { id: 't2', name: '猫式伸展', duration: '5 分钟', target: '脊柱柔韧性', done: true },
  { id: 't3', name: '侧桥支撑（左）', duration: '3 组 × 30 秒', target: '核心肌力', done: false },
  { id: 't4', name: '靠墙站姿训练', duration: '5 分钟', target: '体态矫正', done: false },
]

export const badges = [
  { name: '7 天坚持', icon: '🔥', got: true },
  { name: '早鸟达人', icon: '🌅', got: true },
  { name: '30 天勇士', icon: '🏅', got: false },
  { name: '动作标兵', icon: '⭐', got: false },
]

// 本周打卡记录（周一~周日，true=已打卡）
export const weekCheckins = [true, true, true, false, true, true, false]

// 科普文章
export interface Article {
  id: string
  title: string
  category: string
  readTime: string
  summary: string
  content: string[]
}

export const articles: Article[] = [
  {
    id: 'a1', title: '青春期为什么侧弯容易加重？家长要知道的 3 件事', category: '疾病知识', readTime: '4 分钟',
    summary: '生长发育高峰期是侧弯进展最快的阶段，了解进展机制才能抓住干预窗口。',
    content: [
      '青春期（女孩 10-14 岁、男孩 12-16 岁）是脊柱生长最快的阶段，也是侧弯最容易加重的时期。骨骼快速生长时，已有的侧弯会像"被拉长的弹簧"一样加速进展。',
      '第一件事：关注生长速度。孩子一年长高超过 6 厘米时，建议将随访间隔缩短到 3 个月一次，不要错过进展最快的窗口期。',
      '第二件事：Cobb 角增长超过 5°/年是明确的进展信号，此时不应继续"观察等待"，需要骨科医生评估是否需要支具干预。',
      '第三件事：支具治疗在骨骼成熟前才有效。Risser 征 0-2 期是支具治疗的黄金期，等骨骼成熟后支具就无法起作用了。',
    ],
  },
  {
    id: 'a2', title: '孩子确诊侧弯后，书包应该怎么背？', category: '日常护理', readTime: '3 分钟',
    summary: '单肩包、过重书包都会加重脊柱负担，正确的背负方式很关键。',
    content: [
      '侧弯孩子的脊柱已经存在力学失衡，错误的背包方式会进一步加重躯干两侧肌肉的不对称。',
      '首选双肩包，肩带调短至书包贴紧背部，重量不超过体重的 10%。避免单肩包和手提包。',
      '如果一侧肩膀明显低于另一侧，要有意识地将低侧肩带调短一点，帮助维持视觉上的平衡，但这不能替代正规治疗。',
    ],
  },
  {
    id: 'a3', title: '支具每天要戴多久？依从性决定效果', category: '治疗康复', readTime: '5 分钟',
    summary: '研究表明佩戴时间与矫正效果直接相关，22 小时以上效果最佳。',
    content: [
      '经典研究显示，支具每天佩戴 22 小时以上，侧弯进展控制率可达 90% 以上；佩戴不足 12 小时，效果明显打折。',
      '佩戴时间比佩戴年限更重要。可以利用手机 App 或智能背心记录实际佩戴时长，定期和医生核对。',
      '夏天出汗多时可以准备两件内衬换洗，皮肤出现压红超过 30 分钟不消退要联系技师调整支具。',
    ],
  },
]

// 可穿戴设备
export const wearable = {
  name: '脊护智能背心 Pro',
  model: 'SW-Vest 2代 · 尺码 M',
  connected: true,
  battery: 68,
  todayWear: '9.5 小时',
  todaySitting: '4.2 小时',
  badPostureRate: 23,
  gaitSymmetry: 94,
  // 近 7 天不良姿势占比（%）
  weekBadPosture: [
    { day: '一', value: 31 },
    { day: '二', value: 28 },
    { day: '三', value: 26 },
    { day: '四', value: 29 },
    { day: '五', value: 25 },
    { day: '六', value: 21 },
    { day: '日', value: 23 },
  ],
}
