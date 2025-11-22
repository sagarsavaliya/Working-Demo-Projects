import type { User } from '../types';

interface LayoutConfig {
    cardWidth: number;
    cardHeight: number;
    gapX: number;
    gapY: number;
}

export const calculateLayout = (root: User, config: LayoutConfig = { cardWidth: 220, cardHeight: 100, gapX: 50, gapY: 100 }): User => {
    // Helper to reset layout props
    const resetNode = (node: User) => {
        node.x = 0;
        node.y = 0;
        if (node.isExpanded && node.children.length > 0) {
            node.children.forEach(resetNode);
        }
    };
    resetNode(root);

    const VERTICAL_OFFSET = config.cardWidth / 2 + 40; // Indentation to ensure child is to the right of parent center
    const COLUMN_GAP = 20; // Gap between columns in grid

    const getSubtreeDimensions = (node: User): { width: number; height: number } => {
        if (!node.isExpanded || node.children.length === 0) {
            return { width: config.cardWidth, height: config.cardHeight };
        }

        // Check if all children are leaves (no children of their own)
        const childrenAreLeaves = node.children.every(child => !child.isExpanded || child.children.length === 0);
        const isRoot = !node.parentId;

        if (!isRoot && childrenAreLeaves && node.children.length > 0) {
            // Vertical Layout (Leaf Block)

            if (node.children.length > 6) {
                // 2-Column Grid Layout
                const col1Count = Math.ceil(node.children.length / 2);
                // Width = 2 * CardWidth + VerticalOffset + ColumnGap
                // Height = Col1Count * (Height + Gap) + ParentHeight

                const gridWidth = config.cardWidth * 2 + VERTICAL_OFFSET + COLUMN_GAP;
                const gridHeight = config.cardHeight + config.gapY / 2 + col1Count * (config.cardHeight + 30);

                return { width: Math.max(config.cardWidth, gridWidth), height: gridHeight };
            } else {
                // Single Column Vertical
                return {
                    width: Math.max(config.cardWidth, config.cardWidth + VERTICAL_OFFSET),
                    height: config.cardHeight + config.gapY / 2 + node.children.length * (config.cardHeight + 30)
                };
            }
        } else {
            // Horizontal Layout (Branch)
            let totalWidth = 0;
            let maxChildHeight = 0;

            node.children.forEach((child, index) => {
                const dim = getSubtreeDimensions(child);
                totalWidth += dim.width;
                maxChildHeight = Math.max(maxChildHeight, dim.height);
                if (index < node.children.length - 1) totalWidth += config.gapX;
            });

            return {
                width: Math.max(config.cardWidth, totalWidth),
                height: config.cardHeight + config.gapY + maxChildHeight
            };
        }
    };

    // Assign positions
    const assignPositions = (node: User, x: number, y: number) => {
        node.x = x;
        node.y = y;

        if (!node.isExpanded || node.children.length === 0) {
            return;
        }

        const childrenAreLeaves = node.children.every(child => !child.isExpanded || child.children.length === 0);
        const isRoot = !node.parentId;

        if (!isRoot && childrenAreLeaves && node.children.length > 0) {
            // Vertical Layout
            let currentY = y + config.cardHeight + (config.gapY / 2);
            const startX = x + VERTICAL_OFFSET;

            if (node.children.length > 6) {
                // 2-Column Grid
                const col1Count = Math.ceil(node.children.length / 2);

                node.children.forEach((child, index) => {
                    child.layoutStyle = 'vertical';
                    if (index < col1Count) {
                        // Column 1
                        assignPositions(child, startX, currentY);
                        currentY += config.cardHeight + 30;

                        // Reset Y for second column
                        if (index === col1Count - 1) {
                            currentY = y + config.cardHeight + (config.gapY / 2);
                        }
                    } else {
                        // Column 2
                        assignPositions(child, startX + config.cardWidth + COLUMN_GAP, currentY);
                        currentY += config.cardHeight + 30;
                    }
                });
            } else {
                // Single Column
                node.children.forEach((child) => {
                    child.layoutStyle = 'vertical';
                    assignPositions(child, startX, currentY);
                    currentY += config.cardHeight + 30;
                });
            }
        } else {
            // Horizontal Layout
            // Calculate children total width to center them
            let childrenTotalWidth = 0;
            node.children.forEach((child, i) => {
                childrenTotalWidth += getSubtreeDimensions(child).width;
                if (i < node.children.length - 1) childrenTotalWidth += config.gapX;
            });

            let leftEdge = x - childrenTotalWidth / 2;

            node.children.forEach((child) => {
                child.layoutStyle = 'horizontal';
                const childDim = getSubtreeDimensions(child);
                const childCenter = leftEdge + childDim.width / 2;
                assignPositions(child, childCenter, y + config.cardHeight + config.gapY);
                leftEdge += childDim.width + config.gapX;
            });
        }
    };

    assignPositions(root, 0, 0);

    return root;
};
