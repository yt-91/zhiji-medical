import { useState } from 'react'
import { CalendarClock, FileText, Home, User } from 'lucide-react'
import LoginPage from '@/pages/LoginPage'
import HomePage from '@/pages/HomePage'
import ReportsPage from '@/pages/ReportsPage'
import ReportDetailPage from '@/pages/ReportDetailPage'
import FollowupPage from '@/pages/FollowupPage'
import ComparePage from '@/pages/ComparePage'
import MessagesPage from '@/pages/MessagesPage'
import ProfilePage from '@/pages/ProfilePage'
import SelfCheckPage from '@/pages/SelfCheckPage'
import AppointmentPage from '@/pages/AppointmentPage'
import RehabPage from '@/pages/RehabPage'
import { ArticlesPage, ArticleDetailPage } from '@/pages/ArticlesPage'
import WearablePage from '@/pages/WearablePage'

type Tab = 'home' | 'reports' | 'followup' | 'profile'
type Route =
  | { name: 'tab' }
  | { name: 'report'; id: string }
  | { name: 'compare' }
  | { name: 'messages' }
  | { name: 'selfcheck' }
  | { name: 'appointment' }
  | { name: 'rehab' }
  | { name: 'articles' }
  | { name: 'article'; id: string }
  | { name: 'wearable' }

const tabs: { key: Tab; label: string; icon: typeof Home }[] = [
  { key: 'home', label: '首页', icon: Home },
  { key: 'reports', label: '报告', icon: FileText },
  { key: 'followup', label: '随访', icon: CalendarClock },
  { key: 'profile', label: '我的', icon: User },
]

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [tab, setTab] = useState<Tab>('home')
  const [route, setRoute] = useState<Route>({ name: 'tab' })
  const [childIndex, setChildIndex] = useState(0)

  const switchChild = () => setChildIndex((i) => (i + 1) % 2)
  const goTab = (t: Tab) => {
    setTab(t)
    setRoute({ name: 'tab' })
  }
  const back = () => setRoute({ name: 'tab' })
  const go = (r: Route) => () => setRoute(r)

  return (
    // 桌面端显示手机外框，移动端全屏
    <div className="flex min-h-screen items-center justify-center bg-[#E9EAEE] sm:py-6">
      <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#F6F7F9] sm:h-[820px] sm:max-h-[92vh] sm:w-[400px] sm:rounded-[40px] sm:border-[10px] sm:border-gray-900 sm:shadow-2xl">
        {/* 微信小程序胶囊栏 */}
        <div className="flex h-11 shrink-0 items-center justify-between bg-white px-4">
          <span className="text-[13px] font-medium text-gray-800">脊护随行</span>
          <div className="flex items-center gap-3 rounded-full border border-gray-200 px-3 py-1">
            <span className="flex gap-0.5">
              <i className="h-1 w-1 rounded-full bg-gray-700" />
              <i className="h-1 w-1 rounded-full bg-gray-700" />
              <i className="h-1 w-1 rounded-full bg-gray-700" />
            </span>
            <span className="h-3.5 w-px bg-gray-200" />
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border-[1.5px] border-gray-700">
              <i className="h-1 w-1 rounded-full bg-gray-700" />
            </span>
          </div>
        </div>

        {/* 内容区 */}
        <div className="flex-1 overflow-y-auto">
          {!loggedIn ? (
            <LoginPage onLogin={() => setLoggedIn(true)} />
          ) : route.name === 'report' ? (
            <ReportDetailPage reportId={route.id} onBack={back} />
          ) : route.name === 'compare' ? (
            <ComparePage onBack={back} onGoAppointment={go({ name: 'appointment' })} />
          ) : route.name === 'messages' ? (
            <MessagesPage onBack={back} />
          ) : route.name === 'selfcheck' ? (
            <SelfCheckPage onBack={back} onDone={go({ name: 'tab' })} />
          ) : route.name === 'appointment' ? (
            <AppointmentPage onBack={back} />
          ) : route.name === 'rehab' ? (
            <RehabPage onBack={back} />
          ) : route.name === 'articles' ? (
            <ArticlesPage onBack={back} onOpen={(id) => setRoute({ name: 'article', id })} />
          ) : route.name === 'article' ? (
            <ArticleDetailPage id={route.id} onBack={go({ name: 'articles' })} />
          ) : route.name === 'wearable' ? (
            <WearablePage onBack={back} />
          ) : tab === 'home' ? (
            <HomePage
              childIndex={childIndex}
              onSwitchChild={switchChild}
              onOpenReport={(id) => setRoute({ name: 'report', id })}
              onGoFollowup={() => goTab('followup')}
              onGoReports={() => goTab('reports')}
              onGoMessages={go({ name: 'messages' })}
              onGoSelfCheck={go({ name: 'selfcheck' })}
              onGoAppointment={go({ name: 'appointment' })}
              onGoRehab={go({ name: 'rehab' })}
              onGoArticles={go({ name: 'articles' })}
              onGoWearable={go({ name: 'wearable' })}
            />
          ) : tab === 'reports' ? (
            <ReportsPage childIndex={childIndex} onOpenReport={(id) => setRoute({ name: 'report', id })} />
          ) : tab === 'followup' ? (
            <FollowupPage childIndex={childIndex} onOpenCompare={go({ name: 'compare' })} />
          ) : (
            <ProfilePage childIndex={childIndex} onSwitchChild={switchChild} />
          )}
        </div>

        {/* 底部 Tab 栏 */}
        {loggedIn && route.name === 'tab' && (
          <div className="flex shrink-0 border-t border-gray-100 bg-white pb-1 pt-1.5">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => goTab(key)} className="flex flex-1 flex-col items-center gap-0.5 py-1">
                <Icon size={21} color={tab === key ? '#07C160' : '#9AA0A6'} strokeWidth={tab === key ? 2.4 : 2} />
                <span className={`text-[10px] ${tab === key ? 'font-medium text-[#07C160]' : 'text-gray-400'}`}>{label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
