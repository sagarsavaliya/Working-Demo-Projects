import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { User } from '../../types';
import { generateOrgData } from '../../utils/dataGenerator';
import { calculateLayout } from '../../utils/layoutEngine';
import { NodeCard } from './NodeCard';
import { Connections } from './Connections';

export const OrgChart: React.FC = () => {
    const [root, setRoot] = useState<User | null>(null);
    const [transform, setTransform] = useState({ x: window.innerWidth / 2, y: 100, scale: 1 });
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    const fitToScreen = (currentRoot: User | null = root) => {
        if (!currentRoot || !containerRef.current) return;

        // Calculate bounds of the entire visible tree
        const getBounds = (node: User): { minX: number; maxX: number; minY: number; maxY: number } => {
            let minX = node.x - node.width / 2;
            let maxX = node.x + node.width / 2;
            let minY = node.y;
            let maxY = node.y + node.height;

            if (node.isExpanded && node.children.length > 0) {
                node.children.forEach(child => {
                    const childBounds = getBounds(child);
                    minX = Math.min(minX, childBounds.minX);
                    maxX = Math.max(maxX, childBounds.maxX);
                    minY = Math.min(minY, childBounds.minY);
                    maxY = Math.max(maxY, childBounds.maxY);
                });
            }

            return { minX, maxX, minY, maxY };
        };

        const bounds = getBounds(currentRoot);
        const treeWidth = bounds.maxX - bounds.minX;
        const treeHeight = bounds.maxY - bounds.minY;
        const treeCenterX = (bounds.minX + bounds.maxX) / 2;
        const treeCenterY = (bounds.minY + bounds.maxY) / 2;

        const { clientWidth, clientHeight } = containerRef.current;

        // Calculate scale to fit the tree with padding
        const padding = 0.9;
        const scaleX = (clientWidth * padding) / treeWidth;
        const scaleY = (clientHeight * padding) / treeHeight;
        const minZoom = 0.2; // Allow zooming out further to fit everything
        const initialScale = Math.max(minZoom, Math.min(scaleX, scaleY, 1));

        // Center the tree in viewport
        const initialX = clientWidth / 2 - treeCenterX * initialScale;
        const initialY = clientHeight / 2 - treeCenterY * initialScale;

        setTransform({
            x: initialX,
            y: initialY,
            scale: initialScale
        });
    };

    useEffect(() => {
        const data = generateOrgData();
        const laidOutData = calculateLayout(data);
        setRoot({ ...laidOutData });

        // Use setTimeout to ensure state update has processed or just pass data directly
        // Since setRoot is async, we pass laidOutData directly to fitToScreen
        // But fitToScreen needs containerRef which is available.
        // We need to wait for render? No, useEffect runs after render.
        // But we just setRoot, so re-render is queued.
        // Actually, we can just calculate initial transform immediately based on laidOutData.

        setTimeout(() => fitToScreen(laidOutData), 0);
    }, []);

    const handleToggle = (id: string) => {
        if (!root) return;

        const toggleNode = (node: User): boolean => {
            if (node.id === id) {
                node.isExpanded = !node.isExpanded;
                if (!node.isExpanded) {
                    const collapseRecursive = (n: User) => {
                        n.isExpanded = false;
                        n.children.forEach(collapseRecursive);
                    };
                    node.children.forEach(collapseRecursive);
                }
                return true;
            }
            for (const child of node.children) {
                if (toggleNode(child)) return true;
            }
            return false;
        };

        // Clone to trigger re-render
        const newRoot = JSON.parse(JSON.stringify(root));
        const found = toggleNode(newRoot);

        if (found) {
            const laidOutRoot = calculateLayout(newRoot);
            setRoot(laidOutRoot);
            fitToScreen(laidOutRoot);
        }
    };

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const scaleSensitivity = 0.001;
        const delta = -e.deltaY * scaleSensitivity;
        const newScale = Math.min(Math.max(0.1, transform.scale + delta), 5);
        setTransform(prev => ({ ...prev, scale: newScale }));
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        const dx = e.clientX - lastMousePos.current.x;
        const dy = e.clientY - lastMousePos.current.y;
        setTransform(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    if (!root) return <div>Loading...</div>;

    // Flatten nodes for rendering
    const visibleNodes: User[] = [];
    const traverse = (node: User) => {
        visibleNodes.push(node);
        if (node.isExpanded) {
            node.children.forEach(traverse);
        }
    };
    traverse(root);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                background: '#FAF9F8',
                cursor: isDragging.current ? 'grabbing' : 'grab',
                position: 'relative',
                fontFamily: "'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif"
            }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transformOrigin: '0 0',
                }}
                animate={{
                    x: transform.x,
                    y: transform.y,
                    scale: transform.scale,
                }}
                transition={{ type: 'tween', ease: 'linear', duration: 0.3 }}
            >
                <Connections root={root} />
                {visibleNodes.map(node => (
                    <NodeCard key={node.id} node={node} onToggle={handleToggle} />
                ))}
            </motion.div>

            <div style={{
                position: 'absolute',
                bottom: 24,
                right: 24,
                background: 'white',
                padding: '8px',
                borderRadius: '2px',
                boxShadow: '0 1.6px 3.6px 0 rgba(0,0,0,0.132), 0 0.3px 0.9px 0 rgba(0,0,0,0.108)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <button
                    onClick={() => fitToScreen()}
                    title="Fit to Screen"
                    style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid #E1DFDD',
                        background: 'white',
                        color: '#323130',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px'
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                    </svg>
                </button>
                <div style={{ width: '1px', height: '24px', background: '#E1DFDD', margin: '0 4px' }} />
                <button
                    onClick={() => setTransform(prev => ({ ...prev, scale: prev.scale * 1.2 }))}
                    style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid #E1DFDD',
                        background: 'white',
                        color: '#323130',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px'
                    }}
                >+</button>
                <span style={{ minWidth: '40px', textAlign: 'center', fontSize: '12px', color: '#605E5C' }}>{Math.round(transform.scale * 100)}%</span>
                <button
                    onClick={() => setTransform(prev => ({ ...prev, scale: prev.scale / 1.2 }))}
                    style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid #E1DFDD',
                        background: 'white',
                        color: '#323130',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px'
                    }}
                >-</button>
            </div>
        </div>
    );
};
