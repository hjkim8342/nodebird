export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '제로초',
      },
      content: '첫번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          src: 'https://img.hankyung.com/photo/201905/03.19618684.1.jpg',
        },
        {
          src:
            'https://upload.wikimedia.org/wikipedia/commons/a/a4/170414_%EB%AE%A4%EC%A7%81%EB%B1%85%ED%81%AC_%EC%B6%9C%EA%B7%BC%EA%B8%B8_%EC%9C%A0%EC%95%84_%281%29.jpg',
        },
        {
          src:
            'https://image.fmkorea.com/files/attach/new/20180319/486616/871073861/984829800/a95eeb05edd92db0554c8ce54cc82f5a.jpg',
        },
      ],
      Comments: [
        {
          User: {
            id: 2,
            nickname: 'Kiril',
          },
          content: '영상보는중',
        },
        {
          User: {
            id: 3,
            nickname: 'hero',
          },
          content: 'ㅇㅇㅇ',
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = 'ADD_POST';
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  User: {
    id: 2,
    nickname: 'KiRil',
  },
  content: '두번째 게시글',
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
