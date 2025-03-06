import { QuestionCircleOutlined } from '@ant-design/icons';

export type SiderTheme = 'light' | 'dark';

export const SelectLang = () => {
  return (
    <div>2222</div>
  );
};

export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open('https://pro.ant.design/docs/getting-started');
      }}
    >
      <QuestionCircleOutlined />
    </div>
  );
};
