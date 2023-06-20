import { beforeEach, describe, expect, it } from 'vitest'

import { extractPostData } from './posts'
import { ValidationError } from '../util/errors'

const testTitle = 'Test title'
const testContent = 'Test content'
let testFormData

// describe('extractPostData()', () => {
//   beforeEach(() => {
//     testFormData = {
//       title: testTitle,
//       content: testContent,
//       get(identifier) {
//         return this[identifier]
//       },
//     }
//   })

//   it('should extract title and content from the provided form data', () => {
//     const data = extractPostData(testFormData)

//     expect(data.title).toBe(testTitle)
//     expect(data.content).toBe(testContent)
//   })
// })

describe('extractPostData()-2', () => {
  const testTitle = 'Test-title'
  const testContent = 'Test-content'

  class TestFormData {
    constructor() {
      this.title = testTitle
      this.content = testContent
    }
    
    set(identifier, value) {
      this[identifier] = value
    }

    get(identifier) {
      return this[identifier]
    }
  }

  let testFormData

  beforeEach(() => {
    testFormData = new TestFormData()
  })

  it('should extract title and content from the provided form data', () => {
    const data = extractPostData(testFormData)

    expect(data.title).toBe(testTitle)
    expect(data.content).toBe(testContent)
  })

  it('should throw ValidationError when passing empty string', () => {
    testFormData.set('title', ' ')

    let error
    
    try {
      extractPostData(testFormData)
    } catch (e) {
      error = e
    }

    expect(error).toBeInstanceOf(ValidationError)
  })
})
