import { SubmitFeedbackUseCase } from './submit-feedback-use-case'

const createFeedbackSpy = jest.fn()
const sentEmailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sentEmailSpy }
)

describe('Submit Feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'Example Comment',
        screenshot: 'data:image/png;base64, 21dsijdsuhdhsud',
      })
    ).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sentEmailSpy).toHaveBeenCalled()
  })

  it('should not be able submit a feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'Example Comment',
        screenshot: 'data:image/png;base64, 21dsijdsuhdhsud',
      })
    ).rejects.toThrow()
  })

  it('should not be able submit a feedback without comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64, 21dsijdsuhdhsud',
      })
    ).rejects.toThrow()
  })

  it('should not be able submit a feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'Example Comment',
        screenshot: 'test.jpg',
      })
    ).rejects.toThrow()
  })
})
