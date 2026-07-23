import { Component } from "react";

// Isolates 3D (WebGL) failures so a missing/blocked WebGL context degrades
// gracefully to `fallback` instead of blanking the whole page.
class CanvasBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.warn("3D canvas disabled:", error?.message || error);
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}

export default CanvasBoundary;
