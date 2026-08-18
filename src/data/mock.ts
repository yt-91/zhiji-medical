// 原型 · 模拟数据（演示用，信息颗粒度贴近真实业务）
export type RiskLevel = 'normal' | 'watch' | 'referral'

export const riskMeta: Record<RiskLevel, { label: string; color: string; bg: string; desc: string }> = {
  normal: { label: '低风险', color: '#07C160', bg: '#E8F8EF', desc: '暂未见明显异常，建议 12 个月后常规复查，日常注意坐姿与体育锻炼。' },
  watch: { label: '需关注', color: '#FA9D3B', bg: '#FDF3E7', desc: '存在轻度侧弯迹象，建议 6 个月内复查观察，期间加强姿态管理。' },
  referral: { label: '建议转诊', color: '#FA5151', bg: '#FDEBEB', desc: '侧弯风险较高，建议尽快至骨科门诊就诊，必要时行站立位全脊柱 X 光检查确诊。' },
}

// ============ 家庭成员 ============
export interface Child {
  id: string
  name: string
  gender: string
  age: number
  birthDate: string
  height: number // cm
  weight: number // kg
  heightGainYear: number // 近一年身高增长 cm
  boneAge: string
  risser: string
  school: string
  org: string
  consent: string
  avatarColor: string
}

export const children: Child[] = [
  {
    id: 'c1', name: '李明轩', gender: '男', age: 12, birthDate: '2014-03-22',
    height: 158, weight: 46, heightGainYear: 7.5, boneAge: '12.5 岁', risser: 'Risser 1 期',
    school: '临港第一中学 · 初一(3)班', org: '已绑定 · 临港第一中学医务室',
    consent: '知情同意书 v1.2 · 2025-09-10 签署', avatarColor: '#4C8DFF',
  },
  {
    id: 'c2', name: '李明悦', gender: '女', age: 9, birthDate: '2017-06-15',
    height: 134, weight: 29, heightGainYear: 5.2, boneAge: '9 岁', risser: 'Risser 0 期',
    school: '临港实验小学 · 三(2)班', org: '已绑定 · 临港实验小学医务室',
    consent: '知情同意书 v1.2 · 2026-03-14 签署', avatarColor: '#FA9D3B',
  },
]

// ============ 筛查报告 ============
export interface ReportQuality {
  light: number // 光照评分 0-100
  occlusion: number // 遮挡评分
  posture: number // 姿态规范评分
}

export interface Report {
  id: string
  reportNo: string
  childId: string
  date: string
  time: string
  source: string
  method: string
  device: string
  operator: string
  cobb: number
  cobbDelta: number | null
  risk: RiskLevel
  type: string
  apex: string // 顶椎位置
  shoulderDiff: number // mm
  pelvisTilt: number // deg
  atr: number // deg 躯干旋转角
  trunkShift: number // mm 躯干偏移
  confidence: number
  quality: ReportQuality
  doctorNote?: string
  doctorSign?: string
  advice: string[]
}

