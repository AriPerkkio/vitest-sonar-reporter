import type { Reporter } from "vitest/node";

type File = Parameters<NonNullable<Reporter["onFinished"]>>[0][number];
type Task = File["tasks"][number];
type Test = Task & { type: "test" };

import { escapeXML } from "./xml-escape.js";

const NEWLINE = "\n";

/**
 * Generate XML. Reference:
 *
 * ```xml
 * <?xml version="1.0" encoding="UTF-8"?>
 * <testExecutions version="1">
 *   <file path="testx/ClassOneTest.xoo">
 *     <testCase name="test1" duration="5"/>
 *     <testCase name="test2" duration="500">
 *       <skipped message="short message">other</skipped>
 *     </testCase>
 *     <testCase name="test3" duration="100">
 *       <failure message="short">stacktrace</failure>
 *     </testCase>
 *     <testCase name="test4" duration="500">
 *       <error message="short">stacktrace</error>
 *     </testCase>
 *   </file>
 * </testExecutions>
 * ```
 */
export function generateXml(files?: File[]) {
  return join(
    '<?xml version="1.0" encoding="UTF-8"?>',
    NEWLINE,
    '<testExecutions version="1">',
    NEWLINE,
    files?.map(generateFileElement).join(NEWLINE),
    NEWLINE,
    "</testExecutions>",
  );
}

function generateFileElement(file: File) {
  return join(
    indent(1),
    `<file path="${escapeXML(file.name)}">`,
    NEWLINE,
    generateTestCases(file),
    NEWLINE,
    indent(1),
    `</file>`,
  );
}

function generateTestCases(file: File) {
  const tests = file.tasks.map(getAllTests).flat();

  return tests.map(generateTestCaseElement).join(NEWLINE);
}

function generateTestCaseElement(test: Test) {
  const start = join(
    indent(2),
    "<testCase ",
    `name="${escapeXML(generateTestCaseName(test))}"`,
    getDurationAttribute(test),
  );

  if (test.result?.state === "fail") {
    return parseErrors(test)
      ?.map((error) => {
        const element = error?.name === "AssertionError" ? "failure" : "error";

        return join(
          start,
          ">",
          NEWLINE,
          indent(3),
          `<${element} message="${escapeXML(error?.message)}">`,
          NEWLINE,
          indent(4),
          `<![CDATA[${escapeXML(error?.stack)}]]>`,
          NEWLINE,
          indent(3),
          `</${element}>`,
          NEWLINE,
          indent(2),
          "</testCase>",
        );
      })
      .join(NEWLINE);
  }

  if (
    test.mode === "skip" ||
    test.mode === "todo" ||
    // These might work in future?
    test.result?.state === "skip" ||
    test.result?.state === "todo"
  ) {
    return join(
      start,
      ">",
      NEWLINE,
      indent(3),
      `<skipped message="${escapeXML(test.name)}" />`,
      NEWLINE,
      indent(2),
      "</testCase>",
    );
  }

  return join(start, " />");
}

function getAllTests(task: Task): Test[] {
  const tests: Test[] = [];

  // @ts-expect-error -- Vitest v2 only
  if (task.type === "custom") {
    return tests;
  }

  if (task.type === "test") {
    return [...tests, task];
  }

  return [...tests, ...task.tasks.map(getAllTests).flat()];
}

function getDurationAttribute(test: Test): string {
  const duration = test.result?.duration;

  if (typeof duration !== "number") {
    return ` duration="0"`;
  }

  return ` duration="${Math.round(duration)}"`;
}

function generateTestCaseName(task: Task): string {
  if (task.suite && task.suite.name) {
    return `${generateTestCaseName(task.suite)} - ${task.name}`;
  }

  return task.name;
}

function join(...lines: (string | undefined)[]) {
  return lines.filter(Boolean).join("");
}

function indent(level: number) {
  return "  ".repeat(level);
}

function parseErrors(test: Test) {
  // Vitest v1-beta-02 and 0.x
  if (test.result && "error" in test.result)
    return [test.result.error] as NonNullable<Test["result"]>["errors"];

  // Vitest v1-beta-03
  return test.result?.errors;
}
