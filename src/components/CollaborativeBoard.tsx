import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { io, Socket } from 'socket.io-client';
import { Plus, Trash2, Users, MousePointer2, GripVertical, Settings2, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Node {
  id: string;
  x: number;
  y: number;
  title: string;
  content: string;
  color: string;
}

interface User {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function CollaborativeBoard() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [users, setUsers] = useState<{ [id: string]: User }>({});
  const [socket, setSocket] = useState<Socket | null>(null);
  const [myUser, setMyUser] = useState<User | null>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [userName, setUserName] = useState('');
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('init', ({ nodes: initialNodes, users: initialUsers }) => {
      setNodes(initialNodes);
      setUsers(initialUsers);
    });

    newSocket.on('user:joined', ({ id, user }) => {
      setUsers(prev => ({ ...prev, [id]: user }));
    });

    newSocket.on('user:left', (id) => {
      setUsers(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    });

    newSocket.on('cursor:moved', ({ id, x, y }) => {
      setUsers(prev => {
        if (!prev[id]) return prev;
        return { ...prev, [id]: { ...prev[id], x, y } };
      });
    });

    newSocket.on('node:moved', (data) => {
      setNodes(prev => prev.map(n => n.id === data.id ? { ...n, x: data.x, y: data.y } : n));
    });

    newSocket.on('node:updated', (data) => {
      setNodes(prev => prev.map(n => n.id === data.id ? { ...n, ...data } : n));
    });

    newSocket.on('node:created', (newNode) => {
      setNodes(prev => [...prev, newNode]);
    });

    newSocket.on('node:deleted', (id) => {
      setNodes(prev => prev.filter(n => n.id !== id));
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const handleJoin = () => {
    if (!socket || !userName.trim()) return;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const userData = { name: userName, color, x: 0, y: 0 };
    socket.emit('user:join', userData);
    setMyUser({ id: socket.id!, ...userData });
    setIsJoined(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!socket || !isJoined || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    socket.emit('cursor:move', { x, y });
  };

  const handleNodeDrag = (id: string, x: number, y: number) => {
    if (!socket) return;
    socket.emit('node:move', { id, x, y });
    setNodes(prev => prev.map(n => n.id === id ? { ...n, x, y } : n));
  };

  const handleAddNode = () => {
    if (!socket) return;
    const newNode: Node = {
      id: Math.random().toString(36).substr(2, 9),
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 200,
      title: 'New Idea',
      content: 'Double click to edit this content...',
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
    socket.emit('node:create', newNode);
  };

  const handleDeleteNode = (id: string) => {
    if (!socket) return;
    socket.emit('node:delete', id);
  };

  const handleUpdateNode = (id: string, updates: Partial<Node>) => {
    if (!socket) return;
    socket.emit('node:update', { id, ...updates });
    setNodes(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
  };

  if (!isJoined) {
    return (
      <div className="flex items-center justify-center h-[600px] glass rounded-[40px] border border-white/10">
        <div className="max-w-md w-full p-12 text-center">
          <Users className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h3 className="text-3xl font-display font-bold mb-4">Collaborative Workspace</h3>
          <p className="text-brand-muted mb-8">Enter your name to join the real-time engineering board.</p>
          <div className="space-y-4">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your Name"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all"
              onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
            />
            <button
              onClick={handleJoin}
              className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-white/90 transition-all"
            >
              Join Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[700px] glass rounded-[40px] border border-white/10 overflow-hidden group/board" ref={boardRef} onMouseMove={handleMouseMove}>
      {/* Board Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-20 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg">
            <Settings2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-white">Project Canvas</h4>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-black">
                {Object.keys(users).length + 1} Engineers Online
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 mr-4">
            {Object.values(users).map((user, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-[10px] font-black uppercase"
                style={{ backgroundColor: user.color }}
                title={user.name}
              >
                {user.name.charAt(0)}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-black bg-white text-black flex items-center justify-center text-[10px] font-black uppercase">
              {myUser?.name.charAt(0)}
            </div>
          </div>
          <button
            onClick={handleAddNode}
            className="p-3 bg-white/10 hover:bg-white text-white hover:text-black rounded-xl transition-all border border-white/10"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="absolute inset-0 p-12 overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Nodes */}
        <AnimatePresence>
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              drag
              dragMomentum={false}
              onDrag={(e, info) => handleNodeDrag(node.id, node.x + info.delta.x, node.y + info.delta.y)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, x: node.x, y: node.y }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute w-64 p-6 glass rounded-3xl border border-white/10 cursor-grab active:cursor-grabbing group/node"
              style={{ borderTop: `4px solid ${node.color}` }}
            >
              <div className="flex items-center justify-between mb-4">
                <GripVertical className="w-4 h-4 text-white/20" />
                <button
                  onClick={() => handleDeleteNode(node.id)}
                  className="p-1.5 hover:bg-red-500/20 text-white/20 hover:text-red-500 rounded-lg transition-colors opacity-0 group-hover/node:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <input
                type="text"
                value={node.title}
                onChange={(e) => handleUpdateNode(node.id, { title: e.target.value })}
                className="w-full bg-transparent font-bold text-white mb-2 focus:outline-none"
              />
              <textarea
                value={node.content}
                onChange={(e) => handleUpdateNode(node.id, { content: e.target.value })}
                className="w-full bg-transparent text-sm text-brand-muted leading-relaxed resize-none focus:outline-none h-24"
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Remote Cursors */}
        {Object.entries(users).map(([id, user]) => (
          <motion.div
            key={id}
            initial={false}
            animate={{ x: user.x, y: user.y }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute pointer-events-none z-50 flex flex-col items-start"
          >
            <MousePointer2 className="w-6 h-6" style={{ color: user.color, fill: user.color }} />
            <div
              className="px-2 py-1 rounded-md text-[8px] font-black uppercase text-white shadow-lg whitespace-nowrap -mt-1 ml-4"
              style={{ backgroundColor: user.color }}
            >
              {user.name}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
        <div className="px-4 py-2 glass rounded-full border border-white/10 text-[8px] uppercase tracking-[0.2em] font-black text-white/40">
          Real-time Engine: Socket.io v4.8.1
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          <span className="text-[10px] font-bold text-white/60">Live Sync Active</span>
        </div>
      </div>
    </div>
  );
}
