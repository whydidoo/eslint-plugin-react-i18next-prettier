import {
  BaseNode,
  JSXElement,
  JSXIdentifier,
  JSXOpeningElement,
  Node
} from '@typescript-eslint/types/dist/generated/ast-spec';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import { SourceCode } from '@typescript-eslint/utils/dist/ts-eslint';

export const getTransElement = (
  node: JSXIdentifier | JSXOpeningElement | JSXElement
): JSXElement | null => {
  const nodeType = node.type;
  const nodeParent = node.parent;

  if (!nodeParent) return null;

  if (
    nodeType === AST_NODE_TYPES.JSXIdentifier ||
    nodeType === AST_NODE_TYPES.JSXOpeningElement
  ) {
    const parent = nodeParent as JSXIdentifier | JSXOpeningElement;
    return getTransElement(parent);
  }

  return node;
};

export const getParent = (node: BaseNode): Node | null => {
  const nextNode = node.parent;

  if (!nextNode) {
    return null;
  }

  switch (nextNode.type) {
    case AST_NODE_TYPES.VariableDeclarator:
    case AST_NODE_TYPES.ArrowFunctionExpression: {
      return getParent(nextNode);
    }
    default:
      return nextNode;
  }
};

export const getInfoPrettier = (
  node: BaseNode,
  sourceCode: Readonly<SourceCode>
) => {
  const startLine = node.loc.start.line - 1;
  const endLine = node.loc.end.line;
  const linePrettier = startLine !== 0 ? startLine - 1 : startLine;
  const codePrettier = String(
    sourceCode.lines.slice(linePrettier, endLine).join('\n')
  );

  return {
    startLine,
    endLine,
    linePrettier,
    codePrettier
  };
};

export const INLINE_NODE_TYPES = [
  AST_NODE_TYPES.ConditionalExpression,
  AST_NODE_TYPES.LogicalExpression,
  AST_NODE_TYPES.ArrayExpression,
  AST_NODE_TYPES.JSXExpressionContainer
];

export const JSX_NODES = [
  AST_NODE_TYPES.JSXElement,
  AST_NODE_TYPES.JSXFragment
];
