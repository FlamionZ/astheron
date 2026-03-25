import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6 text-white selection:bg-white selection:text-black">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-lg glass-panel rounded-[40px] border border-white/10 p-12 text-center shadow-2xl"
          >
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/20">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-4xl font-display font-bold mb-4 tracking-tight">SYSTEM ERROR.</h1>
            <p className="text-brand-muted mb-10 leading-relaxed">
              An unexpected error has occurred within the Astheron core. 
              Our engineers have been notified and are working on a fix.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleRefresh}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-white/90 transition-all group"
              >
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                Refresh Page
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold hover:bg-white/10 transition-all"
              >
                <Home className="w-5 h-5" />
                Return Home
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-12 p-6 bg-black/40 rounded-2xl border border-white/5 text-left overflow-auto max-h-40">
                <p className="text-[10px] uppercase tracking-widest font-bold text-white/30 mb-2">Debug Info</p>
                <code className="text-xs text-red-400/80 font-mono break-all">
                  {this.state.error.toString()}
                </code>
              </div>
            )}
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
