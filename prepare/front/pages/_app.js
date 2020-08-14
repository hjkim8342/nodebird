import 'antd/dist/antd.css';
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '../store/configureStore';

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
