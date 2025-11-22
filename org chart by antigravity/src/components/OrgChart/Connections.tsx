import React from 'react';
import { motion } from 'framer-motion';
import type { User } from '../../types';

interface ConnectionsProps {
    root: User;
}

export const Connections: React.FC<ConnectionsProps> = ({ root }) => {
    const links: {
        id: string;
        start: { x: number; y: number };
        end: { x: number; y: number };
        childWidth: number;
        childHeight: number;
        connectionType: 'horizontal' | 'vertical';
    }[] = [];

    const traverse = (node: User) => {
        if (node.isExpanded && node.children.length > 0) {
            node.children.forEach((child) => {
                links.push({
                    id: `${node.id}-${child.id}`,
                    start: { x: node.x, y: node.y + node.height }, // Bottom center of parent
                    end: { x: child.x, y: child.y }, // Top center of child
                    childWidth: child.width,
                    childHeight: child.height,
                    connectionType: child.layoutStyle || 'horizontal' // Default to horizontal if undefined
                });
                traverse(child);
            });
        }
    };

    traverse(root);

    return (
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '1px', height: '1px', pointerEvents: 'none', overflow: 'visible' }}>
            {links.map((link) => {
                const { start, end, childWidth, childHeight, connectionType } = link;

                let d: string;

                if (connectionType === 'horizontal') {
                    // Horizontal Layout (side-by-side children)
                    // Parent Bottom Center -> Child Top Center
                    // Use smooth Bezier curve
                    const midY = start.y + (end.y - start.y) / 2;
                    d = `M ${start.x} ${start.y} C ${start.x} ${midY}, ${end.x} ${midY}, ${end.x} ${end.y}`;
                } else {
                    // Vertical Layout (stacked children)
                    // Draw vertical line from parent bottom center, then horizontal to child side edge.

                    const childCenterY = end.y + childHeight / 2;

                    // Determine which side to connect to based on relative position
                    // If child is to the left of parent, connect to Right Edge.
                    // If child is to the right (or aligned), connect to Left Edge.
                    const isLeftOfParent = end.x < start.x;

                    const targetX = isLeftOfParent
                        ? end.x + childWidth / 2  // Right Edge
                        : end.x - childWidth / 2; // Left Edge

                    // Path: 
                    // M start.x start.y (Parent Bottom Center)
                    // V childCenterY (Vertical down to child center level)
                    // H targetX (Horizontal to child edge)

                    d = `M ${start.x} ${start.y} V ${childCenterY} H ${targetX}`;
                }

                return (
                    <motion.path
                        key={link.id}
                        d={d}
                        fill="none"
                        stroke="#C8C6C4"
                        strokeWidth="1.5"
                        initial={{ pathLength: 0, opacity: 1 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                );
            })}
        </svg>
    );
};
