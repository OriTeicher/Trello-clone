import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board'
export const boardService = {
  query,
  getById,
  save,
  remove,
  getEmptyBoard,
  getEmptyGroup,
  getEmptyTask,
  addBoardMsg,

  queryGroups,
  getGroupById,
  saveGroup,
  removeGroup,
}
window.cs = boardService

async function query(filterBy = { txt: '', price: 0 }) {
  var boards = await storageService.query(STORAGE_KEY)
  if (!boards || !boards.length) {
    _createBoard()
  }

  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    boards = boards.filter(
      (board) => regex.test(board.vendor) || regex.test(board.description)
    )
  }
  if (filterBy.price) {
    boards = boards.filter((board) => board.price <= filterBy.price)
  }
  return boards
}

function getById(boardId) {
  return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
  await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
  var savedBoard
  if (board._id) {
    savedBoard = await storageService.put(STORAGE_KEY, board)
  } else {
    // Later, owner is set by the backend
    board.owner = userService.getLoggedinUser()
    savedBoard = await storageService.post(STORAGE_KEY, board)
  }
  return savedBoard
}

async function addBoardMsg(boardId, txt) {
  // Later, this is all done by the backend
  const board = await getById(boardId)
  if (!board.msgs) board.msgs = []

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  board.msgs.push(msg)
  await storageService.put(STORAGE_KEY, board)

  return msg
}

function getEmptyBoard(
  title = '',
  isStarred = false,
  labels = [],
  createdBy = {},
  groups = [getEmptyGroup()]
) {
  return {
    _id: '',
    title,
    isStarred,
    labels,
    createdBy,
    groups,
  }
}

// GROUPS:

async function queryGroups(boardId, filterBy = { txt: '' }) {
  let boardWithGroups = await getById(boardId)
  let groups = boardWithGroups.groups
  if (!groups) return

  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    groups = groups.filter(
      (group) => regex.test(group.vendor) || regex.test(group.description)
    )
  }
  // if (filterBy.price) {
  //   groups = groups.filter((group) => group.price <= filterBy.price)
  // }
  return groups
}

function getGroupById(boardId) {
  return storageService.get(STORAGE_KEY, boardId)
}

async function removeGroup(boardId) {
  await storageService.remove(STORAGE_KEY, boardId)
}

async function saveGroup(group) {
  var savedGroup
  if (group._id) {
    savedGroup = await storageService.put(STORAGE_KEY, group)
  } else {
    // Later, owner is set by the backend
    group.owner = userService.getLoggedinUser()
    savedGroup = await storageService.post(STORAGE_KEY, group)
  }
  return savedGroup
}

function getEmptyGroup(title = '', archivedAt = null, tasks = [], style = {}) {
  return {
    id: '',
    title: '',
    archivedAt: null,
    tasks: [getEmptyTask()],
    style: {},
  }
}

function getEmptyTask(
  title = '',
  status = '',
  priority = '',
  description = ''
) {
  return {
    id: '',
    title: '',
    status: '',
    priority: '',
    description: '',
  }
}

async function _createBoard() {
  let board = {
    _id: '',
    title: 'Robot dev proj',
    isStarred: false,
    archivedAt: 1589983468418,
    createdBy: {
      _id: 'u101',
      fullname: 'Abi Abambi',
      imgUrl: 'http://some-img',
    },
    style: {},
    labels: [
      {
        id: 'l101',
        title: 'Done',
        color: '#61bd4f',
      },
      {
        id: 'l102',
        title: 'Progress',
        color: '#61bd33',
      },
    ],
    members: [
      {
        _id: 'u101',
        fullname: 'Tal Tarablus',
        imgUrl: 'https://www.google.com',
      },
    ],
    groups: [
      {
        id: 'g101',
        title: 'Group 1',
        archivedAt: 1589983468418,
        tasks: [
          {
            id: 'c101',
            title: 'Replace logo',
          },
          {
            id: 'c102',
            title: 'Add Samples',
          },
        ],
        style: {},
      },
      {
        id: 'g102',
        title: 'Group 2',
        tasks: [
          {
            id: 'c103',
            title: 'Do that',
            archivedAt: 1589983468418,
          },
          {
            id: 'c104',
            title: 'Help me',
            status: 'in-progress', // monday
            priority: 'high',
            description: 'description',
            comments: [
              {
                id: 'ZdPnm',
                txt: 'also @yaronb please CR this',
                createdAt: 1590999817436,
                byMember: {
                  _id: 'u101',
                  fullname: 'Tal Tarablus',
                  imgUrl:
                    'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              },
            ],
            checklists: [
              {
                id: 'YEhmF',
                title: 'Checklist',
                todos: [
                  {
                    id: '212jX',
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
              username: 'Tal',
              fullname: 'Tal Tarablus',
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
          fullname: 'Abi Abambi',
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
// TEST DATA
// ;(async ()=>{
//     await storageService.post(STORAGE_KEY, {vendor: 'Subali Karov 1', price: 180})
//     await storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 240})
// })()
