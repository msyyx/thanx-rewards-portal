import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserReward from './UserReward'

describe('UserReward', () => {
  const sampleReward = {
    id: 1,
    name: 'Candy',
    reward_points_required: 100
  }

  it('renders the user reward name', () => {
    render(<UserReward reward={sampleReward} />)
    expect(screen.getByText('Candy')).toBeInTheDocument()
  })
})
