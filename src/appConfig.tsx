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

const loginPath = "/user/login";

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

export const layout = ({ initialState, setInitialState }) => ({
  actionsRender: () => [
    <Question key="doc" />,
    <span>自定义操作</span>
  ],
  avatarProps: {
    src: initialState?.currentUser?.avatar,
    title: <AvatarName />,
    render: (_, avatarChildren) => (
      <AvatarDropdown>{avatarChildren}11</AvatarDropdown>
    ),
  },
  footerRender: () => <Footer />,
  onPageChange: () => {
    if (!initialState?.currentUser) {
      window.location.href = loginPath;
    }
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
        settings={initialState?.settings}
        onSettingChange={(settings) => {
          setInitialState((preState: any) => ({ ...preState, settings }));
        }}
      />
    </>
  ),
});

export const request = {
  ...errorConfig,
};
