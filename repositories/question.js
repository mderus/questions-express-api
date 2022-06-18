const { readFile, writeFile } = require('fs/promises')

const makeQuestionRepository = fileName => {
  const getQuestions = async () => {
    const fileContent = await readFile(fileName, { encoding: 'utf-8' })
    const questions = JSON.parse(fileContent)

    return questions
  }

  const getQuestionById = async questionId => {
    const questions = await getQuestions()
    return questions.find(question => question.id === questionId)
  }

  const addQuestion = async question => {
    const questions = await getQuestions()
    questions.push(question)
    await writeFile(fileName, JSON.stringify(questions), {
      encoding: 'utf8'
    })
  }

  const getAnswers = async questionId => {
    const question = await getQuestionById(questionId)
    return question.answers
  }

  const getAnswer = async (questionId, answerId) => {
    const answers = await getAnswers(questionId)
    return answers.find(answer => answer.id === answerId)
  }

  const addAnswer = async (questionId, answer) => {
    const questions = await getQuestions()
    const { answers } = questions.find(question => question.id === questionId)
    answers.push(answer)
    await writeFile(fileName, JSON.stringify(questions), {
      encoding: 'utf8'
    })
  }

  return {
    getQuestions,
    getQuestionById,
    addQuestion,
    getAnswers,
    getAnswer,
    addAnswer
  }
}

module.exports = { makeQuestionRepository }
