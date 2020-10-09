import React from 'react';
import PropTypes from 'prop-types';
import { List, Button, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';

const FollowList = ({ header, data }) => {
  return (
    // 현재는 리스트에 inline으로 설정정보를 넣었지만 실제 개발시에는 리렌더링 대비해 이렇게 하지 말것!
    <List
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <Button>더 보기</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;

// 위처럼 태그에 인라인으로 스타일 객체를 넣어 스타일을 줄 수 있다.
// 하지만 객체인 경우 모든 객체는 새로 만들어지므로 실제로는 변화가 없어도 변화가 있는걸로 인식하게 됨
// 그래서 인라인스타일 적용시 매번 리렌더링 된다.
// 성능상 문제가 크게 없으면 인라인스타일을 사용해도되지만 추후 성능에 문제가 생긴다면 스타일을 따로 적용해줘야함
// 여기서는 styled-components 사용