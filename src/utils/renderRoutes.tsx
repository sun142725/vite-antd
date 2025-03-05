import React from 'react';
import { useRoutes, RouteObject, Navigate, Route } from 'react-router-dom';

type RouteConfig = RouteObject & {
  key?: string;
  children?: RouteConfig[];
  component?: React.ElementType;
  menuCode?: string;
  redirect?: string;
};

function getCompatProps(props: { match?: { params: any }; params?: any }) {
  const compatProps: any = {};
  if (props?.match?.params && !props.params) {
    compatProps.params = props.match.params;
  }
  return compatProps;
}

function renderRoutes(routes: RouteConfig[], extraProps = {}): React.ReactElement | null {
  if (!routes) return null;

  const mappedRoutes = routes.map(route => {
    const Component: any = route.Component;
    const compatProps = getCompatProps({ ...extraProps });
    const newProps = { ...extraProps, ...compatProps, args: { route } };
    
    if (route.redirect) {
      return <Route 
        key={route.path}
        path={route.path}
        element={<Navigate to={route.redirect} replace />}
      />;
    }

    // if (route.menuCode) {
    //   // 假设这里有权限检查逻辑，可替换为你的权限校验方式
    //   const hasAuth = true; // 这里应使用你的权限校验逻辑
    //   if (!hasAuth) return { path: route.path, element: <Navigate to="/unauthorized" replace /> };
    // }

    return (
      <Route
        key={route.path}
        path={route.path}
        element={Component ? <Component {...newProps} /> : undefined}
      >
        {route.children ? renderRoutes(route.children, extraProps) : null}
      </Route>
    );
  });

  return <>{mappedRoutes}</>;
}

export default renderRoutes;