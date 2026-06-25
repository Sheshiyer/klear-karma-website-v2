```markdown
# klear-karma-website-v2 Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `klear-karma-website-v2` TypeScript codebase. It covers file naming, import/export styles, commit message habits, and testing patterns. While no specific frameworks or automated workflows are detected, this guide ensures consistency and clarity for contributors.

## Coding Conventions

### File Naming
- All files use **kebab-case**.
  - **Example:**  
    ```
    user-profile.ts
    karma-utils.ts
    ```

### Import Style
- Use **relative imports** for referencing modules.
  - **Example:**  
    ```typescript
    import { calculateKarma } from './karma-utils';
    ```

### Export Style
- Use **named exports** rather than default exports.
  - **Example:**  
    ```typescript
    // karma-utils.ts
    export function calculateKarma(points: number): number {
      return points * 10;
    }
    ```

### Commit Message Patterns
- Commit messages are **freeform** (no enforced prefixes or structure).
- Average commit message length: **23 characters**.
  - **Example:**  
    ```
    fix karma calculation bug
    add user profile page
    ```

## Workflows

_No automated workflows detected in this repository. All development and testing workflows are manual._

## Testing Patterns

- **Testing Framework:** Not explicitly detected.
- **Test File Naming:** Test files follow the pattern `*.test.*`.
  - **Example:**  
    ```
    karma-utils.test.ts
    ```
- **Test Placement:** Tests are typically placed alongside the files they test or in a dedicated test directory.

#### Example Test File
```typescript
// karma-utils.test.ts
import { calculateKarma } from './karma-utils';

test('calculates karma correctly', () => {
  expect(calculateKarma(5)).toBe(50);
});
```

## Commands

| Command        | Purpose                                   |
|----------------|-------------------------------------------|
| /run-tests     | Run all test files matching `*.test.*`    |
| /format-code   | Format code to adhere to conventions      |
| /check-imports | Verify all imports are relative           |
| /list-exports  | List all named exports in a file/module   |
```
