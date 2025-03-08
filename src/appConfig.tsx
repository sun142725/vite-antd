import { Link } from "react-router-dom";
import { LinkOutlined } from '@ant-design/icons';
import {
  Footer,
  Question,
  AvatarDropdown,
  AvatarName,
} from "@/components"
import { SettingDrawer } from "@ant-design/pro-components";
import { errorConfig } from "./requestErrorConfig";


export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      return { name: "红红", avatar: "https://example.com/avatar.png" };
    } catch (error) {
      console.error("获取用户信息失败", error);
    }
    return undefined;
  };

  const currentUser = await fetchUserInfo();
  return { currentUser, fetchUserInfo };
}

export const layout = () => ({
  actionsRender: () => [
    <Question key="doc" />,
    <span>自定义操作</span>
  ],
  avatarProps: {
    src: 'https://example.com/avatar.png',
    title: <AvatarName />,
    render: (_: any, avatarChildren: any) => (
      <AvatarDropdown>{avatarChildren}</AvatarDropdown>
    ),
  },
  footerRender: () => <Footer />,
  onPageChange: () => {
    // if (false) { // 判断是否登录
    //   window.location.href = loginPath;
    // }
  },
  bgLayoutImgList: [
    {
      src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr",
      left: 85,
      bottom: 100,
      height: "303px",
    },
    {
      src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr",
      bottom: -68,
      right: -45,
      height: "303px",
    },
    {
      src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr",
      bottom: 0,
      left: 0,
      width: "331px",
    },
  ],
  links: [
    <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
      <LinkOutlined />
      <span>更新日志</span>
    </Link>,
  ],
  childrenRender: (children: any) => (
    <>
      {children}33
      <SettingDrawer
        disableUrlParams
        enableDarkTheme
        // settings={}
        onSettingChange={() => {
          // setInitialState((preState: any) => ({ ...preState, settings }));
        }}
      />
    </>
  ),
});

export const request = {
  ...errorConfig,
};
