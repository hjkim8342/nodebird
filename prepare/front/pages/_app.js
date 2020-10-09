import 'antd/dist/antd.css';
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '../store/configureStore';

// css import시 각 화면에서 css를 import하는 것보다 공통페이지를 따로 만들어 처리한다.
// pages폴더 하위에 _app.js를 만들어 처리 (_app.js가 index.js의 부모같은느낌)
// 모든 페이지에서 공통인 것은 _app.js에 넣어주고 특정페이지에서만 사용하는 것은 Layout.js에 넣어준다.

// Html페이지에서 <head>태그를 수정하고 싶을 경우는 Next.js에서 제공하는 Head컴포넌트를 사용한다.

const NodeBird = ({ Component }) => {
  return (
    // <></>이건 왜 하는건지??
    <>
      <Head>
        <meta charSet="utf-8"></meta>
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(NodeBird);
