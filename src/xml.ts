import type { TestCase, TestSuite } from "vitest/node";

import { escapeXML } from "./xml-escape.js";

export interface TestFile {
  path: string;
  tests: TestCase[];
}

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
export function generateXml(files: TestFile[]) {
  return join(
    '<?xml version="1.0" encoding="UTF-8"?>',
    NEWLINE,
    '<testExecutions version="1">',
    NEWLINE,
    files.map(generateFileElement).join(NEWLINE),
    NEWLINE,
    "</testExecutions>",
  );
}

function generateFileElement(file: TestFile) {
  return join(
    indent(1),
    `<file path="${escapeXML(file.path)}">`,
    NEWLINE,
    generateTestCases(file.tests),
    NEWLINE,
    indent(1),
    `</file>`,
  );
}

function generateTestCases(tests: TestCase[]) {
  return tests.map(generateTestCaseElement).join(NEWLINE);
}

function generateTestCaseElement(test: TestCase) {
  const start = join(
    indent(2),
    "<testCase ",
    `name="${escapeXML(generateTestCaseName(test))}"`,
    getDurationAttribute(test),
  );

  const { state, errors } = test.result();

  if (state === "failed") {
    return errors
      .map((error) => {
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

  if (state === "skipped") {
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

function getDurationAttribute(test: TestCase): string {
  const duration = test.diagnostic()?.duration;

  if (typeof duration !== "number") {
    return ` duration="0"`;
  }

  return ` duration="${Math.round(duration)}"`;
}

function generateTestCaseName(entity: TestCase | TestSuite): string {
  if (entity.parent && entity.parent.type === "suite" && entity.parent.name) {
    return `${generateTestCaseName(entity.parent)} - ${entity.name}`;
  }

  return entity.name;
}

function join(...lines: (string | undefined)[]) {
  return lines.filter(Boolean).join("");
}

function indent(level: number) {
  return "  ".repeat(level);
}