export const reports: Report[] = [
  {
    id: 'r1', reportNo: 'SCR-2025-0912-0347', childId: 'c1', date: '2025-09-12', time: '10:24',
    source: '学校集中筛查 · 一体机', method: '体表光学成像（四视图）', device: '脊护一体机 K-200 · 编号 LGYZ-03', operator: '校医 周慧',
    cobb: 12, cobbDelta: null, risk: 'watch', type: '胸腰弯（C 型倾向）', apex: 'T11',
    shoulderDiff: 6, pelvisTilt: 2.1, atr: 4, trunkShift: 8, confidence: 0.92,
    quality: { light: 95, occlusion: 98, posture: 91 },
    advice: ['Cobb 角 < 20°，暂无需医疗干预', '建议 6 个月后复查观察', '每日进行脊柱柔韧性训练', '注意坐姿，避免单肩背包'],
    doctorSign: 'AI 初筛 · 校医复核',
  },
  {
    id: 'r2', reportNo: 'SCR-2025-1210-0189', childId: 'c1', date: '2025-12-10', time: '15:40',
    source: '社区服务中心复查', method: '体表光学成像（四视图）', device: '脊护一体机 K-200 · 编号 LGWS-01', operator: '社区医生 吴斌',
    cobb: 15, cobbDelta: 3, risk: 'watch', type: '胸腰弯（C 型）', apex: 'T11',
    shoulderDiff: 8, pelvisTilt: 2.8, atr: 5, trunkShift: 10, confidence: 0.9,
    quality: { light: 92, occlusion: 96, posture: 88 },
    advice: ['较上次增长 3°，处于观察范围内', '继续 6 个月复查周期', '加强左侧腰背肌训练', '建议游泳、吊单杠等对称性运动'],
    doctorSign: 'AI 初筛 · 社区医生复核',
  },
  {
    id: 'r3', reportNo: 'SCR-2026-0315-0521', childId: 'c1', date: '2026-03-15', time: '09:12',
    source: '学校集中筛查 · 一体机', method: '体表光学成像（四视图）', device: '脊护一体机 K-200 · 编号 LGYZ-03', operator: '校医 周慧',
    cobb: 18, cobbDelta: 3, risk: 'referral', type: '胸腰弯（C 型）', apex: 'T11',
    shoulderDiff: 11, pelvisTilt: 3.5, atr: 7, trunkShift: 13, confidence: 0.88,
    quality: { light: 94, occlusion: 97, posture: 90 },
    doctorNote: 'Cobb 角半年增长 6°，且孩子近一年身高增长 7.5cm，正处于生长发育高峰期（Risser 1 期），是侧弯进展最快的阶段。建议携带本报告及历史记录至骨科门诊行站立位全脊柱正侧位 X 光检查，明确真实 Cobb 角并评估是否需要支具干预。',
    doctorSign: '王建国 主任医师（线上复核）',
    advice: ['已达转诊标准，建议 2 周内骨科门诊就诊', '就诊时携带全部历史筛查报告', '拍片后请将 X 光结果上传归档', '随访间隔缩短至 3 个月'],
  },
  {
    id: 'r4', reportNo: 'SCR-2026-0620-0276', childId: 'c1', date: '2026-06-20', time: '14:05',
    source: '社区服务中心复查', method: '体表光学成像（四视图）', device: '脊护一体机 K-200 · 编号 LGWS-01', operator: '社区医生 吴斌',
    cobb: 21, cobbDelta: 3, risk: 'referral', type: '胸腰弯（C 型）', apex: 'T12',
    shoulderDiff: 13, pelvisTilt: 4.0, atr: 8, trunkShift: 15, confidence: 0.91,
    quality: { light: 96, occlusion: 98, posture: 93 },
    doctorNote: '持续增长趋势，最近一次 X 光（2026-04-02）实测 Cobb 角 23°，与体表估算基本一致。已遵医嘱开始施罗斯体操训练，建议尽快完成支具评估。生长高峰期内每 3 个月随访一次，不可延长间隔。',
    doctorSign: '王建国 主任医师（线上复核）',
    advice: ['支具评估请预约脊柱外科专病门诊', '坚持每日康复训练并打卡', '3 个月后准时复查（2026-09-20）', '出现背部疼痛、麻木及时就医'],
  },
  {
    id: 'r5', reportNo: 'SCR-2026-0315-0522', childId: 'c2', date: '2026-03-15', time: '09:47',
    source: '学校集中筛查 · 一体机', method: '体表光学成像（四视图）', device: '脊护一体机 K-200 · 编号 LGSY-02', operator: '校医 郑丽',
    cobb: 7, cobbDelta: null, risk: 'normal', type: '未见明显侧弯', apex: '—',
    shoulderDiff: 3, pelvisTilt: 1.2, atr: 2, trunkShift: 4, confidence: 0.95,
    quality: { light: 97, occlusion: 99, posture: 94 },
    advice: ['本次筛查未见明显异常', '建议 12 个月后常规复查', '保持每日户外活动 1 小时以上'],
    doctorSign: 'AI 初筛 · 校医复核',
  },
]

// ============ 随访计划 ============
export interface FollowupPlan {
  childId: string
  intervalMonths: number
  nextDate: string
  daysLeft: number
  history: { date: string; title: string; status: 'done' | 'overdue' | 'upcoming'; cobb?: number; note?: string }[]
}

