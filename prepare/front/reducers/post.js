import shortid from 'shortid'

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
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

// 동적 액션 크리에이터 : 액션을 그때 그때 생성해주는 크리에이터
export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

// npm i shortid (랜덤한 아이디 생성 가능)
// npm i faker (더미데이터 생성 가능)

const dummyPost = (data) => ({
    id: shortid.generate(),
    User: {
      id: 2,
      nickname: 'yunj',
    },
    content: data,
    Images: [],
    Comments: [],

})

const dummyComment = (data ) => ({
    id: shortid.generate(),
    User: {
      id: 2,
      nickname: 'yunj',
    },
    content: data,
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS:{
        // 불변성을 위한 로직
        // 불변성의 핵심은 바뀌는 것만 새로운 객체로 만들고 나머지 객체는 참조로 유지해줘야함
        const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
        const post = {...state.mainPosts[postIndex]};
        postComments = [dummyComment(action.data.content), ...post.Comments];
        const mainPosts = [...state.mainPosts];
        mainPosts[postIndex] = post;
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false, 
        addCommentError: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
