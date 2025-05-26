import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { vi } from 'vitest'
import App from './App'

vi.mock('axios')

const mockRewards = [
  { id: 1, name: 'Candy', cost: 100 },
  { id: 2, name: 'Calculator', cost: 200 },
]

const mockUser = {
  user: {
    reward_points: 500
  }
}

const mockUserRewards = [
  { id: 3, name: 'Calculator' },
]

describe('App', () => {
  beforeEach(() => {
    vi.resetAllMocks()

    axios.get.mockImplementation((url) => {
      switch (url) {
        case '/rewards':
          return Promise.resolve({ status: 200, data: mockRewards })
        case '/users/1':
          return Promise.resolve({ status: 200, data: mockUser })
        case '/users/1/user_rewards':
          return Promise.resolve({ status: 200, data: mockUserRewards })
        default:
          return Promise.reject(new Error('not found'))
      }
    })
  })

  it('renders rewards, user points, and redeemed rewards', async () => {
    render(<App />)

    await waitFor(() => {
      const calculators = screen.getAllByText('Calculator')

      expect(screen.getByText(/Thanx Rewards/i)).toBeInTheDocument()
      expect(screen.getByText(/Candy/)).toBeInTheDocument()
      expect(screen.getByText(/500/)).toBeInTheDocument()
      expect(calculators.length).toBe(2)
    })
  })

  it('redeems a reward and refreshes data', async () => {
    axios.post.mockResolvedValueOnce({ status: 201 })

    render(<App />)

    await waitFor(() => screen.getByText('Candy'))

    const redeemButtons = screen.getAllByRole('button', { name: /redeem/i })
    await userEvent.click(redeemButtons[0])

    await waitFor(() => {
      const candies = screen.getAllByText('Candy')

      expect(axios.post).toHaveBeenCalledWith('/users/1/user_rewards', { reward_id: 1 })
      expect(axios.get).toHaveBeenCalledTimes(6)
    })
  })
})