export const followupPlan: FollowupPlan = {
  childId: 'c1',
  intervalMonths: 3,
  nextDate: '2026-09-20',
  daysLeft: 33,
  history: [
    { date: '2025-09-12', title: '首次筛查 · 学校一体机', status: 'done', cobb: 12 },
    { date: '2025-12-10', title: '第 1 次随访复查 · 社区中心', status: 'done', cobb: 15 },
    { date: '2026-03-15', title: '第 2 次随访复查 · 学校一体机', status: 'done', cobb: 18, note: '达到转诊标准，04-02 完成 X 光确诊（23°）' },
    { date: '2026-06-20', title: '第 3 次随访复查 · 社区中心', status: 'done', cobb: 21, note: '已开始施罗斯体操训练' },
    { date: '2026-09-20', title: '第 4 次随访复查（待进行）', status: 'upcoming', note: '支具评估后首次复查，需同时评估支具佩戴情况' },
  ],
}

// ============ 消息 ============
export interface Message {
  id: string
  type: 'report' | 'reminder' | 'doctor' | 'article'
  title: string
  body: string
  time: string
  unread: boolean
}

export const messages: Message[] = [
  { id: 'm1', type: 'reminder', title: '复查提醒', body: '李明轩的第 4 次随访复查将于 2026-09-20 到期，请提前安排时间。本次为支具评估后首次复查，建议同时预约支具调整门诊。', time: '2026-08-15 09:30', unread: true },
  { id: 'm2', type: 'report', title: '报告出具通知', body: '李明轩 2026-06-20 的筛查报告已生成（编号 SCR-2026-0620-0276），风险等级：建议转诊，点击查看详情。', time: '2026-06-20 16:42', unread: true },
  { id: 'm3', type: 'doctor', title: '医生留言', body: '王建国医生：孩子处于生长高峰期，Cobb 角增长较快，X 光实测已达支具干预指征，请尽快完成支具评估，不要等下次复查。', time: '2026-06-21 10:05', unread: false },
  { id: 'm4', type: 'article', title: '健康科普', body: '《青春期为什么侧弯容易加重？家长要知道的 3 件事》已更新，建议阅读。', time: '2026-06-18 20:00', unread: false },
  { id: 'm5', type: 'reminder', title: '训练提醒', body: '李明轩已连续 2 天未完成康复训练打卡，坚持每日训练对控制进展很重要。', time: '2026-06-12 21:00', unread: false },
  { id: 'm6', type: 'report', title: 'X 光结果已归档', body: '您上传的 2026-04-02 全脊柱 X 光报告（Cobb 23°）已通过医生审核，纳入随访档案。', time: '2026-04-03 11:20', unread: false },
  { id: 'm7', type: 'reminder', title: '复查提醒', body: '李明轩的第 3 次随访复查将于 2026-06-20 到期，请提前预约社区卫生服务中心。', time: '2026-06-13 09:30', unread: false },
  { id: 'm8', type: 'article', title: '健康科普', body: '《支具每天要戴多久？依从性决定效果》—— 已开始支具评估的家庭建议阅读。', time: '2026-04-05 19:30', unread: false },
]

export const disclaimer = '本报告由 AI 筛查系统生成，基于体表光学成像估算，存在 ±5° 误差，仅为筛查辅助参考，不能替代临床诊断。如有疑问请咨询专业骨科医生。'

// ============ 居家自查 ============
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

// ============ 医院 / 预约 ============
export interface Hospital {
  id: string
  name: string
  level: string
  dept: string
  distance: string
  address: string
  phone: string
  fee: string
  tags: string[]
  doctors: { name: string; title: string; specialty: string; slots: { date: string; periods: { time: string; left: number }[] }[] }[]
}

