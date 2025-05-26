import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Reward from './Reward'

describe('Reward', () => {
  const sampleReward = {
    id: 1,
    name: 'Candy',
    reward_points_required: 100
  }

  it('renders the reward name', () => {
    render(<Reward reward={sampleReward} points={500} onRedeemClick={() => {}} />)
    expect(screen.getByText('Candy')).toBeInTheDocument()
  })

  it('enables the redeem button if user has enough points', async () => {
    const mockRedeem = vi.fn()
    render(<Reward reward={sampleReward} points={500} onRedeemClick={mockRedeem} />)

    const button = screen.getByRole('button', { name: /redeem/i })
    expect(button).not.toBeDisabled()

    await userEvent.click(button)
    expect(mockRedeem).toHaveBeenCalledWith(1)
  })

  it('disables the redeem button if user lacks points', () => {
    render(<Reward reward={sampleReward} points={50} onRedeemClick={() => {}} />)
    const button = screen.getByRole('button', { name: /redeem/i })
    expect(button).toBeDisabled()
  })
})
