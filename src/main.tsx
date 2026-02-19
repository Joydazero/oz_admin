import { createRoot } from 'react-dom/client'

import App from '@/app/App'
import { worker } from '@/mocks/browser'
import './index.css'

async function enableMocking() {
//   if (!import.meta.env.DEV) return

//   if (import.meta.env.VITE_USE_MOCK !== 'true') return

//   return worker.start({ onUnhandledRequest: 'bypass' })
// }


  // 개발 환경이거나, 혹은 Vercel 배포 환경이지만 MOCK을 명시적으로 사용하겠다고 한 경우
  const isVercel = window.location.hostname.includes('vercel.app');
  const useMock = import.meta.env.VITE_USE_MOCK === 'true';

  if (import.meta.env.DEV || (isVercel && useMock)) {
    return worker.start({ 
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js' // 경로를 명시해주는 것이 안전합니다.
      }
    });
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(<App />)
})