export const hospitals: Hospital[] = [
  {
    id: 'h1', name: '临港第一人民医院', level: '三甲', dept: '骨科 · 脊柱外科', distance: '2.3 km',
    address: '浦东新区临港大道 1500 号 门诊楼 4 层', phone: '021-6828 9900', fee: '专家号 ¥50 · 普通号 ¥25',
    tags: ['合作机构', '儿童脊柱专病门诊', '报告互认'],
    doctors: [
      {
        name: '王建国', title: '主任医师', specialty: '擅长：青少年特发性脊柱侧弯、支具与手术矫治',
        slots: [
          { date: '08-20 周四', periods: [{ time: '上午 09:30', left: 3 }, { time: '下午 14:00', left: 5 }] },
          { date: '08-22 周六', periods: [{ time: '上午 10:00', left: 2 }] },
        ],
      },
      {
        name: '陈思远', title: '副主任医师', specialty: '擅长：脊柱畸形筛查评估、保守治疗方案制定',
        slots: [
          { date: '08-19 周三', periods: [{ time: '下午 15:30', left: 8 }] },
        ],
      },
    ],
  },
  {
    id: 'h2', name: '浦东新区儿童医院', level: '三乙', dept: '骨科', distance: '6.8 km',
    address: '浦东新区民生路 1200 号 门诊 3 层', phone: '021-5876 1234', fee: '专家号 ¥40 · 普通号 ¥18',
    tags: ['合作机构', '报告互认'],
    doctors: [
      {
        name: '林芳', title: '主治医师', specialty: '擅长：儿童体态异常、轻度侧弯随访管理',
        slots: [
          { date: '08-19 周三', periods: [{ time: '上午 08:30', left: 12 }, { time: '下午 13:30', left: 9 }] },
        ],
      },
    ],
  },
  {
    id: 'h3', name: '临港社区卫生服务中心', level: '一级', dept: '康复医学科', distance: '800 m',
    address: '临港新城茉莉路 88 号 2 层康复区', phone: '021-2095 6677', fee: '康复治疗 ¥30/次（医保可报销）',
    tags: ['可复查', '康复训练', '施罗斯体操认证'],
    doctors: [
      {
        name: '赵敏', title: '康复治疗师', specialty: '擅长：施罗斯体操训练、支具佩戴适应指导',
        slots: [
          { date: '08-19 周三', periods: [{ time: '上午 09:00', left: 20 }] },
          { date: '08-20 周四', periods: [{ time: '上午 09:00', left: 20 }] },
        ],
      },
    ],
  },
]

// ============ 康复训练 ============
export interface RehabTask {
  id: string
  name: string
  duration: string
  target: string
  points: string[]
  caution: string
  done: boolean
}

export const rehabTasks: RehabTask[] = [
  {
    id: 't1', name: '施罗斯呼吸训练', duration: '10 分钟', target: '胸腰弯矫正',
    points: ['侧卧位，凹侧朝上，下方垫毛巾卷支撑', '吸气时有意识将气体导向凹侧胸腔', '呼气缓慢收紧核心，每组 8-10 次呼吸'],
    caution: '训练时保持骨盆稳定，如出现头晕立即停止', done: true,
  },
  {
    id: 't2', name: '猫式伸展', duration: '5 分钟', target: '脊柱柔韧性',
    points: ['四点跪位，双手与肩同宽', '吸气塌腰抬头，呼气拱背低头', '动作缓慢连贯，配合呼吸节奏'],
    caution: '手腕疼痛者可用握拳支撑代替手掌', done: true,
  },
  {
    id: 't3', name: '侧桥支撑（左）', duration: '3 组 × 30 秒', target: '核心肌力',
    points: ['左侧卧，左肘撑地位于肩正下方', '抬起髋部使身体成一条直线', '保持 30 秒，组间休息 30 秒'],
    caution: '腰部下沉时立即停止休息，避免代偿', done: false,
  },
  {
    id: 't4', name: '靠墙站姿训练', duration: '5 分钟', target: '体态矫正',
    points: ['后脑、肩胛、臀部、小腿、脚跟五点贴墙', '收下巴，双肩放松下沉', '自然呼吸，感受脊柱延展'],
    caution: '不要憋气，膝盖保持微屈不锁死', done: false,
  },
]

export const badges = [
  { name: '7 天坚持', icon: '🔥', got: true, desc: '连续打卡 7 天' },
  { name: '早鸟达人', icon: '🌅', got: true, desc: '累计 5 次 9 点前完成训练' },
  { name: '30 天勇士', icon: '🏅', got: false, desc: '连续打卡 30 天（12/30）' },
  { name: '动作标兵', icon: '⭐', got: false, desc: '单周动作规范评分 ≥90' },
]

// 本周打卡记录（周一~周日，true=已打卡）
export const weekCheckins = [true, true, true, false, true, true, false]

// ============ 科普文章 ============
export interface Article {
  id: string
  title: string
  category: string
  readTime: string
  author: string
  reviewer: string
  publishDate: string
  reads: string
  summary: string
  content: string[]
}

