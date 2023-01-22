import {
  ArrowFunctionExpression,
  FunctionDeclaration,
  JSXIdentifier
} from '@typescript-eslint/types/dist/generated/ast-spec';
import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';
import { RuleContext } from '@typescript-eslint/utils/dist/ts-eslint';

import {
  PRETTIER_IGNORE_CODE,
  PRETTIER_IGNORE_CODE_INLINE,
  PRETTIER_IGNORE_JSX_FIX,
  RegPrettierForArguments,
  RegPrettierForInline,
  RegPrettierForReturnStatement,
  RegPrettierWithCode
} from './contants';

import {
  getInfoPrettier,
  getParent,
  getTransElement,
  INLINE_NODE_TYPES,
  JSX_NODES
} from './utils';

const maybeReport = (
  node: JSXIdentifier,
  context: Readonly<RuleContext<'error', never[]>>
) => {
  const sourceCode = context.getSourceCode();

  const transComponent = getTransElement(node);
  const isChecking =
    transComponent && !transComponent.openingElement.selfClosing;

  if (isChecking) {
    const mainParent = getParent(transComponent);

    if (!mainParent) {
      return;
    }

    const report = () => {
      context.report({
        messageId: 'error',
        node: transComponent,
        fix(fixer) {
          if (mainParent.type === AST_NODE_TYPES.AssignmentPattern) {
            return fixer.insertTextBefore(
              mainParent,
              PRETTIER_IGNORE_CODE_INLINE
            );
          }

          if (INLINE_NODE_TYPES.includes(mainParent.type)) {
            return fixer.insertTextBefore(
              transComponent,
              PRETTIER_IGNORE_CODE_INLINE
            );
          }

          if (JSX_NODES.includes(mainParent.type)) {
            return fixer.insertTextBeforeRange(
              transComponent.range,
              PRETTIER_IGNORE_JSX_FIX
            );
          }

          if (mainParent.type === AST_NODE_TYPES.ReturnStatement) {
            return fixer.insertTextBefore(mainParent, PRETTIER_IGNORE_CODE);
          }

          if (
            mainParent.type === AST_NODE_TYPES.VariableDeclaration &&
            mainParent.declarations.length > 1
          ) {
            const declarator = transComponent.parent;

            return declarator
              ? fixer.insertTextBefore(declarator, PRETTIER_IGNORE_CODE_INLINE)
              : null;
          }

          const code = sourceCode.getText(mainParent);

          const newCode = `${PRETTIER_IGNORE_CODE}${code}`;

          return fixer.replaceTextRange(mainParent.range, newCode);
        }
      });
    };

    let { codePrettier } = getInfoPrettier(mainParent, sourceCode);

    const checkWithPrettier = (code: string) =>
      !RegPrettierWithCode.test(code) && report();

    if (mainParent.type === AST_NODE_TYPES.ReturnStatement) {
      if (!RegPrettierForReturnStatement.test(codePrettier)) {
        report();
      }

      return;
    }

    if (mainParent.type === AST_NODE_TYPES.AssignmentPattern) {
      const parentArgs = mainParent.parent as
        | FunctionDeclaration
        | ArrowFunctionExpression;

      const index = parentArgs.params.findIndex((item) => item === mainParent);
      codePrettier = sourceCode.getText(parentArgs).split(',')[index];

      if (!RegPrettierForArguments.test(codePrettier)) {
        report();
      }

      return;
    }

    if (INLINE_NODE_TYPES.includes(mainParent.type)) {
      codePrettier = sourceCode.getText(mainParent);

      if (mainParent.type === AST_NODE_TYPES.ArrayExpression) {
        const index = mainParent.elements.findIndex(
          (item) => item === transComponent
        );
        codePrettier = sourceCode.getText(mainParent).split(',')[index];
      }

      if (!RegPrettierForInline.test(codePrettier)) {
        report();
      }

      return;
    }

    if (JSX_NODES.includes(mainParent.type)) {
      codePrettier = getInfoPrettier(transComponent, sourceCode).codePrettier;
    }

    checkWithPrettier(codePrettier);
  }
};

const creator = ESLintUtils.RuleCreator(
  () =>
    'https://github.com/whydidoo/eslint-plugin-react-i18next-prettier#eslint-plugin-react-i18next-prettier--'
);

export const noTransWithoutPrettierIgnore = creator({
  create(context) {
    const nodes = new Set<JSXIdentifier>();

    return {
      "JSXOpeningElement > JSXIdentifier[name='Trans']": (
        node: JSXIdentifier
      ) => {
        nodes.add(node);
      },
      'Program:exit': () => {
        nodes.forEach((node) => {
          maybeReport(node, context);
        });

        nodes.clear();
      }
    };
  },
  name: 'no-trans-without-prettier-ignore',
  meta: {
    messages: {
      error:
        '<Trans /> component is not prepended by /* prettier-ignore */.\n\nPlease, add {/* prettier-ignore */} or /* prettier-ignore */ in before. Missing /* prettier-ignore */ may affect the i18n strings when prettier changes the formatting of this layout code'
    },
    fixable: 'code',
    type: 'suggestion',
    schema: [],
    docs: {
      description:
        '<Trans /> usage without /* prettier-ignore */ before it is not allowed',
      recommended: 'error'
    }
  },
  defaultOptions: []
});
