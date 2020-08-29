export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '제로초',
      },
      content: '첫번째 게시글 #해시태그 #익스프레스',
      Images: [{ src: '' }, { src: '' }, { src: '' }],
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
  imagePath: [],
  postAdded: false,
};

const ADD_POST = 'ADD_POST';
export const addPost = {
  type: ADD_POST,
};

const dummyPost = [
  {
    id: 2,
    User: {
      id: 2,
      nickname: 'KiRil',
    },
    content: '두번째 게시글',
    Images: [],
    Comments: [],
  },
];

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
