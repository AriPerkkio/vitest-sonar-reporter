# Example Workspace

```
example-workspace
├── packages
|  ├── client
|  |  ├── test
|  |  |  └── render-user.test.ts
|  |  └── vitest.config.ts
|  |
|  ├── server
|  |  ├── test
|  |  |  └── request-parse.test.ts
|  |  └── vitest.config.ts
|  |
|  └── shared
|     ├── test
|     |  └── user-utils.test.ts
|     └── vitest.config.ts
|
├── sonar-report.xml               <-- This report contains tests from all sub-packages, see example below
|
├── vitest.config.ts               <-- This configuration defines reporter usage
└── vitest.workspace.ts
```

```
 RUN  v0.31.1 /path/to/project/example-workspace

 ✓ |shared| test/user-utils.test.ts (3)
   ✓ parseName (2)
     ✓ returns first name
     ✓ returns last name
   ✓ getInitials (1)
     ✓ returns initials
 ✓ |server| test/request-parse.test.ts (1)
   ✓ parseUserFromRequest (1)
     ✓ returns user from request
 ✓ |client| test/render-user.test.ts (1)
   ✓ renderUser (1)
     ✓ renders user
```

```xml
<testExecutions version="1">
  <file path="packages/client/test/render-user.test.ts">
    <testCase name="renderUser - renders user" duration="1" />
  </file>
  <file path="packages/server/test/request-parse.test.ts">
    <testCase name="parseUserFromRequest - returns user from request" duration="1" />
  </file>
  <file path="packages/shared/test/user-utils.test.ts">
    <testCase name="parseName - returns first name" duration="1" />
    <testCase name="parseName - returns last name" duration="1" />
    <testCase name="getInitials - returns initials" duration="1" />
  </file>
</testExecutions>
```
