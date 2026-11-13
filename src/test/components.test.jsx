import { render, screen, within, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { useState } from 'react'
import { TransitionProvider } from '../app/TransitionProvider.jsx'
import { SelectorPage } from '../app/SelectorPage.jsx'
import { Dialog } from '../components/Dialog.jsx'
import { Stars } from '../components/Stars.jsx'
import { VegMark } from '../components/VegMark.jsx'
import { CafeContext } from '../hooks/useCafe.js'
import { DishDialogContext } from '../hooks/useDishDialog.js'
import { CAFE_BY_TEMPLATE } from '../config/index.js'
import { Menu as LuxuryMenu } from '../templates/luxury/sections/Menu.jsx'

describe('SelectorPage', () => {
  it('renders three template cards linking to their routes', () => {
    render(
      <MemoryRouter>
        <TransitionProvider>
          <SelectorPage />
        </TransitionProvider>
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Three cafés.')
    const links = screen.getAllByRole('link', { name: /Preview Website/ })
    expect(links.map((a) => a.getAttribute('href'))).toEqual(['/colorful', '/luxury', '/minimal'])
  })
})

describe('Dialog', () => {
  function Harness() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button onClick={() => setOpen(true)}>Open</button>
        <Dialog open={open} onClose={() => setOpen(false)} title="Truffle Smash Burger">
          <button>Order</button>
        </Dialog>
      </>
    )
  }
  it('opens as a labelled modal and closes on Escape', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByText('Open'))
    const dialog = screen.getByRole('dialog', { name: 'Truffle Smash Burger' })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    await act(async () => {
      dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    })
    await vi.waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })
})

describe('accessible primitives', () => {
  it('Stars exposes the rating as an image label', () => {
    render(<Stars rating={4.5} />)
    expect(screen.getByRole('img', { name: 'Rated 4.5 out of 5' })).toBeInTheDocument()
  })
  it('VegMark is labelled for screen readers', () => {
    render(
      <>
        <VegMark veg />
        <VegMark veg={false} />
      </>,
    )
    expect(screen.getByRole('img', { name: 'Vegetarian' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Non-vegetarian' })).toBeInTheDocument()
  })
})

describe('Luxury menu filtering', () => {
  it('filters items when a category tab is selected and opens the dish dialog callback', async () => {
    const user = userEvent.setup()
    const cafe = CAFE_BY_TEMPLATE.luxury
    const open = vi.fn()
    render(
      <CafeContext.Provider value={cafe}>
        <DishDialogContext.Provider value={open}>
          <LuxuryMenu />
        </DishDialogContext.Provider>
      </CafeContext.Provider>,
    )
    const tablist = screen.getByRole('tablist', { name: 'Menu categories' })
    expect(within(tablist).getAllByRole('tab')).toHaveLength(9) // All + 8 categories
    await user.click(within(tablist).getByRole('tab', { name: /Pizza/ }))
    expect(within(tablist).getByRole('tab', { name: /Pizza/ })).toHaveAttribute('aria-selected', 'true')
    const panel = await screen.findByRole('tabpanel')
    await vi.waitFor(() => expect(within(panel).queryByText('Truffle Smash Burger')).not.toBeInTheDocument())
    expect(within(panel).getByText('Margherita Napoletana')).toBeInTheDocument()
    await user.click(within(panel).getByText('Margherita Napoletana'))
    expect(open).toHaveBeenCalledWith(expect.objectContaining({ id: 'margherita' }))
  })
})
