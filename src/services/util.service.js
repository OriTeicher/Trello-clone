export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  debounce,
  randomPastTime,
  saveToStorage,
  loadFromStorage,
  getRandomTaskTitles,
  getRandomLabelTitle,
  getRandomProjectNames,
  getRandomTaskDesc,
  getBoardRandomColor,
  getFormattedDate,
}

function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function randomPastTime() {
  const HOUR = 1000 * 60 * 60
  const DAY = 1000 * 60 * 60 * 24
  const WEEK = 1000 * 60 * 60 * 24 * 7

  const pastTime = getRandomIntInclusive(HOUR, WEEK)
  return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

function getRandomTaskTitles(idx = getRandomIntInclusive(0, 9)) {
  const codingTasks = [
    'Implement a function to check whether a given string is a palindrome or not.',
    'Create a program to find the largest number in an array of numbers.',
    'Write a function that takes an array of integers and returns the sum of all the even numbers.',
    'Implement a function that converts a string to title case (the first letter of each word is capitalized).',
    'Create a program to sort an array of objects by a specific property.',
    'Write a function to remove all duplicates from an array of strings.',
    'Implement a function to check if a given string contains only unique characters.',
    'Create a program to calculate the factorial of a given number.',
    'Write a function that finds the second smallest element in an array of integers.',
    'Implement a function to reverse a string without using the built-in reverse() method.',
  ]

  return codingTasks[idx]
}

function getRandomLabelTitle(idx = getRandomIntInclusive(0, 9)) {
  const labelTitles = [
    'Important',
    'Urgent',
    'Low Priority',
    'High Priority',
    'Feature Request',
    'Bug Fix',
    'Design',
    'Documentation',
    'Testing',
    'Deployment',
  ]
  return labelTitles[idx]
}

function getRandomTaskDesc(idx = getRandomIntInclusive(0, 9)) {
  const descs = [
    'Implement login functionality',
    'Fix issue with responsive layout on mobile devices',
    'Refactor code for better performance',
    'Add pagination to search results',
    'Create user profile page',
    'Write documentation for API endpoints',
    'Test user registration flow',
    'Design new logo for website',
    'Deploy application to production server',
    'Add new feature to dashboard page',
    'Implement email verification process',
    'Optimize database queries for faster load times',
    'Add support for multiple languages',
    'Improve accessibility for users with disabilities',
    'Create admin panel for managing users',
    'Integrate payment gateway for in-app purchases',
    'Write unit tests for critical components',
    'Implement push notifications for mobile app',
    'Refine user interface for better user experience',
    'Add support for file uploads',
    'Create user onboarding flow',
    'Optimize images for faster load times',
    'Add social media sharing buttons',
    'Improve search functionality',
    'Implement two-factor authentication for added security',
    'Write end-to-end tests for user scenarios',
    'Add real-time chat functionality',
    'Create custom error pages for better user experience',
    'Implement user-generated content moderation',
    'Refactor CSS for better maintainability',
    'Integrate Google Maps API for location-based features',
    'Add video support to media player',
    'Implement password reset functionality',
    'Add progress bars to long-running tasks',
    'Write API documentation for external developers',
    'Optimize SEO for better search engine rankings',
    'Create user feedback form for collecting feedback',
    'Integrate social media login options',
    'Add support for custom themes',
    'Implement role-based access control for administrators',
  ]
  return descs[idx]
}

function getRandomProjectNames(idx = getRandomIntInclusive(0, 9)) {
  const projNames = [
    'Responsive Website with Animations',
    'Dynamic Web App for E-commerce',
    'Full-Stack Web App with Authentication',
    'Mobile-friendly Blogging Platform',
    'Real-Time Chat with Firebase',
    'Web-Based Game with Leaderboard',
    'Single-Page App with API Integration',
    'RESTful API with CRUD Operations',
    'Social Media Platform with User Profiles',
    'Interactive Data Visualization',
    'Task Manager for Remote Teams',
    'Online Code Collaboration Tool',
    'Event Scheduling and Management App',
    'Personal Finance Tracker with Budgeting',
    'Music Streaming and Sharing Platform',
    'Recipe and Meal Planning App',
    'Fitness Tracking and Workout Planner',
    'Language Learning App with AI',
    'Virtual Interior Design Platform',
    'Online Marketplace for Handmade Goods',
    'Travel Planning and Booking Platform',
    'Gardening and Plant Care Assistant',
    'Virtual Wardrobe and Fashion Assistant',
    'Remote Learning Platform with Tutoring',
    'Online Book Club and Reading Tracker',
    'Digital Art Gallery and Marketplace',
    'Mental Health and Wellbeing App',
    'Charity and Volunteer Matching Platform',
    'Smart Home Automation and Control App',
  ]

  return projNames[idx]
}

function getFormattedDate(date = new Date()) {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()
  const formattedDate = `${day}/${month}/${year}`
  return formattedDate
}

function getBoardRandomColor() {
  const colorItems = [
    '#7bc86c',
    ' #f5dd29',
    ' #ffaf3f',
    '#ef7564',
    '#cd8de5',
    '#5ba4cf',
    ' #b7ddb0',
    ' #f5ea92',
    '#fad29c',
    ' #efb3ab',
    ' #dfc0eb',
  ]
  return colorItems[getRandomIntInclusive(0, 10)]
}

export const colorItems = [
  '#7bc86c',
  ' #f5dd29',
  ' #ffaf3f',
  '#ef7564',
  '#cd8de5',
  '#5ba4cf',
  ' #b7ddb0',
  ' #f5ea92',
  '#fad29c',
  ' #efb3ab',
  ' #dfc0eb',
  '#7bc86c',
  ' #f5dd29',
  ' #ffaf3f',
  ' #ef7564',
  ' #cd8de5',
  ' #5aac44',
  ' #e6c60d',
  ' #e79217',
  ' #cf513d',
  ' #a86cc1',
  ' #8bbdd9',
  ' #8fdfeb',
  ' #b3f1d0',
  ' #f9c2e4',
  ' #505f79',
  ' #5ba4cf',
  ' #29cce5',
  ' #6deca9',
  ' #ff8ed4',
  ' #344563',
  ' #026aa7',
  ' #00aecc',
  ' #4ed583',
  ' #e568af',
  ' #091e42',
  ' #aabbcc',
  ' #ddeeff',
]

// export const newShade = (hexColor, magnitude) => {
//   hexColor = hexColor.replace(`#`, ``)
//   if (hexColor.length === 6) {
//     const decimalColor = parseInt(hexColor, 16)
//     let r = (decimalColor >> 16) + magnitude
//     r > 255 && (r = 255)
//     r < 0 && (r = 0)
//     let g = (decimalColor & 0x0000ff) + magnitude
//     g > 255 && (g = 255)
//     g < 0 && (g = 0)
//     let b = ((decimalColor >> 8) & 0x00ff) + magnitude
//     b > 255 && (b = 255)
//     b < 0 && (b = 0)
//     return `#${(g | (b << 8) | (r << 16)).toString(16)}`
//   } else {
//     return hexColor
//   }
// }

export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult
  if (removedIndex === null && addedIndex === null) return arr

  const result = [...arr]
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }

  return result
}
