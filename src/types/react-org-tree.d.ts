declare module 'react-org-tree' {
  interface OrgTreeProps {
    data: any;
    horizontal?: boolean;
    collapsable?: boolean;
    expandAll?: boolean;
    labelClassName?: string;
    nodeClassName?: string;
    nodeStyle?: React.CSSProperties;
    labelStyle?: React.CSSProperties;
    onNodeClick?: (node: any) => void;
  }

  const OrgTree: React.FC<OrgTreeProps>;
  export default OrgTree;
} 