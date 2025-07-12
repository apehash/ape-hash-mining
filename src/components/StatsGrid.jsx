import React from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, Cpu, DollarSign } from 'lucide-react';

const stats = [
    { label: 'Total Miners', value: '12,847', icon: Users },
    { label: 'Hash Rate', value: '2.4 TH/s', icon: Zap },
    { label: 'Blocks Mined', value: '45,231', icon: Cpu },
    { label: '$HASH Price', value: '$0.0042', icon: DollarSign },
];

const StatsGrid = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
            className="terminal-window p-6 text-center hover:bg-green-400/5 transition-all duration-300"
          >
            <Icon className="mx-auto mb-3 text-green-400" size={32} />
            <p className="text-2xl font-bold terminal-glow">{stat.value}</p>
            <p className="text-sm text-green-300 font-mono">{stat.label}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default StatsGrid;