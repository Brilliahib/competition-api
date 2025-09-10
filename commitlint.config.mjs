export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // A new feature
        'fix', // A bug fix
        'docs', // Documentation only changes
        'style', // Code style changes (formatting, no logic)
        'refactor', // Code change that neither fixes a bug nor adds a feature
        'perf', // Performance improvements
        'test', // Adding or updating tests
        'build', // Changes to the build system or dependencies
        'ci', // Changes to CI/CD configuration
        'chore', // Maintenance tasks, configs, etc.
        'revert', // Reverts a previous commit
      ],
    ],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
  },
  prompt: {
    messages: {
      skip: 'skip',
      max: 'must not exceed %d characters',
      min: 'must be at least %d characters',
      emptyWarning: 'Subject may not be empty',
      upperLimitWarning: 'Subject is too long',
      lowerLimitWarning: 'Subject is too short',
    },
    questions: {
      type: {
        description: 'Select the type of change you are committing:',
        enum: {
          feat: {
            description: 'A new feature',
            title: 'Features',
          },
          fix: {
            description: 'A bug fix',
            title: 'Bug Fixes',
          },
          docs: {
            description: 'Documentation only changes',
            title: 'Documentation',
          },
          style: {
            description: 'Code style changes (formatting, no logic)',
            title: 'Styles',
          },
          refactor: {
            description: 'Code refactoring without changing behavior',
            title: 'Refactoring',
          },
          perf: {
            description: 'Performance improvements',
            title: 'Performance',
          },
          test: {
            description: 'Adding or updating tests',
            title: 'Tests',
          },
          build: {
            description: 'Build system or dependency changes',
            title: 'Builds',
          },
          ci: {
            description: 'CI/CD configuration changes',
            title: 'Continuous Integration',
          },
          chore: {
            description: 'Maintenance tasks, configs, etc.',
            title: 'Chores',
          },
          revert: {
            description: 'Reverts a previous commit',
            title: 'Reverts',
          },
        },
      },
      scope: {
        description: 'Specify a scope (optional, e.g., user, auth, api)',
      },
      subject: {
        description: 'Write a short, imperative subject line',
      },
    },
  },
};
