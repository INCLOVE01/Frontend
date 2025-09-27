'use client'
import React from "react";

export default class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return <div className="text-red-600">Error: {this.state.error?.message}</div>;
    }
    return this.props.children;
  }
}