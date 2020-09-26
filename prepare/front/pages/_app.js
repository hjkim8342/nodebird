import 'antd/dist/antd.css';
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '../store/configureStore';
import withReduxSaga from 'next-redux-saga';

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

export default wrapper.withRedux(withReduxSaga(NodeBird));
// 사가 연결을 위해 withReduxSaga로 감쌈
