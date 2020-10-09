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
  // useSelector는 react-redux통해 사용 (react-redux는 react와 redux를 연결해준다.)
  // isLoggedIn 변경시 알아서 rerendering된다.
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
          <SearchInput />
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
            Made By ZeroCho
          </a>
        </Col>
      </Row>
    </div>
  );
};

// antd의 Row와 Col을 import해 반응형그리드를 그릴 수 있다.
// 그리드 사용시 가로먼저 나누고 세로를 나눈다.
// xs:모바일, sm:태블릿, md:작은 데스크탑
// gutter란? Row에서 해당 속성 사용시 여백을 주는것 (컬럼끼리 딱 붙는 것을 방지한다.)

// 리액트에서 배열로 JSX사용시는 내부에 반드시 key속성이 필요하다.

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
