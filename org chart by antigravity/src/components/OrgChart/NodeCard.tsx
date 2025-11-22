import React from 'react';
import { motion } from 'framer-motion';
import type { User } from '../../types';
import styles from './NodeCard.module.css';

interface NodeCardProps {
    node: User;
    onToggle: (id: string) => void;
}

const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

export const NodeCard: React.FC<NodeCardProps> = ({ node, onToggle }) => {
    const initials = getInitials(node.name);

    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                x: node.x - node.width / 2,
                y: node.y,
                width: node.width,
                height: node.height,
                opacity: 1,
                scale: 1
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            <div className={styles.cardContent}>
                <div className={styles.avatar} style={{ backgroundColor: node.color || '#0078D4' }}>
                    {initials}
                </div>
                <div className={styles.info}>
                    <div className={styles.name} title={node.name}>{node.name}</div>
                    <div className={styles.role} title={node.role}>{node.role}</div>
                    <div className={styles.department} title={node.department}>{node.department}</div>
                    <div className={styles.email} title={node.email}>{node.email}</div>
                </div>
            </div>

            {node.children.length > 0 && (
                <button
                    className={styles.expandBtn}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggle(node.id);
                    }}
                >
                    <svg
                        className={`${styles.chevron} ${node.isExpanded ? styles.expanded : ''}`}
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            )}
        </motion.div>
    );
};
