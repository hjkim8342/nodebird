import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div>
      <Menu mode="horizontal">
        <MenuItem>
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </MenuItem>
        <MenuItem>
          <SearchInput enterButton />
        </MenuItem>
        <MenuItem>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </MenuItem>
      </Menu>
      {/* 한줄에 대한 공간 설정 / 모바일은 col1~3이 한줄씩 다 쓰는것 데스크탑일경우 col1이 25% col2가 50% col3이 25% 씀 */}
      {/* xs는 모바일 sm은 테블릿 md는 desktop / 엔트디자인은 가로는 총 24등분임 */}
      {/* gutter는 컬럼 사이의 간격 좌우의 px로 들어감 */}
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="http://www.archeve.co.kr"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made By KiRil
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
