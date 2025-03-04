import * as React from 'react'
import { ConfigProvider, Modal, Notification, message } from '@wemo-ui/klein'
import cloneDeep from 'lodash/cloneDeep'
import { History } from 'history'
import { getPlainNode } from '@/utils'
import { getNavData } from '@/routers'
import renderRoutes from '@/utils/renderRoutes'
import { routerRedux } from 'dva'

const Router = routerRedux.ConnectedRouter

export interface RouterConfigParams {
  history: History
  app: any
}

// 累加路由path 添加/app/xxx/:bosId/:key/ 这个前缀
function getRouteData(navData: any[], path: string) {
  if (!navData.some(item => item.layout === path) || !navData.filter(item => item.layout === path)[0].children) {
    return null
  }
  const route = cloneDeep(navData.filter(item => item.layout === path))
  const nodeList = getPlainNode(route, route[0].path)

  return nodeList
}

function RouterConfig({ history, app }: RouterConfigParams) {
  const navData = getNavData(app)
  const newRoutes = getRouteData(navData, 'BasicLayout') as any

  const mountTarget = (document.querySelector(`.${PACKAGE_NAME}`) || document.body) as HTMLElement

  const getContainer = () => mountTarget

  Modal.config({
    getContainer
  })

  message.config({
    getContainer
  })

  Notification.config({
    getContainer
  })

  return (
    <ConfigProvider getPopupContainer={() => mountTarget}>
      {/* <Router history={history}>{renderRoutes(newRoutes, {})}</Router> */}
    </ConfigProvider>
  )
}

export default RouterConfig
