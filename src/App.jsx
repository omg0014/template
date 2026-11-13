import { Route, Routes, useParams } from 'react-router'
import { MotionConfig } from 'motion/react'
import { APP_CONFIG } from './config/app.config.js'
import { TransitionProvider } from './app/TransitionProvider.jsx'
import { SelectorPage } from './app/SelectorPage.jsx'
import { TemplateRoute, TEMPLATE_KEYS } from './app/TemplateRoute.jsx'
import { NotFound } from './app/NotFound.jsx'

function TemplateParamRoute() {
  const { template } = useParams()
  return TEMPLATE_KEYS.includes(template) ? <TemplateRoute templateKey={template} showcase /> : <NotFound />
}

export default function App() {
  const single = APP_CONFIG.mode === 'single'

  return (
    <MotionConfig reducedMotion="user">
      <TransitionProvider>
        <Routes>
          {single ? (
            <Route path="/" element={<TemplateRoute templateKey={APP_CONFIG.singleTemplate} cafeId={APP_CONFIG.singleCafe} />} />
          ) : (
            <>
              <Route path="/" element={<SelectorPage />} />
              <Route path="/:template" element={<TemplateParamRoute />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TransitionProvider>
    </MotionConfig>
  )
}