export const articles: Article[] = [
  {
    id: 'a1', title: '青春期为什么侧弯容易加重？家长要知道的 3 件事', category: '疾病知识', readTime: '4 分钟',
    author: '脊护医学内容组', reviewer: '王建国 主任医师', publishDate: '2026-06-18', reads: '2.3 万',
    summary: '生长发育高峰期是侧弯进展最快的阶段，了解进展机制才能抓住干预窗口。',
    content: [
      '青春期（女孩 10-14 岁、男孩 12-16 岁）是脊柱生长最快的阶段，也是侧弯最容易加重的时期。骨骼快速生长时，已有的侧弯会像"被拉长的弹簧"一样加速进展——这就是为什么很多孩子上半年筛查还只是"需关注"，下半年就达到了干预标准。',
      '第一件事：关注生长速度。孩子一年长高超过 6 厘米时，说明进入生长高峰期，建议将随访间隔缩短到 3 个月一次。Risser 征（髂嵴骨化程度）是医生判断生长潜力的重要指标，Risser 0-1 期意味着生长空间还很大，侧弯进展风险最高。',
      '第二件事：Cobb 角增长超过 5°/年是明确的进展信号。此时不应继续"观察等待"，需要骨科医生评估是否需要支具干预。生长高峰期错过干预窗口，可能从保守治疗滑向手术治疗。',
      '第三件事：支具治疗在骨骼成熟前才有效。Risser 征 0-2 期是支具治疗的黄金期，等骨骼成熟（Risser 4-5 期）后支具就无法起作用了。所以"等等看"在青春期往往是代价最大的选择。',
    ],
  },
  {
    id: 'a2', title: '孩子确诊侧弯后，书包应该怎么背？', category: '日常护理', readTime: '3 分钟',
    author: '脊护医学内容组', reviewer: '陈思远 副主任医师', publishDate: '2026-05-30', reads: '1.8 万',
    summary: '单肩包、过重书包都会加重脊柱负担，正确的背负方式很关键。',
    content: [
      '侧弯孩子的脊柱已经存在力学失衡，错误的背包方式会进一步加重躯干两侧肌肉的不对称，加速体态恶化。',
      '首选双肩包，肩带调短至书包贴紧背部，重量不超过体重的 10%（例如 40kg 的孩子书包不超过 4kg）。书包内的重物应贴近背部放置，避免重心后坠。',
      '避免单肩包和手提包——单侧负重会迫使脊柱向对侧代偿弯曲，这正是侧弯孩子最需要避免的。',
      '如果一侧肩膀明显低于另一侧，可以有意识地将低侧肩带调短一点帮助视觉平衡，但要明确：这只是姿态管理，不能替代正规治疗。真正的矫正需要依靠康复训练和必要的支具干预。',
    ],
  },
  {
    id: 'a3', title: '支具每天要戴多久？依从性决定效果', category: '治疗康复', readTime: '5 分钟',
    author: '脊护医学内容组', reviewer: '王建国 主任医师', publishDate: '2026-04-05', reads: '3.1 万',
    summary: '研究表明佩戴时间与矫正效果直接相关，22 小时以上效果最佳。',
    content: [
      '支具治疗是 20°-40° 侧弯在骨骼成熟前的主要干预手段，但很多家长不知道：支具的效果和佩戴时间几乎成正比。',
      '经典研究（BrAIST 试验）显示：每天佩戴 22 小时以上，侧弯进展控制率可达 90% 以上；佩戴 12-18 小时，效果打对折；不足 12 小时，基本起不到阻止进展的作用。佩戴时间比佩戴年限更重要。',
      '提高依从性的实用方法：利用智能背心或支具内置传感器记录实际佩戴时长，每周和孩子一起看数据；把"戴支具"和具体场景绑定（如"到家就戴上"）而不是笼统要求。',
      '皮肤护理同样重要：夏天出汗多时准备两件棉质内衬换洗；皮肤出现压红超过 30 分钟不消退，说明支具压力过大，要联系技师调整——不要自己忍着，皮肤破溃会被迫停戴，前功尽弃。',
      '最后提醒：支具每 3-6 个月需要随生长发育调整一次，孩子在长个子，支具也必须"跟着长"。',
    ],
  },
  {
    id: 'a4', title: '无辐射筛查准确吗？和 X 光是什么关系？', category: '疾病知识', readTime: '3 分钟',
    author: '脊护医学内容组', reviewer: '陈思远 副主任医师', publishDate: '2026-03-22', reads: '1.5 万',
    summary: '体表光学筛查不能替代 X 光，但能让孩子少拍 80% 的片子。',
    content: [
      '很多家长第一次接触无辐射筛查时都会问：不拍片子，看看后背就能知道弯不弯？准确吗？',
      '体表光学筛查的原理是通过 AI 分析背部表面形态（肩高差、躯干旋转、脊柱中线偏移等）来推算脊柱内部弯曲程度。大量研究证实体表形态与 Cobb 角高度相关，但它终究是"推算"，存在约 ±5° 的误差。',
      '所以正确的定位是：筛查 ≠ 诊断。无辐射筛查的价值在于大规模、高频次、零伤害的"过滤"——让低风险孩子免于反复拍片，让高风险孩子被及时筛出来再去拍 X 光确诊。',
      '随访中两者如何配合：初筛和常规复查用无辐射方式；达到转诊标准、或需要评估治疗效果时拍 X 光。这样一个随访周期内，孩子的 X 光暴露次数通常可以减少 80% 以上。',
    ],
  },
  {
    id: 'a5', title: '施罗斯体操是什么？在家练要注意什么？', category: '治疗康复', readTime: '4 分钟',
    author: '赵敏 康复治疗师', reviewer: '王建国 主任医师', publishDate: '2026-02-14', reads: '9,800',
    summary: '国际公认的三维侧弯矫正体操，动作规范比训练时长更重要。',
    content: [
      '施罗斯体操（Schroth Method）是德国创立的脊柱侧弯三维矫正训练体系，已有百年历史，是目前国际脊柱侧弯矫形学会（SOSORT）指南推荐的保守治疗方法之一。',
      '它的核心不是"把弯的掰直"，而是通过特定的呼吸方式和肌肉激活，让凹侧塌陷的胸廓重新扩张、凸侧紧张的肌肉得到放松，从三个平面上改善脊柱排列。',
      '在家训练的三个原则：第一，先学后练——必须在认证治疗师指导下学会动作要领后再居家练习，对着镜子或视频模仿容易练错方向；第二，宁慢勿快——每个动作做到位比做够次数重要；第三，每日坚持——每天 20-30 分钟的持续训练远胜于周末突击两小时。',
      '建议每 4-6 周复诊一次，让治疗师检查动作质量并根据进展调整方案。',
    ],
  },
  {
    id: 'a6', title: '侧弯孩子能运动吗？推荐和避免的运动清单', category: '日常护理', readTime: '3 分钟',
    author: '脊护医学内容组', reviewer: '林芳 主治医师', publishDate: '2026-01-20', reads: '1.2 万',
    summary: '绝大多数运动都可以做，关键是选对类型、保持对称。',
    content: [
      '很多家长确诊后的第一反应是"让孩子少动"，这是误区。缺乏运动会导致核心肌力下降，反而不利于脊柱稳定。侧弯孩子不仅应该运动，还应该规律运动。',
      '推荐的运动：游泳（尤其是自由泳和仰泳，水中浮力减轻脊柱负荷且动作对称）、慢跑、自行车、羽毛球（双侧交替使用）、瑜伽和普拉提（在专业指导下）。',
      '需要谨慎的：单侧主导的运动（如长期单侧网球训练）建议控制在适度范围；大重量负重深蹲、举重等对脊柱轴向压力大的项目，Cobb 角较大的孩子应避免。',
      '佩戴支具的孩子：游泳和康复训练时可以取下支具，这也是每天难得的"放风"时间，建议把游泳安排在支具摘除时段。',
    ],
  },
]

// ============ 可穿戴设备 ============
export const wearable = {
  name: '脊护智能背心 Pro',
  model: 'SW-Vest 2代 · 尺码 M',
  connected: true,
  battery: 68,
  todayWear: '9.5 小时',
  todaySitting: '4.2 小时',
  badPostureRate: 23,
  gaitSymmetry: 94,
  // 今日姿态构成
  postureMix: [
    { label: '坐姿学习', hours: 4.2, color: '#4C8DFF' },
    { label: '站立活动', hours: 3.1, color: '#07C160' },
    { label: '运动锻炼', hours: 1.4, color: '#FA9D3B' },
    { label: '其他', hours: 0.8, color: '#C4C9D0' },
  ],
  // 今日各时段不良姿势占比
  todaySegments: [
    { period: '上午', value: 19 },
    { period: '下午', value: 31 },
    { period: '晚间', value: 21 },
  ],
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
  insight: '下午时段不良姿势占比（31%）明显高于上午，与午后久坐疲劳相关，建议每 45 分钟起身活动。',
}
