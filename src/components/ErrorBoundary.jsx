import { Component } from 'react'

/** Catches render errors in a subtree (3D canvas, lazy routes) and shows a fallback. */
export class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidCatch(error, info) {
    if (import.meta.env.DEV) console.warn('[ErrorBoundary]', error, info?.componentStack)
  }
  render() {
    if (this.state.error) {
      const { fallback } = this.props
      return typeof fallback === 'function' ? fallback(this.state.error, () => this.setState({ error: null })) : (fallback ?? null)
    }
    return this.props.children
  }
}
