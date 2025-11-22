import type { User } from '../types';

const ROLES = ['Manager', 'Team Lead', 'Senior Developer', 'Developer', 'Designer', 'QA', 'Product Owner', 'Scrum Master'];
const FIRST_NAMES = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Hank', 'Ivy', 'Jack', 'Kevin', 'Liam', 'Mia', 'Noah', 'Olivia', 'Peter', 'Quinn', 'Ryan'];
const LAST_NAMES = ['Smith', 'Doe', 'Johnson', 'Brown', 'Williams', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson'];
const DEPARTMENTS = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Operations', 'Finance', 'HR', 'IT', 'Customer Success'];

const COLORS = ['#0078D4', '#005A9E', '#106EBE', '#2B88D8', '#004578', '#0078D4', '#50E6FF', '#0078D4'];

let idCounter = 0;

const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const createNode = (parentId: string | null, role: string, depth: number): User => {
    idCounter++;
    const firstName = getRandomElement(FIRST_NAMES);
    const lastName = getRandomElement(LAST_NAMES);
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`;
    const department = getRandomElement(DEPARTMENTS);

    return {
        id: `user-${idCounter}`,
        name,
        role,
        department,
        email,
        parentId,
        children: [],
        x: 0,
        y: 0,
        width: 220, // Standard card width
        height: 120, // Increased height for additional fields
        isExpanded: depth < 2, // Only expand top 2 levels by default to prevent performance issues
        color: COLORS[depth % COLORS.length],
    };
};

const generateChildren = (parent: User, currentDepth: number, maxDepth: number) => {
    if (currentDepth >= maxDepth) return;

    const numChildren = getRandomInt(3, 5); // 3 to 5 children per node

    for (let i = 0; i < numChildren; i++) {
        // Determine role based on depth
        let role = 'Employee';
        if (currentDepth === 0) role = 'VP';
        else if (currentDepth === 1) role = 'Director';
        else if (currentDepth === 2) role = 'Manager';
        else if (currentDepth === 3) role = 'Team Lead';
        else role = getRandomElement(ROLES.slice(2));

        const child = createNode(parent.id, role, currentDepth + 1);
        parent.children.push(child);
        generateChildren(child, currentDepth + 1, maxDepth);
    }
};

export const generateOrgData = (): User => {
    idCounter = 0;

    // Level 0: CEO
    const root = createNode(null, 'CEO', 0);

    // Generate 5 levels of nested children (Total depth 6: 0-5)
    // User asked for "another 5 level nested child items".
    // Let's go with Max Depth 5 (Root + 5 levels).
    generateChildren(root, 0, 5);

    return root;
};

// Helper to count nodes for verification
export const countNodes = (node: User): number => {
    let count = 1;
    for (const child of node.children) {
        count += countNodes(child);
    }
    return count;
};
