// import { FETCH_ACTIVE_QUESTIONARE_TITLE_AND_QUESTIONS,
//       FETCH_QUESTIONARE_TITLES_ERROR,
//       RETRY_HANDLER, ANSWER, 
//       IS_QUESTIONNAIRE_FINISHED, 
//       NEXT_QUESTION,
//       REPEAT_HANDLER
//      } from '../actions/actionTypes'

// // const intialState = {
// //     results: {}, //{[id]: success error}
// //     testId: props.location.pathname.split('/')[2],
// //     isFinished: false,
// //     questionsLoad: false,
// //     activeQuestion: 0,
// //     answerState: null,// {[answerId: 'success' or 'error']}
// //     questionnaireTitle: '',
// //     key: null,
// //     questions: []
// // }

// export default function mainQuizReducer(state = intialState, action) {
//     switch (action.type) {
//         case FETCH_ACTIVE_QUESTIONARE_TITLE_AND_QUESTIONS: {
//             return {
//                 ...state,
//                 questionsLoad: true,
//                 questionnaireTitle: action.questionnaireTitle,
//                 questions: action.questions
//             }
//         }
//         case ANSWER: {
//             return {
//                 ...state,
//                 answerState: answerState.push(action.answerState),
//                 results: action.results
//             }
//         }

//         case IS_QUESTIONNAIRE_FINISHED: {
//             return {
//                 ...state,
//                 isFinished: action.isFinished

//             }
//         }
//         case NEXT_QUESTION: {
//             return {
//                 ...state,
//                 activeQuestion: activeQuestion + 1,
//                 answerState: null
//             }
//         }
//         case FETCH_QUESTIONARE_TITLES_ERROR: {
//             return {
//                 ...state
//             }
//         }
//         case RETRY_HANDLER: {
//             return {
//                 ...state,
//                 results: {},
//                 isFinished: false,
//                 activeQuestion: 0,
//                 answerState: null
//             }
//         }
//         case REPEAT_HANDLER: {
//             return {
//                 ...state,
//                 guestScreen: true,
//                 questionnaireTitle: null,
//                 questions: []
//             }
//         }
//         default:
//             return state
//     }
// }