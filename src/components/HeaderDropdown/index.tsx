import { Dropdown } from 'antd';
import type { DropDownProps } from 'antd/es/dropdown';
import React from 'react';
// import { createStyles } from 'antd-style';
import classNames from 'classnames';

const useStyles = () => {
  return {
    dropdown: {
      [`@media screen and (max-width: 576px)`]: {
        width: '100%',
      },
    },
  };
};

export type HeaderDropdownProps = {
  overlayClassName?: string;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
} & Omit<DropDownProps, 'overlay'>;

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ overlayClassName: cls, ...restProps }) => {
  const styles = useStyles();
  return <Dropdown overlayClassName={classNames(styles.dropdown, cls)} {...restProps} />;
};

export default HeaderDropdown;
