import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import User from './User'

describe('User', () => {
  it('renders the heading "User Points"', () => {
    render(<User points={500} />)
    expect(screen.getByText(/User Points/i)).toBeInTheDocument()
  })

  it('displays the correct number of points', () => {
    render(<User points={500} />)
    expect(screen.getByText('500')).toBeInTheDocument()
  })
})
