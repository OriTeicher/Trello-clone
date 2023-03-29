// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService, colorItems } from './util.service.js'
import { userService } from './user.service.js'
import { unsplashService } from './unsplash.service.js'

const STORAGE_KEY = 'board'
const BASE_URL = 'board/'
export const boardService = {
  query,
  getById,
  save,
  remove,
  getEmptyBoard,
  addBoardMsg,
  getEmptyGroup,
  getEmptyTask,
  getDefaultEmptyLabels,
  getDefaultEmptyLabel,
  getDefaultMembers,
  colorItems,
}
window.cs = boardService

async function query(filterBy = { txt: '' }) {
  let boards = await httpService.get(BASE_URL, filterBy)
  if (!boards || !boards.length) boards = _createBoards()
  return boards

  // var boards = await storageService.query(STORAGE_KEY)
  // if (filterBy.txt) {
  //     const regex = new RegExp(filterBy.txt, 'i')
  //     boards = boards.filter(board => regex.test(board.vendor) || regex.test(board.description))
  // }
  // if (filterBy.price) {
  //     boards = boards.filter(board => board.price <= filterBy.price)
  // }
  // return boards
}
function getById(boardId) {
  // return storageService.get(STORAGE_KEY, boardId)
  return httpService.get(`board/${boardId}`)
}

async function remove(boardId) {
  // await storageService.remove(STORAGE_KEY, boardId)
  return httpService.delete(`board/${boardId}`)
}
async function save(board) {
  console.log('remote board service', board)
  var savedBoard
  if (board._id) {
    // savedBoard = await storageService.put(STORAGE_KEY, board)
    savedBoard = await httpService.put(`board/${board._id}`, board)
  } else {
    // Later, owner is set by the backend
    // board.owner = userService.getLoggedinUser()
    // savedBoard = await storageService.post(STORAGE_KEY, board)
    savedBoard = await httpService.post('board', board)
  }
  return savedBoard
}

async function addBoardMsg(boardId, txt) {
  const savedMsg = await httpService.post(`board/${boardId}/msg`, { txt })
  return savedMsg
}

function getEmptyBoard(
  title = '',
  isStarred = false,
  labels = [],
  createdBy = {},
  style = {},
  groups = [getEmptyGroup()]
) {
  return {
    title,
    isStarred,
    style,
    labels: getDefaultEmptyLabels(),
    createdBy,
    groups,
  }
}

function getEmptyGroup(title = '', archivedAt = null, tasks = [], style = {}) {
  return {
    id: utilService.makeId(),
    title,
    type: 'container',
    props: {
      orientation: 'vertical',
      className: 'card-container',
    },
    archivedAt,
    tasks,
    style,
  }
}

function getEmptyTask(
  title = '',
  description = '',
  labels = [],
  members = [],
  cover = null
) {
  return {
    id: utilService.makeId(),
    title,
    cover,
    type: 'draggable',
    props: {
      className: 'card',
    },
    description,
    labels,
    members,
  }
}

function getDefaultEmptyLabels() {
  return [
    {
      id: utilService.makeId(),
      title: '',
      color: '#d6ecd2',
    },
    {
      id: utilService.makeId(),
      title: '',
      color: '#faf3c0',
    },
    {
      id: utilService.makeId(),
      title: '',
      color: '#fce6c6',
    },
    {
      id: utilService.makeId(),
      title: '',
      color: '#f5d3ce',
    },
    {
      id: utilService.makeId(),
      title: '',
      color: '#eddbf4',
    },
    {
      id: utilService.makeId(),
      title: '',
      color: '#bcd9ea',
    },
    {
      id: utilService.makeId(),
      title: '',
      color: '#bdecf3',
    },
    {
      id: utilService.makeId(),
      title: '',
      color: '#dfe1e6',
    },
  ]
}

function getDefaultEmptyLabel() {
  return {
    id: '',
    title: ' ',
    color: '#d6ecd2',
  }
}

function getDefaultMembers() {
  return [
    {
      _id: 'u101',
      fullname: 'Yohai Korem',
      imgUrl: '',
    },
    {
      _id: 'u102',
      fullname: 'Ori Krispel',
      imgUrl: '',
    },
    {
      _id: 'u103',
      fullname: 'Ori Teicher',
      imgUrl: '',
    },
  ]
}

function getRandomTask(
  title = utilService.getRandomTaskTitles(),
  description = utilService.getRandomTaskDesc(),
  labels = getRandomLabels()
) {
  let res = getEmptyTask(
    title,
    description,
    [labels],
    [getDefaultMembers()[utilService.getRandomIntInclusive(0, 2)]]
  )
  return res
}

