import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Monitor, Network, Shield, Brain, Server, Database, X, Zap, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ArchNode {
  id: string;
  label: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  tech: string[];
  description: string;
  metrics: { label: string; value: string; icon: React.ElementType }[];
}

const layers: { title: string; nodes: ArchNode[] }[] = [
  {
    title: 'CLIENT',
    nodes: [
      {
        id: 'frontend',
        label: 'Frontend App',
        subtitle: 'User Interface',
        icon: Monitor,
        color: '#3b82f6',
        tech: ['React 19', 'Next.js 15', 'Tailwind CSS', 'TypeScript'],
        description: 'Server-rendered UI with edge caching, optimistic updates, and real-time data binding.',
        metrics: [
          { label: 'Lighthouse', value: '98', icon: TrendingUp },
          { label: 'FCP', value: '0.8s', icon: Clock },
        ],
      },
    ],
  },
  {
    title: 'GATEWAY',
    nodes: [
      {
        id: 'gateway',
        label: 'API Gateway',
        subtitle: 'Load Balancer & Router',
        icon: Network,
        color: '#8b5cf6',
        tech: ['Node.js', 'Express', 'Rate Limiting', 'Request Validation'],
        description: 'Centralized routing with automatic load balancing, request throttling, and API versioning.',
        metrics: [
          { label: 'Throughput', value: '50k rps', icon: Zap },
          { label: 'Latency', value: '<12ms', icon: Clock },
        ],
      },
      {
        id: 'auth',
        label: 'Auth Service',
        subtitle: 'Identity & Access',
        icon: Shield,
        color: '#ef4444',
        tech: ['JWT', 'OAuth 2.0', 'TOTP 2FA', 'RBAC'],
        description: 'Zero-trust authentication with biometric support, session management, and audit logging.',
        metrics: [
          { label: 'Uptime', value: '99.99%', icon: TrendingUp },
          { label: 'Auth', value: '<80ms', icon: Clock },
        ],
      },
    ],
  },
  {
    title: 'SERVICES',
    nodes: [
      {
        id: 'ai',
        label: 'AI Engine',
        subtitle: 'ML & Intelligence',
        icon: Brain,
        color: '#f59e0b',
        tech: ['Python', 'TensorFlow', 'LLM APIs', 'Vector DB'],
        description: 'ML pipeline for fraud detection, personalized recommendations, and natural language search.',
        metrics: [
          { label: 'Accuracy', value: '99.2%', icon: TrendingUp },
          { label: 'Inference', value: '<200ms', icon: Clock },
        ],
      },
      {
        id: 'services',
        label: 'Core Services',
        subtitle: 'Business Logic',
        icon: Server,
        color: '#10b981',
        tech: ['Go', 'gRPC', 'Microservices', 'Event-Driven'],
        description: 'Domain-driven microservices handling orders, payments, inventory, and notifications.',
        metrics: [
          { label: 'Services', value: '12', icon: Zap },
          { label: 'P99', value: '<45ms', icon: Clock },
        ],
      },
    ],
  },
  {
    title: 'DATA',
    nodes: [
      {
        id: 'database',
        label: 'Data Layer',
        subtitle: 'Storage & Cache',
        icon: Database,
        color: '#06b6d4',
        tech: ['PostgreSQL', 'Redis', 'S3', 'Elasticsearch'],
        description: 'Multi-tier storage with read replicas, caching layer, object storage, and full-text search.',
        metrics: [
          { label: 'Uptime', value: '99.99%', icon: TrendingUp },
          { label: 'Cache Hit', value: '94%', icon: Zap },
        ],
      },
    ],
  },
];

const allNodes = layers.flatMap((l) => l.nodes);

function NodeCard({ node, index, onSelect, isSelected }: { node: ArchNode; index: number; onSelect: (n: ArchNode) => void; isSelected: boolean }) {
  const Icon = node.icon;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(node)}
      className={cn(
        'group relative flex items-center gap-4 w-full text-left p-4 md:p-5 rounded-2xl border transition-all duration-300',
        isSelected
          ? 'bg-white/10 border-white/30'
          : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/20'
      )}
      style={{
        boxShadow: isSelected ? `0 0 40px ${node.color}20, inset 0 1px 0 ${node.color}30` : 'none',
      }}
    >
      {/* Color accent line */}
      <div
        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full transition-opacity duration-300"
        style={{ backgroundColor: node.color, opacity: isSelected ? 1 : 0.3 }}
      />

      <div
        className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
        style={{
          backgroundColor: isSelected ? node.color : `${node.color}15`,
        }}
      >
        <Icon
          className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-300"
          style={{ color: isSelected ? '#000' : node.color }}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-display font-bold text-sm md:text-base text-white truncate">{node.label}</p>
        <p className="text-[10px] md:text-xs text-white/30 font-medium truncate">{node.subtitle}</p>
      </div>

      {/* Metrics preview */}
      <div className="hidden md:flex items-center gap-3 shrink-0">
        {node.metrics.map((m) => (
          <div key={m.label} className="text-right">
            <p className="text-sm font-bold font-mono" style={{ color: node.color }}>{m.value}</p>
            <p className="text-[8px] uppercase tracking-widest text-white/20 font-black">{m.label}</p>
          </div>
        ))}
      </div>

      <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors shrink-0" />
    </motion.button>
  );
}

export default function ArchitectureDiagram() {
  const [selected, setSelected] = useState<ArchNode | null>(null);

  return (
    <div className="relative">
      {/* Flow arrows between layers */}
      <div className="space-y-2">
        {layers.map((layer, layerIdx) => (
          <div key={layer.title}>
            {/* Layer label */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-black text-white/20 shrink-0">
                {String(layerIdx + 1).padStart(2, '0')}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-black text-white/15 shrink-0">
                {layer.title}
              </span>
            </div>

            {/* Nodes in this layer */}
            <div className={cn(
              'grid gap-3',
              layer.nodes.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 md:grid-cols-2'
            )}>
              {layer.nodes.map((node, nodeIdx) => (
                <NodeCard
                  key={node.id}
                  node={node}
                  index={layerIdx * 2 + nodeIdx}
                  onSelect={setSelected}
                  isSelected={selected?.id === node.id}
                />
              ))}
            </div>

            {/* Flow connector between layers */}
            {layerIdx < layers.length - 1 && (
              <div className="flex justify-center py-3">
                <motion.div
                  className="flex flex-col items-center gap-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 rounded-full bg-white/20"
                      animate={{ opacity: [0.2, 0.8, 0.2] }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                  <motion.div
                    className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-white/20"
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 1.5, delay: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </motion.div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="fixed bottom-4 left-4 right-4 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg z-[61] bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl"
              style={{ borderTop: `3px solid ${selected.color}` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: selected.color }}
                  >
                    <selected.icon className="w-7 h-7 text-black" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xl">{selected.label}</h4>
                    <p className="text-xs text-white/40 font-medium">{selected.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-white/40" />
                </button>
              </div>

              {/* Description */}
              <p className="text-sm text-white/60 leading-relaxed mb-6">{selected.description}</p>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {selected.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <m.icon className="w-3.5 h-3.5" style={{ color: selected.color }} />
                      <p className="text-[9px] uppercase tracking-[0.2em] font-black text-white/30">{m.label}</p>
                    </div>
                    <p className="text-2xl font-display font-bold" style={{ color: selected.color }}>
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] font-black text-white/30 mb-3">Technology Stack</p>
                <div className="flex flex-wrap gap-2">
                  {selected.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold border"
                      style={{
                        borderColor: `${selected.color}30`,
                        color: selected.color,
                        backgroundColor: `${selected.color}08`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