function _getBoardRandomGradient() {
  const colorItems = [
    'linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)',
    'linear-gradient(to right,#824de4,#080c3e)',
    'linear-gradient(143deg, #a2bc12, #53b8e1)',
    'linear-gradient(331deg, #ad8739, #e35493)',
    'linear-gradient(230deg, #859d0d, #87d9ab)',
    'linear-gradient(187deg, #b36738, #d51d90)',
    'linear-gradient(124deg, #919781, #c67733)',
  ]
  return colorItems[utilService.getRandomIntInclusive(0, 6)]
}

function _getBoardRandomColor() {
  const colorItems = [
    '#fad29c',
    '#efb3ab',
    '#5ba4cf',
    '#f5dd29',
    '#5aac44',
    'gray',
  ]
  return colorItems[utilService.getRandomIntInclusive(0, 5)]
}

function getRandomLabel(idx = utilService.getRandomIntInclusive()) {
  return {
    id: utilService.makeId(),
    title: utilService.getRandomLabelTitle(),
    color: colorItems[idx],
  }
}

function getRandomLabels(amount = 4) {
  let labels = []
  for (let i = 0; i < amount; i++) {
    labels.push(getRandomLabel(i))
  }
  return labels
}

async function _createBoards(amount = 20) {
  let boards = []
  for (let i = 0; i < amount; i++) {
    boards.push(await _createBoard(utilService.getRandomProjectNames(i)))
  }

  return boards
}

function randomStarBoard() {
  const num = utilService.getRandomIntInclusive(1, 4)
  if (num === 4) return true
  return false
}

async function _createBoard(
  title = 'Robot dev proj',
  labels = getRandomLabels(8)
) {
  let board = {
    title,
    isStarred: randomStarBoard(),
    archivedAt: 1589983468418,
    createdBy: {
      _id: 'u101',
      fullname: 'Yohai Korem',
      imgUrl: 'http://some-img',
    },
    style: {
      backgroundColor: _getBoardRandomColor(),
      imgUrls: unsplashService.getRandomImg(),
      gradient: _getBoardRandomGradient(),
    },
    labels,
    members: getDefaultMembers(),
    groups: [
      {
        id: utilService.makeId(),
        title: 'Group 1',
        type: 'container',
        props: {
          orientation: 'vertical',
          className: 'card-container',
        },
        archivedAt: 1589983468418,
        tasks: [
          getRandomTask(
            undefined,
            utilService.getRandomTaskDesc(),
            labels[utilService.getRandomIntInclusive(0, labels.length)]
          ),
          getRandomTask(
            undefined,
            utilService.getRandomTaskDesc(),
            labels[utilService.getRandomIntInclusive(0, labels.length)]
          ),
        ],
        style: {},
      },
      {
        id: utilService.makeId(),
        title: 'Group 2',
        type: 'container',
        props: {
          orientation: 'vertical',
          className: 'card-container',
        },
        tasks: [
          getRandomTask(
            undefined,
            utilService.getRandomTaskDesc(),
            labels[utilService.getRandomIntInclusive(0, labels.length)]
          ),
          {
            id: utilService.makeId(),
            title: 'Help me',
            status: 'in-progress', // monday
            priority: 'high',
            description: 'description',
            type: 'draggable',
            props: {
              className: 'card',
            },
            loading: false,
            comments: [
              {
                id: 'ZdPnm',
                txt: 'also @yaronb please CR this',
                createdAt: 1590999817436,
                byMember: {
                  _id: 'u101',
                  fullname: 'Yohai Korem',
                  imgUrl:
                    'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              },
            ],
            checklists: [
              {
                id: utilService.makeId(),
                title: 'Checklist',
                todos: [
                  {
                    id: utilService.makeId(),
                    title: 'To Do 1',
                    isDone: false,
                  },
                ],
              },
            ],
            memberIds: ['u101'],
            labelIds: ['l101', 'l102'],
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'yoyo',
              fullname: 'Yohai Korem',
              imgUrl:
                'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            style: {
              bgColor: '#26de81',
            },
          },
        ],
        style: {},
      },
    ],
    activities: [
      {
        id: 'a101',
        txt: 'Changed Color',
        createdAt: 154514,
        byMember: {
          _id: 'u101',
          fullname: 'Yohai Korem',
          imgUrl: 'http://some-img',
        },
        task: {
          id: 'c101',
          title: 'Replace Logo',
        },
      },
    ],
    cmpsOrder: ['status-picker', 'member-picker', 'date-picker'],
  }
  board = await save(board)
  return board
}
